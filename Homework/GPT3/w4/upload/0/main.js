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
        .attr("x", d => 60)
        .attr("y", (d, i) => i * (HEIGHT / data.length))
        .attr("height", HEIGHT / data.length - BAR_PADDING)
        .attr("width", d => xScale(d.height_px))
        .attr("fill", (d, i) => COLORS[i % COLORS.length])
        .on("click", function (e, d) {
            showBuildingInfo(d);
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
        .attr("font-size", 16);

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
        .attr("font-size", 14);

    // Function to show building info
    function showBuildingInfo(building) {
        const buildingInfo = document.getElementById("building-info");
        buildingInfo.innerHTML = `
			<h1>${building.building}</h1>
			<img src="${IMG_PATH}${building.image}">
			<p>Country: ${building.country}</p>
			<p>City: ${building.city}</p>
			<p>Height: ${building.height_m} m / ${building.height_ft} ft</p>
			<p>Floors: ${building.floors}</p>
			<p>Completed: ${building.completed}</p>
		`;
    }
});