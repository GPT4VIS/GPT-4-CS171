/*
 * BarChart - Object constructor function
 * @param _parentElement  -- the HTML element in which to draw the bar charts
 * @param _data            -- the dataset 'household characteristics'
 * @param _config          -- variable from the dataset (e.g. 'electricity') and title for each bar chart
 */

class BarChart {

  constructor(parentElement, data, config) {
    this.parentElement = parentElement;
    this.data = data;
    this.config = config;
    this.displayData = [];

    this.initVis();
  }

  /*
   * Initialize visualization (static content; e.g. SVG area, axes)
   */
  initVis() {
    let vis = this;

    // Set up dimensions
    vis.margin = {
      top: 40,
      right: 30,
      bottom: 60,
      left: 60
    };
    vis.width = 350 - vis.margin.left - vis.margin.right;
    vis.height = 220 - vis.margin.top - vis.margin.bottom;

    // Append SVG
    vis.svg = d3
      .select(vis.parentElement)
      .append("svg")
      .attr("width", vis.width + vis.margin.left + vis.margin.right)
      .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
      .append("g")
      .attr("transform", `translate(${vis.margin.left},${vis.margin.top})`);

    // Scales and axes
    vis.x = d3
      .scaleBand()
      .range([0, vis.width])
      .padding(0.1);

    vis.y = d3.scaleLinear().range([vis.height, 0]);

    vis.xAxis = d3.axisBottom(vis.x);
    vis.yAxis = d3.axisLeft(vis.y);

    vis.svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${vis.height})`);

    vis.svg.append("g").attr("class", "y-axis");

    // Title
    vis.svg
      .append("text")
      .attr("class", "title")
      .attr("x", vis.width / 2)
      .attr("y", -vis.margin.top / 2)
      .attr("text-anchor", "middle")
      .text(vis.config.title);

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

    vis.displayData = Array.from(
      d3.rollup(
        vis.data,
        v => v.length,
        d => d[vis.config.key]
      ),
      ([key, value]) => ({ key: key, value: value })
    );

    vis.displayData.sort((a, b) => d3.descending(a.value, b.value));

    // Update the visualization
    vis.updateVis();
  }

  /*
   * The drawing function - should use the D3 update sequence (enter, update, exit)
   */
  updateVis() {
    let vis = this;

    // (1) Update domains
    vis.x.domain(vis.displayData.map(d => d.key));
    vis.y.domain([0, d3.max(vis.displayData, d => d.value)]);

    // (2) Draw rectangles
    let rects = vis.svg.selectAll("rect").data(vis.displayData);

    rects
      .enter()
      .append("rect")
      .attr("class", "bar")
      .on("mouseover", function () {
        d3.select(this).style("fill", "orange");
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", "steelblue");
      })
      .merge(rects)
      .transition()
      .duration(1000)
      .attr("width", vis.x.bandwidth())
      .attr("height", d => vis.height - vis.y(d.value))
      .attr("x", d => vis.x(d.key))
      .attr("y", d => vis.y(d.value));

    rects.exit().remove();

    // (3) Draw labels
    let labels = vis.svg.selectAll(".label").data(vis.displayData);

    labels
      .enter()
      .append("text")
      .attr("class", "label")
      .merge(labels)
      .transition()
      .duration(1000)
      .text(d => d.value)
      .attr("x", d => vis.x(d.key) + vis.x.bandwidth() / 2)
      .attr("y", d => vis.y(d.value) - 5)
      .attr("text-anchor", "middle");

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

    let filteredData = vis.data.filter(
      d =>
        d.survey.getTime() >= brushRegion[0] &&
        d.survey.getTime() <= brushRegion[1]
    );

    vis.displayData = Array.from(
      d3.rollup(
        filteredData,
        v => v.length,
        d => d[vis.config.key]
      ),
      ([key, value]) => ({ key: key, value: value })
    );

    vis.displayData.sort((a, b) => d3.descending(a.value, b.value));

    // Update the visualization
    vis.updateVis();
  }
}