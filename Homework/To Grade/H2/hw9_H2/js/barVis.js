/* * * * * * * * * * * * * *
*      class BarVis        *
* * * * * * * * * * * * * */


class BarVis {

    constructor(parentElement, covidData, usaData, ascending = true){

        this.parentElement = parentElement;
        this.covidData = covidData;
        this.usaData = usaData;
        this.ascending = ascending;
        this.displayData = [];

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
            .text('Top 10 States') // fix title
            .attr('transform', `translate(${vis.width / 2}, 10)`)
            .attr('text-anchor', 'middle');

        // tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'barTooltip')

        // TODO
        // axis groups
        vis.xAxisGroup = vis.svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate (0,${vis.height})`);

        vis.yAxisGroup = vis.svg.append('g')
            .attr('class', 'axis y-axis');

        // initiate scales
        vis.xScale = d3.scaleBand()
            .range([0, vis.width])
            .padding(0.1)
        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0])

        vis.xAxis = d3.axisBottom()
            .scale(vis.xScale);
        vis.yAxis = d3.axisLeft()
            .scale(vis.yScale);

        // vis.xAxis.call(d3.axisBottom(vis.xScale));
        //vis.yAxis.call(d3.axisLeft(vis.yScale).ticks(5));

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

        if (vis.ascending){
            vis.stateInfo.sort((a,b) => {return a[selectedCategory] - b[selectedCategory]})
        } else {
            vis.stateInfo.sort((a,b) => {return b[selectedCategory] - a[selectedCategory]})
        }

        console.log('final data structure', vis.stateInfo);

        vis.topTenData = vis.stateInfo.slice(0, 10)

        console.log('final data structure', vis.topTenData);


        vis.updateVis()

    }

    updateVis(){
        let vis = this;

        console.log('here')

        // update domains
        vis.xScale.domain(vis.topTenData.map(d => d.state))
        vis.yScale.domain([0, d3.max(vis.topTenData, d => d[selectedCategory])])

        vis.colorScale = d3.scaleLinear()
            .range(["#FFFFFF", "#136D70"])
            .domain([0, d3.max(vis.topTenData, d => d[selectedCategory])])

        // bind the data
        vis.stateBars = vis.svg.selectAll(".bars")
            .data(vis.topTenData, d => d.state)

        // console.log(vis.stateBars)

        vis.stateBars
            .enter()
            .append("rect")
            .merge(vis.stateBars)
            .attr("class", "bars")
            .attr("x", d => vis.xScale(d.state))
            .attr("y", d => vis.yScale(d[selectedCategory]))
            .attr("width", vis.xScale.bandwidth())
            .attr("height", d => (vis.height - vis.yScale(d[selectedCategory])))
            .attr("fill", d => vis.colorScale(d[selectedCategory]))
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
                         <h3>${d.state}</h3>
                         <h4> Population: ${d.population}</h4>
                         <h4> Cases (absolute): ${d.absCases}</h4>
                         <h4> Deaths (absolute): ${d.absDeaths}</h4>
                         <h4> Cases (relative): ${vis.formatAsPercent(d.relCases)}</h4>
                         <h4> Deaths (relative): ${vis.formatAsPercent(d.relDeaths)}</h4>
                     </div>`);
            })
            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '0px')
                    .attr("fill", d => vis.colorScale(d[selectedCategory]))
                    .attr("stroke", 'black')
                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            });

        vis.stateBars.exit().remove()

        // update the x axis
        vis.svg.select(".x-axis")
            .attr('font-size', 15)
            .transition()
            .duration(500)
            .call(vis.xAxis);

        // update the y axis
        vis.svg.select(".y-axis")
            .transition()
            .duration(500)
            .call(vis.yAxis);


    }
    formatAsPercent(num){
        return `${parseFloat(num).toFixed(2)}%`;
    }

}