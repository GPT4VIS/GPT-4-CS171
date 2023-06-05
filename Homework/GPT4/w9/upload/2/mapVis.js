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

    vis.margin = { top: 20, right: 20, bottom: 20, left: 20 };
    vis.width = 960 - vis.margin.left - vis.margin.right;
    vis.height = 600 - vis.margin.top - vis.margin.bottom;

    // Add SVG element to DOM
    vis.svg = d3
      .select("#" + vis.parentElement)
      .append("svg")
      .attr("width", vis.width + vis.margin.left + vis.margin.right)
      .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    // Set tooltip
    vis.tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Set up geoPath generator
    vis.pathGenerator = d3.geoPath();

    // Set up the scale and center the map
    vis.viewpoint = { width: 975, height: 610 };
    vis.zoom = vis.width / vis.viewpoint.width;

    // Adjust map position
    vis.map = vis.svg
      .append("g") // group will contain all state paths
      .attr("class", "states")
      .attr("transform", `scale(${vis.zoom} ${vis.zoom})`);

    // Draw the map (with initial data)
    vis.map
      .selectAll(".state")
      .data(topojson.feature(vis.geoData, vis.geoData.objects.states).features)
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("d", vis.pathGenerator)
      .attr("fill", function (d) {
        // Add the fill color according to the data
        let state = nameConverter.getAbbreviation(d.properties.name);
        let stateData = vis.displayData.find((e) => e.state === state);
        return stateData ? vis.colorScale(stateData.value) : "#ccc";
      })
      .on("mouseover", function (event, d) {
        // Mouseover event functionality
        d3.select(this).attr("stroke", "black");
        vis.tooltip
          .style("opacity", 1)
          .html(`State: ${d.properties.name}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function (event, d) {
        // Mouseout event functionality
        d3.select(this).attr("stroke", "none");
        vis.tooltip.style("opacity", 0);
      });

    // Set title, legend, and scales
    // Add your own code here to create title, legend, and scales

    // Initialize wrangleData
    vis.wrangleData();
  }
}