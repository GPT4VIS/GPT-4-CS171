/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */


class MapVis {

    constructor(parentElement, geoData, covidData, usaData) { // check the parameters
        this.parentElement = parentElement;
        this.covidData = covidData;
        this.usaData = usaData;
        this.geoData = geoData;
        this.displayData = [];

        // parse date method
        this.parseDate = d3.timeParse("%m/%d/%Y");

        // define colors
        this.colors = ["#FFFFFF", "#136D70"]

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        // width and height should be dynamic
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.svg.append('g')
            .attr('class', 'title')
            .attr('id', 'map-title')
            .append('text')
            // .text('Map')
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');

        // adjust zoom for when browser size changes based on the available width
        vis.viewpoint = {'width': 975, 'height': 610};
        vis.zoom = vis.width / vis.viewpoint.width;

        // make a map group
        vis.map = vis.svg.append("g")
            .attr("class", "usa")
            .attr("transform", `scale(${vis.zoom} ${vis.zoom})`);

        // append div container for tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip')

        // define a geo generator and pass your projection to it
        // coordinates are already there, already projected
        vis.path = d3.geoPath()

        // convert your TopoJSON data into GeoJSON data structure
        vis.data = topojson.feature(vis.geoData, vis.geoData.objects.states).features

        // draw states
        vis.states = vis.map.selectAll(".state") // change to .map to append to the map, not the svg
            .data(vis.data)
            .enter().append("path")
            .attr('class', 'state')
            .attr("d", vis.path)
            // make the map transparent with just outlines
            .attr("fill", 'transparent')
            .attr("stroke", 'black')
            .attr("stroke-width", 1);

        // create legend
        vis.grad = vis.svg.append('defs')
            .append('linearGradient')
            .attr('id', 'grad')
            // indicates the gradient split across the rectangle
            .attr('x1', '0%')
            .attr('x2', '50%')
            .attr('y1', '0%')
            .attr('y2', '0%')

        vis.grad.selectAll('stop')
            .data(vis.colors)
            .enter()
            .append('stop')
            .style('stop-color', function(d){return d;})
            .attr('offset', function(d, i){
                return 100 * (i / (vis.colors.length - 1)) + '%'
            })

        vis.legend = vis.svg.append('rect')
            .attr('class', 'legend')
            .attr('transform', `translate(${vis.width * 2.5 / 4}, ${vis.height - 20})`)
            .attr("width", 200)
            .attr("height", 50)
            .style("fill", 'url(#grad)');

        vis.scale = d3.scaleLinear()
            .domain([0, 200])
            .range([0, 200])

        // create an axis group
        vis.legendAxisGroup = vis.svg.append('g') // add to svg 
            .attr("class", "axis legend-axis")
            .attr('transform', `translate(${vis.width * 2.5 / 4}, ${vis.height - 20})`);

        vis.wrangleData()
    }

    wrangleData() {
        let vis = this

        // check out the data
        // console.log(vis.covidData)
        // console.log(vis.usaData)

        // first, filter according to selectedTimeRange, init empty array
        let filteredData = [];

        // if there is a region selected
        if (selectedTimeRange.length !== 0) {
            //console.log('region selected', vis.selectedTimeRange, vis.selectedTimeRange[0].getTime() )

            // iterate over all rows the csv (dataFill)
            vis.covidData.forEach(row => {
                // and push rows with proper dates into filteredData
                if (selectedTimeRange[0].getTime() <= vis.parseDate(row.submission_date).getTime() && vis.parseDate(row.submission_date).getTime() <= selectedTimeRange[1].getTime()) {
                    filteredData.push(row);
                }
            });
        } else {
            filteredData = vis.covidData;
        }

        // prepare covid data by grouping all rows by state
        let covidDataByState = Array.from(d3.group(filteredData, d => d.state), ([key, value]) => ({key, value}))

        // have a look
        // console.log(covidDataByState)

        // init final data structure in which both data sets will be merged into
        vis.stateInfo = []

        // merge
        covidDataByState.forEach(state => {

            // get full state name
            let stateName = nameConverter.getFullName(state.key)

            // init counters
            let newCasesSum = 0;
            let newDeathsSum = 0;
            let population = 0;

            // look up population for the state in the census data set
            vis.usaData.forEach(row => {
                if (row.state === stateName) {
                    population += +row["2020"].replaceAll(',', '');
                }
            })

            // calculate new cases by summing up all the entries for each state
            state.value.forEach(entry => {
                newCasesSum += +entry['new_case'];
                newDeathsSum += +entry['new_death'];
            });

            // populate the final data structure
            vis.stateInfo.push(
                {
                    state: stateName,
                    population: population,
                    absCases: newCasesSum,
                    absDeaths: newDeathsSum,
                    relCases: (newCasesSum / population * 100),
                    relDeaths: (newDeathsSum / population * 100)
                }
            )
        })

        // console.log('final data structure for myDataTable', vis.stateInfo);

        vis.updateVis()

    }

    updateVis(){
        let vis = this;

        // update legend
        vis.scale.domain([0, d3.max(vis.stateInfo, d => d[selectedCategory])])

        vis.legendAxisGroup.transition()
            .duration(200)
            .call(d3.axisBottom(vis.scale)
                .ticks(5)
                .tickFormat(function (d) {
                    if ((d/1000) >= 1) {
                        d = d / 1000 + "K";
                    }
                    return d;
                    // console.log("d: " + d);
                }));

        // define a color scale based on # of covid cases
        vis.colorScale = d3.scaleLinear()
            .range(["#FFFFFF", "#136D70"])
            .domain([0, d3.max(vis.stateInfo, d => d[selectedCategory])])

        vis.states
            .attr("fill", d => {
                let stateName = d.properties.name
                let color = ""
                vis.stateInfo.forEach(d => {
                    if (d.state === stateName) {
                        // console.log(d.absCases)
                        // console.log(vis.colorScale(d.absCases)) // confirm that the RGB values are assigned
                        color = vis.colorScale(d[selectedCategory])
                    }
                })
                return color;
            })
            .on('mouseover', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '2px')
                    .attr('stroke', 'black')
                    .attr('fill', 'rgba(255,49,49,0.62)')

                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                     <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                         <h3>${vis.getStateInfo(d.properties.name, "state")}</h3>
                         <h4> Population: ${vis.getStateInfo(d.properties.name, "population")}</h4>
                         <h4> Cases (absolute): ${vis.getStateInfo(d.properties.name, "absCases")}</h4>
                         <h4> Deaths (absolute): ${vis.getStateInfo(d.properties.name, "absDeath")}</h4>
                         <h4> Cases (relative): ${vis.formatAsPercent(vis.getStateInfo(d.properties.name, "relCases"))}</h4>
                         <h4> Deaths (relative): ${vis.formatAsPercent(vis.getStateInfo(d.properties.name, "relDeaths"))}</h4>
                     </div>`);
                // For bonus updating
                // myBrushVis.wrangleDataResponsive();
            })
            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr("fill", d => {
                        let stateName = d.properties.name
                        let color = ""
                        vis.stateInfo.forEach(d => {
                            if (d.state === stateName) {
                                color = vis.colorScale(d[selectedCategory])
                            }
                        })
                        return color;
                    })
                    .attr("stroke", 'black')
                    .attr("stroke-width", 1)
                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            });
    }

    // convert state into proper formatting for calling tooltip
    getStateInfo(stateName, category){
        let vis = this;
        let result = "";

        vis.stateInfo.forEach(d => {
            if(d.state === stateName){
                result = d[category];
            }
        })
        return result;
    }

    formatAsPercent(num){
        return `${parseFloat(num).toFixed(2)}%`;
    }
}
