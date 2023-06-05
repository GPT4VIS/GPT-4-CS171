/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */


class MapVis {

  constructor(parentElement, geoData, covidData, usaData) {
    this.parentElement = parentElement;
    this.geoData = geoData;
    this.covidData = covidData;
    this.usaData = usaData;
    this.displayData = [];

    // parse date method
    this.parseDate = d3.timeParse("%m/%d/%Y");

    this.initVis();
  }

  initVis() {
    const vis = this;

    // Margin conventions
    vis.margin = { top: 20, right: 20, bottom: 20, left: 20 };
    vis.width = 960 - vis.margin.left - vis.margin.right;
    vis.height = 600 - vis.margin.top - vis.margin.bottom;

    // Add SVG element to DOM
    vis.svg = d3.select("#" + vis.parentElement)
      .append("svg")
      .attr("width", vis.width + vis.margin.left + vis.margin.right)
      .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    // Set tooltip
    vis.tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Set up geoPath generator
    vis.pathGenerator = d3.geoPath();

    // Draw the map (with initial data)
    vis.map = vis.svg.selectAll(".state")
      .data(topojson.feature(vis.geoData, vis.geoData.objects.states).features)
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("d", vis.pathGenerator)
      .attr("fill", "initial-color") // Replace this with your chosen color scale
      .on("mouseover", function (event, d) {
        // Your mouseover event functionality
      })
      .on("mouseout", function (event, d) {
        // Your mouseout event functionality
      });

    // Set title, legend, and scales
    // Add your own code here to create title, legend, and scales

    // Initialize wrangleData
    vis.wrangleData();
  }
}