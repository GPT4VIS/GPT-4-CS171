console.log("let's get started!")

// Load the data
d3.csv("data/buildings.csv", (row) => {
    // Format numeric Data
    row.height_m = +row.height_m;
    row.height_ft = +row.height_ft;
    row.floors = +row.floors;
    row.height_px = +row.height_px;
    return row;
}).then(function(buildings_data) {
    console.log(buildings_data);

    // more data actions

    //sort by building height
    buildings_data.sort((a,b) => b.height_m - a.height_m)


    // Add svg element (drawing space)
    let svg = d3.select("body").select("div#left_col").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    // Add rectangles
    svg.selectAll("rect")
        .data(buildings_data)
        .enter()
        .append("rect")
        .attr("fill", "blue")
        .attr("width", function valueHeight(value) {return value.height_px})
        .attr("height", "30")
        .attr("y", (d, i) => i * 40)
        .attr("x", "180")
        .on("click", function(event, d){
            console.log('check out what you have access to', event, d, this)
            // callback function
            buildingClick(d);
        });

    // Add building titles to chart
    svg.selectAll("text.title")
        .data(buildings_data)
        .enter()
        .append("text")
        .attr("class", "title")
        .attr("y", (d, i) => i * 40 + 20)
        .attr("x", "0")
        .attr("fill", "white")
        .attr("text-anchor", "left")
        .attr("font-size", "11")
        .text(function valueBuilding(value) {return value.building})

    // Add data labels to rectangles
    svg.selectAll("text.value")
        .data(buildings_data)
        .enter()
        .append("text")
        .attr("class", "value")
        .attr("y", (d, i) => i * 40 + 20)
        .attr("x", function value(value) {return value.height_px + 150})
        .attr("fill", "white")
        .attr("font-size", "11")
        .text(function valueBuilding(value) {return value.height_m})


})

function buildingClick (d) {
    d3.select("#building_image")
        .attr("xlink:href", "img/" + d.image)
        .attr("src", "img/" + d.image)
    d3.select('#building_title').html(d.building);
    d3.select('#info_height').html(      "Height:                " + d.height_m);
    d3.select('#info_city').html(        "City:                  " + d.city);
    d3.select('#info_country').html(     "Country:               " + d.country);
    d3.select('#info_floors').html(      "# of Floors:           " + d.floors);
    d3.select('#info_yearComplete').html("Year Completed:        " + d.completed);

}