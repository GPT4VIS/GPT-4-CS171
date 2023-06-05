/*
 * BarChart - Object constructor function
 * @param _parentElement -- the HTML element in which to draw the bar charts
 * @param _data						-- the dataset 'household characteristics'
 * @param _config					-- variable from the dataset (e.g. 'electricity') and title for each bar chart
 */


class BarChart {

	constructor(parentElement, data, config) {
		this.parentElement = parentElement;
		this.data = data;
		this.config = config;
		this.displayData = data;

		console.log(this.displayData);

		this.initVis();
	}


	/*
	 * Initialize visualization (static content; e.g. SVG area, axes)
	 */

	initVis() {
		let vis = this;

    // Define inner dimensions
    vis.margin = { top: 35, right: 10, bottom: 30, left: 80 };
    vis.width = 250 - vis.margin.left - vis.margin.right;
    vis.height = 150 - vis.margin.top - vis.margin.bottom;


    // Append SVG area to the parent element
    vis.svg = d3.select("#" + vis.parentElement)
      .append("svg")
      .attr("width", vis.width + vis.margin.left + vis.margin.right)
      .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    // Define and append x-Axis and scale
    vis.x = d3.scaleBand()
      .range([0, vis.width])
      .padding(0.1);
    vis.xAxis = d3.axisBottom()
      .scale(vis.x);
    vis.svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + vis.height + ")");


    // Define and append y-Axis and scale
    vis.y = d3.scaleLinear()
      .range([vis.height, 0]);
    vis.yAxis = d3.axisLeft()
      .scale(vis.y);
    vis.svg.append("g")
      .attr("class", "y-axis");


    // Append chart title
    vis.svg.append("text")
      .attr("class", "title")
      .attr("x", -50)
      .attr("y", -10)
      .text(vis.config.title);


		// (Filter, aggregate, modify data)
		vis.wrangleData();
	}
//----------------------------------------------------------------------------------------------------
	/*
	 * Data wrangling
	 */

	wrangleData() {
		let vis = this;

		// (1) Group data by key variable (e.g. 'electricity') and count leaves
		// (2) Sort columns descending

    vis.groupedData = Array.from(d3.rollup(vis.displayData, leaves => leaves.length, d => d[vis.config.key]), ([key, value]) => ({key, value}))
      .sort((a, b) => d3.descending(a.value, b.value));

		// Update the visualization
		vis.updateVis();
	}
//----------------------------------------------------------------------------------------------------
	/*
	 * The drawing function - should use the D3 update sequence (enter, update, exit)
	 */

	updateVis() {
		let vis = this;

		// (1) Update domains
		// (2) Draw rectangles
		// (3) Draw labels

    vis.x.domain(vis.groupedData.map(d => d.key));
    vis.y.domain([0, d3.max(vis.groupedData, d => d.value)]);


		// Update the x-axis
		vis.svg.select(".x-axis")
			.call(vis.xAxis)
		  .selectAll("text")
      .attr("y", 9)
      .attr("x", -5)
      .attr("dy", ".35em")
      .attr("transform", "rotate(-25)")
      .style("text-anchor", "end");


		// Update the y-axis
		vis.svg.select(".y.axis")
			.call(vis.yAxis);


		// Update rectangles
		vis.rects = vis.svg.selectAll(".bar")
			.data(vis.groupedData);

		vis.rects.enter()
			.append("rect")
			.attr("class", "bar")
			.merge(vis.rects)
			.transition()
			.duration(200)
			.attr("x", d => vis.x(d.key))
			.attr("y", d => vis.y(d.value))
			.attr("width", vis.x.bandwidth())
			.attr("height", d => vis.height - vis.y(d.value));

		vis.rects.exit()
			.remove();


		// Update labels
		vis.labels = vis.svg.selectAll(".label")
			.data(vis.groupedData);

		vis.labels.enter()
			.append("text")
			.attr("class", "label")
			.merge(vis.labels)
			.transition()
			.duration(200)
			.attr("x", d => vis.x(d.key) + vis.x.bandwidth() / 2)
			.attr("y", d => vis.y(d.value) - 5)
			.attr("text-anchor", "middle")
			.text(d => d.value);

		vis.labels.exit()
			.remove();

	}

//----------------------------------------------------------------------------------------------------
	/*
	 * Filter data when the user changes the selection
	 * Example for brushRegion: 07/16/2016 to 07/28/2016
	 */

	selectionChanged(brushRegion) {
		let vis = this;

		// Filter data accordingly without changing the original data
    vis.displayData = vis.data.filter(d => d.survey >= brushRegion[0] && d.survey <= brushRegion[1]);

		// Update the visualization
		vis.wrangleData();
	}
}