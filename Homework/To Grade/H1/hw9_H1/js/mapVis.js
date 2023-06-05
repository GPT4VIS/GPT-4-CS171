/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */


class MapVis {

    // constructor method to initialize Timeline object
    constructor(parentElement, geoData, covidData, usaData) {
        this.parentElement = parentElement;
        this.geoData = geoData;
        this.covidData = covidData;
        this.usaData = usaData;
        this.displayData = [];

        // parse date method
        this.parseDate = d3.timeParse("%m/%d/%Y");

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        vis.colors = d3.scaleLinear()
            .range(['white', "#136D70"]);

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
            .attr('id', 'map-title-categorized')
            .text(selectedCategory + ' In Each US State')
            .attr('transform', `translate(${vis.width / 2}, 15)`)
            .attr('text-anchor', 'middle');

        // projection
        // vis.projection = d3.geoAlbersUsa() // d3.geoStereographic()
        //    .translate([vis.width / 2, vis.height / 2])
        //    .scale([600]);

        // path
        vis.path = d3.geoPath();

        vis.viewpoint = {'width': 975, 'height': 610};
        vis.zoom = vis.width / vis.viewpoint.width;

        // adjust map position
        vis.map = vis.svg.append("g") // group will contain all state paths
            .attr("class", "states")
            .attr('transform', `scale(${vis.zoom} ${vis.zoom})`);

        console.log("vis.geoData.objects: ", vis.geoData.objects)
        vis.usa = topojson.feature(vis.geoData, vis.geoData.objects.states).features

        vis.states = vis.map.selectAll(".states")
            .data(vis.usa)
            .enter().append("path")
            .attr('class', 'state')
            .attr("d", vis.path);

        // legend group
        vis.legend = vis.svg.append("g")
            .attr('class', 'legend')
            .attr('transform', `translate(${vis.width * 1 / 2}, ${vis.height - 100})`)

        vis.legendLabelMin = vis.legend.append('text')
            .text('0')
            .attr('x', -5)
            .attr('y', 45);
        vis.legendLabelMax = vis.legend.append('text')
            .attr('x', 175)
            .attr('y', 45);

        // append tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip');

        /* legend axis group
        vis.legend.append('g')
            .attr('class', 'legend-axis axis');

        vis.legendAxis = d3.axisBottom()
            .scale(vis.colors);*/

        // wrangleData
        vis.wrangleData()
    }

    wrangleData() {
        let vis = this

        vis.svg.select('#map-title-categorized').text(selectedCategory + ' In Each US State');

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
        console.log("covidDataByState: ", covidDataByState)

        // init final data structure in which both data sets will be merged into
        vis.displayData = []

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
            vis.displayData.push(
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

        console.log('final data structure for myMapVis (displayData): ', vis.displayData);

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        vis.colors.domain([0, d3.max(vis.displayData, d => d[selectedCategory])]);

        vis.gradientRange = d3.range(0,
            d3.max(vis.displayData, d => d[selectedCategory]),
            d3.max(vis.displayData, d => d[selectedCategory])/200);

        // Update the legend fill
        vis.legendBar = vis.legend.selectAll(".rect")
            .data(vis.gradientRange)
            .enter()
            .append("rect")
            .attr("y", 0)
            .attr("height", 25)
            .attr("x", (d,i) => i*1)
            .attr("width", 1)
            .attr("fill", d=>vis.colors(d));

        vis.legendLabelMax.text(d3.max(vis.displayData, d => d[selectedCategory]));

        // vis.legend.call(vis.legendAxis);

        console.log("vis.usa", vis.usa);

        vis.states
            .attr("fill", function(d){
                let state = vis.displayData.find(o => o.state === d.properties.name);
                return vis.colors(state[selectedCategory]);
            })
            .on('mouseover', function(event, d){
                console.log("d: ", d);
                console.log("d.properties.name", d.properties.name);
                let state = vis.displayData.find(o => o.state === d.properties.name);
                console.log("state: ", state);
                d3.select(this)
                    .attr('stroke-width', '2px')
                    .attr('stroke', 'black')
                    .attr('fill', 'rgba(173,222,255,0.62)')
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                 <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                     <h3> ${state.state} <h3>
                     <h4> Population: ${state.population}</h4>      
                     <h4> Cases (absolute): ${state.absCases}</h4>
                     <h4> Deaths (absolute): ${state.absDeaths}</h4>
                     <h4> Cases (relative): ${state.relCases}</h4>
                     <h4> Deaths (relative): ${state.relDeaths}</h4>             
                 </div>`)
            })
            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '0px')
                    .attr("fill", function(d){
                        let state = vis.displayData.find(o => o.state === d.properties.name);
                        return vis.colors(state[selectedCategory]);
                    })

                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            });

    }
}