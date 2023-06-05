/*
 * AreaChart - Object constructor function
 * @param _parentElement  -- the HTML element in which to draw the area chart
 * @param _data           -- the dataset 'household characteristics'
 */


class AreaChart {

  constructor(parentElement, data) {
    this.parentElement = parentElement;
    this.data = data;
    this.displayData = [];

    this.initVis();
  }

  initVis() {
    let vis = this;

    vis.margin = { top: 20, right: 10, bottom: 20, left: 40 };
    vis.width = 400 - vis.margin.left - vis.margin.right;
    vis.height = 250 - vis.margin.top - vis.margin.bottom;

    vis.svg = d3.select("#" + vis.parentElement).append("svg")
      .attr("width", vis.width + vis.margin.left + vis.margin.right)
      .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
      .append("g")
      .attr("class", "chart")
      .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    vis.x = d3.scaleTime()
      .range([0, vis.width]);

    vis.y = d3.scaleLinear()
      .range([vis.height, 0]);

    vis.yAxis = d3.axisLeft()
      .scale(vis.y);

    vis.xAxis = d3.axisBottom()
      .scale(vis.x)
      .ticks(6);

    vis.svg.append("g")
      .attr("class", "y-axis axis");

    vis.svg.append("g")
      .attr("class", "x-axis axis")
      .attr("transform", "translate(0," + vis.height + ")");

    vis.timePath = vis.svg.append("path")
      .attr("class", "area");

    // Add brushing
    vis.brush = d3.brushX()
      .extent([[0, 0], [vis.width, vis.height]])
      .on("brush", function (event) {
        vis.brushRegion = event.selection.map(vis.x.invert);
        brushed(vis.brushRegion);
      });

    vis.svg.append("g")
      .attr("class", "brush")
      .call(vis.brush);

    vis.wrangleData();
  }

  wrangleData() {
    let vis = this;

    vis.displayData = d3.rollup(vis.data, v => v.length, d => d.survey);
    // Transform back to an array
    vis.displayData = Array.from(vis.displayData, d => ({ date: d[0], value: d[1] }));

    vis.displayData.sort((a, b) => a.date - b.date);

    vis.updateVis();
  }

  updateVis() {
    let vis = this;

    vis.x.domain(d3.extent(vis.displayData, function (d) {
      return d.date;
    }));
    vis.y.domain([0, d3.max(vis.displayData, function (d) {
      return d.value;
    })]);

    vis.area = d3.area()
      .curve(d3.curveCardinal)
      .x(function (d) {
        return vis.x(d.date);
      })
      .y0(vis.height)
      .y1(function (d) {
        return vis.y(d.value);
      });

    vis.timePath
      .datum(vis.displayData)
      .attr("d", vis.area);

    vis.svg.select(".y-axis").call(vis.yAxis);
    vis.svg.select(".x-axis").call(vis.xAxis);
  }
}