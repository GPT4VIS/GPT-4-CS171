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
      .attr("fill", "#ccc") // Placeholder value, updateVis will update the fill with actual data later
      .on("mouseover", function (event, d) {
        // Mouseover event functionality
        d3.select(this).attr("stroke", "black");
        let stateAbbreviation = nameConverter.getAbbreviation(d.properties.name);
        let stateData = vis.displayData.find((e) => e.state === stateAbbreviation);
        let tooltipHTML = `
        <div>
          <strong>State:</strong> ${stateData.name}<br/>
          <strong>Population:</strong> ${stateData.population}<br/>
          <strong>New Cases (abs):</strong> ${stateData.newCases}<br/>
          <strong>New Cases (rel):</strong> ${d3.format(".2f")(stateData.newCases / stateData.population * 100)}%<br/>
          <strong>New Deaths (abs):</strong> ${stateData.newDeaths}<br/>
          <strong>New Deaths (rel):</strong> ${d3.format(".2f")(stateData.newDeaths / stateData.population * 100)}%
        </div>
      `;

        vis.tooltip
          .style("opacity", 1)
          // .html(`State: ${d.properties.name}`)
          .html(tooltipHTML)
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
    vis.tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Initialize wrangleData
    vis.wrangleData();
  }

  wrangleData() {
    let vis = this;

    // Check if selectedTimeRange has a time range selected, if not, use the entire covidData
    let filteredData =
      selectedTimeRange.length !== 0
        ? vis.covidData.filter((row) =>
          selectedTimeRange[0].getTime() <= vis.parseDate(row.submission_date).getTime() &&
          vis.parseDate(row.submission_date).getTime() <= selectedTimeRange[1].getTime()
        )
        : vis.covidData;

    // Get covid data by state
    let covidDataByState = Array.from(
      d3.group(filteredData, (d) => d.state),
      ([key, value]) => ({ key, value })
    );

    // Initialize an array to store the merged data
    vis.displayData = [];

    // Merge the covid data and population data
    covidDataByState.forEach((state) => {
      let stateName = nameConverter.getFullName(state.key);
      let newCasesSum = 0;
      let newDeathsSum = 0;
      let population = 0;

      // Find the population for each state
      vis.usaData.forEach((row) => {
        if (row.state === stateName) {
          population += +row["2020"].replaceAll(",", "");
        }
      });

      // Calculate new cases and new deaths for each state
      state.value.forEach((entry) => {
        newCasesSum += +entry["new_case"];
        newDeathsSum += +entry["new_death"];
      });

      let absCases = newCasesSum;
      let absDeaths = newDeathsSum;
      let relCases = newCasesSum / population * 100;
      let relDeaths = newDeathsSum / population * 100;

      let categoryValue;

      switch (selectedCategory) {
        case "absCases":
          categoryValue = absCases;
          break;
        case "absDeaths":
          categoryValue = absDeaths;
          break;
        case "relCases":
          categoryValue = relCases;
          break;
        case "relDeaths":
          categoryValue = relDeaths;
          break;
      }

      vis.displayData.push({
        state: state.key,
        name: stateName,
        population: population,
        newCases: absCases,
        newDeaths: absDeaths,
        relCases: relCases,
        relDeaths: relDeaths,
        value: categoryValue,
      });
    });

    console.log("wrangled data:", vis.displayData);

    // Call the updateVis method
    vis.updateVis();
  }

  updateVis() {
    const vis = this;

    // Create a color scale
    vis.colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateBlues)
      .domain([0, d3.max(vis.displayData, d => d.value)]);

    vis.map
      .selectAll(".state")
      .attr("fill", function (d) {
        let state = nameConverter.getAbbreviation(d.properties.name);
        let stateData = vis.displayData.find((e) => e.state === state);
        return stateData ? vis.colorScale(stateData.value) : "#ccc";
      });
  }
}