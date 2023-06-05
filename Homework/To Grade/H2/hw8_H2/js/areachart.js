/*
 * AreaChart - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the area chart
 * @param _data						-- the dataset 'household characteristics'
 */

class AreaChart {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.initVis();
    };

    /*
     * Initialize visualization (static content; e.g. SVG area, axes, brush component)
     */

    initVis() {
        let vis = this;

        vis.margin = {top: 10, right: 5, bottom:100, left: 75};

        // TODO: #9 - Change hardcoded width to reference the width of the parent element
        vis.width = $('#' + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $('#' + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // Scales and axes
        vis.xScale = d3.scaleTime()
            .range([0, vis.width])
            .domain(d3.extent(vis.data, function(d) { return d.key; }));

        vis.y = d3.scaleLinear()
            .range([vis.height, 0]);

        vis.xAxis = d3.axisBottom()
            .scale(vis.xScale);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")");

        vis.svg.append("g")
            .attr("class", "y-axis axis");

        vis.area = d3.area()
            .curve(d3.curveCardinal)
            .x(d=>vis.xScale(d.key))
            .y0(vis.height)
            .y1(d=>vis.y(d.value));


        // Append a path for the area function, so that it is later behind the brush overlay
        vis.timePath = vis.svg.append("path")
            .attr("class", "area");

        // TO-DO: Add Brushing to Chart
        vis.brush = d3.brushX()
            .extent([[0, 0], [vis.width, vis.height]])
            .on("brush", brushed);

        // Append brush component
        vis.svg.append("g")
            .attr("class", "x brush")
            .call(vis.brush)
            .selectAll("rect")
            .attr("y", -6)
            .attr("height", vis.height + 12);

        vis.svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr("z-index", "10000");

        // (Filter, aggregate, modify data)
        vis.wrangleData();
    }

    /*
     * Data wrangling
     */

    wrangleData() {
        let vis = this;
        // (1) Group data by date and count survey results for each day
        vis.rolled = d3.rollup(vis.data, v=> v.length, d=>+d.survey);
        vis.data = Array.from(vis.rolled, ([key, value]) => ({key, value}));

        // (2) Sort data by day
        vis.data.sort(function(a,b){
            return d3.ascending(a.key, b.key)
        });

        // Update the visualization
        vis.updateVis();
    }

    /*
     * The drawing function
     */

    updateVis() {
        let vis = this;

        // Update domain
        vis.xScale.domain(d3.extent(vis.data, d=> d.key));
        vis.y.domain([0, d3.max(vis.data, d=> d.value)]);

        // Update axes
        vis.svg.select(".x-axis")
            .call(vis.xAxis
                .tickFormat(d3.timeFormat("%Y-%m-%d"))
                .tickSize(5))
            .selectAll("text")
            .attr("dx", "-2em")
            .attr("dy", "1em")
            .attr("transform", "rotate(-45)");

        vis.svg.select(".y-axis").call(vis.yAxis.tickSize(0).ticks(11));

        vis.svg
            .append("g")
            .append("path")
            .datum(vis.data)
            .attr("class", "area")
            .attr("d", vis.area)
            .attr("fill", "#2c42bd")
            .attr("opacity", "0.85");
    }
}