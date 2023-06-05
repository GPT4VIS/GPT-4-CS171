/* * * * * * * * * * * * * *
*      class BarVis        *
* * * * * * * * * * * * * */


class BarVis {

    constructor(parentElement, covidData, usaData, topOrBottom){
        this.parentElement = parentElement;
        this.covidData = covidData;
        this.usaData = usaData;
        this.topOrBottom = topOrBottom;

        // parse date method
        this.parseDate = d3.timeParse("%m/%d/%Y");

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.svg.append('g')
            .attr('class', 'title bar-title')
            .append('text')
            .text(vis.topOrBottom + ' 10 States for ' + selectedCategory)
            .attr('transform', `translate(${vis.width / 2}, 10)`)
            .attr('text-anchor', 'middle');

        // tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'barTooltip')

        // MY WORK STARTS HERE
        // Scales and Axes
        vis.x = d3.scaleBand()
            .rangeRound([0, vis.width])
            .paddingInner(0.1);// <-- Also enables rounding .paddingInner(0.05);

        vis.y = d3.scaleLinear()
            .range([vis.height, 0]);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        vis.svg.append("g")
            .attr("transform", "translate(0," + vis.height + ")")
            .attr("class", "x-axis axis")

        vis.svg.append("g")
            .attr("class", "y-axis axis")

        // append tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip');

        this.wrangleData();
    }

    wrangleData(){
        let vis = this
        // Pulling this straight from dataTable.js
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
        // TODO: Sort and then filter by top 10
        // maybe a boolean in the constructor could come in handy ?

        if (vis.topOrBottom === 'Top'){
            vis.stateInfo.sort((a,b) => {return b[selectedCategory] - a[selectedCategory]})
        } else {
            vis.stateInfo.sort((a,b) => {return a[selectedCategory] - b[selectedCategory]})
        }

        console.log('final data structure for unsliced', vis.stateInfo);

        vis.topTenData = vis.stateInfo.slice(0, 10);

        vis.topTenDataNames = [];
        vis.topTenData.forEach(function(state) {
            vis.topTenDataNames.push(state.state);
        })

        console.log('final data structure for bar charts', vis.topTenData);



        vis.updateVis()

    }

    updateVis(){
        let vis = this;

        console.log(vis.topTenData);
        console.log(vis.topTenDataNames);

        vis.x
            .domain(vis.topTenDataNames);

        vis.y
            .domain([0, d3.max(vis.topTenData, d => d[selectedCategory])]);

        vis.svg.select('.x-axis')
            .call(vis.xAxis);

        vis.svg.select('.y-axis')
            .call(vis.yAxis);

        vis.bars = vis.svg.selectAll('rect')
            .data(vis.topTenData);

        vis.bars.exit().remove()
            .transition()
            .duration(2000);

        vis.bars
            .enter()
            .append('rect')
            .merge(vis.bars)
            .attr('class', 'bar')
            .style('fill', '#22223b')
            .attr('x', d => vis.x(d.state) + 5)
            .attr('y', d => vis.y(d[selectedCategory]))
            .attr('height', d => vis.height - vis.y(d[selectedCategory]))
            .attr('width', vis.x.bandwidth() - 10)
            .on('mouseover', function(event, d){
                console.log("d: ", d);
                let state = vis.topTenData.find(o => o.state === d.state);
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
                        let state = vis.topTenData.find(o => o.state === d.state);
                        return '#22223b';
                    })

                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            })
            .transition()
            .duration(2000);


    }



}