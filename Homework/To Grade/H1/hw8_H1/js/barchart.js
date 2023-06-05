

/*
 * BarChart - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the bar charts
 * @param _data						-- the dataset 'household characteristics'
 * @param _config					-- variable from the dataset (e.g. 'electricity') and title for each bar chart
 */


class BarChart {

	constructor(parentElement, data, config) {
		this.parentElement = parentElement;
		this.data = data;
		this.config = config;
		this.displayData = data;

		this.initVis();
	}


	/*
	 * Initialize visualization (static content; e.g. SVG area, axes)
	 */

	initVis() {
		let vis = this;

		vis.margin = {top: 10, right: 50, bottom: 10, left: 100};

		vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
		vis.height = 100;

		// SVG drawing area
		vis.svg = d3.select("#" + vis.parentElement).append("svg")
			.attr("width", vis.width + vis.margin.left + vis.margin.right)
			.attr("height", vis.height + vis.margin.top + vis.margin.bottom)
			.append("g")
			.attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

		// Set up scales and axes
		vis.x = d3.scaleLinear()
			.range([0, vis.width - vis.margin.right]);

		vis.y = d3.scaleBand()
			.rangeRound([vis.height, 0])
			.paddingInner(0.1);

		vis.xAxis = d3.axisBottom()
			.scale(vis.x);

		vis.yAxis = d3.axisLeft()
			.scale(vis.y);

		// Append y-axis to SVG area
		vis.svg.append("g")
			.attr("class", "y-axis axis");

		// (Filter, aggregate, modify data)
		vis.wrangleData();
	}



	/*
	 * Data wrangling
	 */

	wrangleData() {
		let vis = this;

		// (1) Group data by key variable (e.g. 'electricity') and count leaves
		// (2) Sort columns descending

		vis.countGrouped = d3.rollup(vis.displayData,leaves=>leaves.length,d=>d[vis.config.key])
		vis.countGrouped = Array.from(vis.countGrouped, ([key, value]) => ({key, value}))
		console.log(vis.countGrouped);
		vis.countValues = []
		vis.categories = []

		// Sort and create key/value arrays
		vis.countGrouped.sort((a,b) => { return a.value - b.value })
		vis.countGrouped.forEach(
			row =>
			{vis.countValues.push(row.value);
				vis.categories.push(row.key);}
		);
		console.log(vis.countGrouped);


		// Update the visualization
		vis.updateVis();
	}



	/*
	 * The drawing function - should use the D3 update sequence (enter, update, exit)
	 */

	updateVis() {
		let vis = this;
		let bandWidth = vis.y.bandwidth()

		// Update domains
		vis.x.domain([0, d3.max(vis.countValues)])
		vis.y.domain(vis.categories)

		// Draw rectangles for bar graph
		let rect = vis.svg.selectAll('.rect')
			.data(vis.countGrouped)

		rect.enter()
			.append('rect')
			.attr('class','rect')
			.merge(rect)
			.transition()
			.duration(200)
			.attr('x', 0)
			.attr('y', (d, i) => vis.y(d.key))
			.attr('width', d => vis.x(d.value))
			.attr('height', vis.y.bandwidth())
			.attr("fill", "navy")

		rect.exit().remove();

		// Add labelling and updates
		let labels = vis.svg.selectAll('.labels')
			.data(vis.countGrouped)

		labels.enter()
			.append('text')
			.attr('class','labels')
			.merge(labels)
			.transition()
			.duration(200)
			.text((d) => d.value)
			.attr('x', (d) => 15 + vis.x(d.value))
			.attr('y', (d, i) => 15 + vis.y(d.key))
			.attr("fill", "black")
			.transition()

		labels.exit().remove();

		// Update the y-axis
		vis.svg.select(".y-axis").call(vis.yAxis);
	}



	/*
	 * Filter data when the user changes the selection
	 * Example for brushRegion: 07/16/2016 to 07/28/2016
	 */

	selectionChanged(brushRegion) {
		let vis = this;

		// Filter data accordingly without changing the original data

		vis.displayData = vis.data.filter(function(d){
			return d.survey >= brushRegion[0] && d.survey <= brushRegion[1] ;
		});

		// Update the visualization
		vis.wrangleData();
	}
}

