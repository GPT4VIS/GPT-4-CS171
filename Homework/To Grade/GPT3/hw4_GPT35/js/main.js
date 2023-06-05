// Constants
const COLORS = ["#1a8cff", "#3282b8", "#5a5c5e", "#5d5c5c", "#7e4a35", "#f04d22", "#cf1b1b", "#0c0a0a", "#af9ab2", "#752c53"];
const IMG_PATH = "img/";

// Load data
d3.csv("data/buildings.csv").then(function (data) {

  // Sort data in descending order
  data.sort(function (a, b) {
    return d3.descending(parseInt(a.height_px), parseInt(b.height_px));
  });

  // SVG constants
  const HEIGHT = 460;
  const WIDTH = 500;
  const BAR_PADDING = 5;

  // Create SVG
  const svg = d3.select("#chart")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);

  // Scales
  const xScale = d3.scaleLinear()
    .range([0, WIDTH])
    .domain([0, d3.max(data, d => parseInt(d.height_px))]);

  // Draw rectangles
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 60)
    .attr("y", (d, i) => i * (HEIGHT / data.length))
    .attr("height", HEIGHT / data.length - BAR_PADDING)
    .attr("width", d => xScale(d.height_px))
    .attr("fill", (d, i) => COLORS[i % COLORS.length])
    .on("click", function (e, d) {
      showBuildingInfo(d);
      highlightBuilding(this);
    });

  // Draw building labels
  svg.selectAll(".building")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "building")
    .attr("x", d => 55)
    .attr("y", (d, i) => i * (HEIGHT / data.length) + 23)
    .text(d => d.building)
    .attr("text-anchor", "end")
    .attr("fill", "black")
    .attr("font-size", 16)
    .on("click", function (e, d) {
      showBuildingInfo(d);
      highlightBuilding(svg.select(`[height_px="${d.height_px}"]`).node());
    });

  // Draw height labels
  svg.selectAll(".height")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "height")
    .attr("x", d => xScale(d.height_px) + 65)
    .attr("y", (d, i) => i * (HEIGHT / data.length) + 19)
    .text(d => `${d.height_m} m`)
    .attr("fill", "white")
    .attr("font-size", 14)
    .on("click", function (e, d) {
      showBuildingInfo(d);
      highlightBuilding(svg.select(`[height_px="${d.height_px}"]`).node());
    });

  // Function to show building info
  function showBuildingInfo(building) {
    const buildingInfo = document.getElementById("building-info");
    buildingInfo.innerHTML = `
			<h1>${building.building}</h1>
			<div>
        <img src="${IMG_PATH}${building.image}" alt="${building.building}" class="building-image">
        <div class="building-info-content">
          <p><span>Country:</span> ${building.country}</p>
          <p><span>City:</span> ${building.city}</p>
          <p><span>Height:</span> ${building.height_m} m / ${building.height_ft} ft</p>
          <p><span>Floors:</span> ${building.floors}</p>
          <p><span>Completed:</span> ${building.completed}</p>
        </div>
      </div>
		`;
  }

  // Function to highlight the selected building
  function highlightBuilding(building) {
    // Remove highlight from previous selection
    svg.selectAll(".bar")
      .attr("stroke", "none")
      .attr("stroke-width", 0);

    // Add highlight to current selection
    d3.select(building)
      .attr("stroke", "#333")
      .attr("stroke-width", 2);
  }
});