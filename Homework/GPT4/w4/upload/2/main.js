(async function () {
    const data = await d3.csv("data/buildings.csv");

    // Function to handle the click event on a building bar or label
    const handleClick = (event, d) => {
        const info = d3.select("#info");
        info.selectAll("*").remove();

        info.append("img")
            .attr("src", `img/${d.image}`)
            .style("width", "100%");

        info.append("h2").text(d.building);
        info.append("p").text(`Country: ${d.country}`);
        info.append("p").text(`City: ${d.city}`);
        info.append("p").text(`Height: ${d.height_m}m / ${d.height_ft}ft`);
        info.append("p").text(`Floors: ${d.floors}`);
        info.append("p").text(`Completed: ${d.completed}`);
    };

    // Sorting data by height
    data.sort((a, b) => d3.descending(parseFloat(a.height_m), parseFloat(b.height_m)));

    const margin = { left: 150, right: 20, top: 20, bottom: 20 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    // Adding bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * (height / data.length))
        .attr("width", d => parseFloat(d.height_px))
        .attr("height", height / data.length - 1)
        .attr("fill", "#3c92d0")
        .on("click", handleClick);

    // Adding building names
    svg.selectAll("text.name")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "name")
        .attr("x", -10)
        .attr("y", (d, i) => i * (height / data.length) + (height / data.length) / 2)
        .attr("text-anchor", "end")
        .text(d => d.building)
        .on("click", handleClick);

    // Adding building heights
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