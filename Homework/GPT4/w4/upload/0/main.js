(async function () {
    const data = await d3.csv("data/buildings.csv");

    data.sort((a, b) => d3.descending(parseFloat(a.height_m), parseFloat(b.height_m)));

    const margin = { left: 150, right: 20, top: 20, bottom: 20 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * (height / data.length))
        .attr("width", d => parseFloat(d.height_px))
        .attr("height", height / data.length - 1)
        .attr("fill", "#3c92d0");

    svg.selectAll("text.name")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "name")
        .attr("x", -10)
        .attr("y", (d, i) => i * (height / data.length) + (height / data.length) / 2)
        .attr("text-anchor", "end")
        .text(d => d.building);

    svg.selectAll("text.height")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "height")
        .attr("x", d => parseFloat(d.height_px) - 5)
        .attr("y", (d, i) => i * (height / data.length) + (height / data.length) / 2)
        .attr("text-anchor", "end")
        .text(d => `${d.height_m} m`);

})();