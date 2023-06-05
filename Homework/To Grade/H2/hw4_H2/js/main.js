// list of wiki links to add to dataset
wiki_links = [
    "https://en.wikipedia.org/wiki/Burj_Khalifa",
    "https://en.wikipedia.org/wiki/International_Commerce_Centre",
    "https://en.wikipedia.org/wiki/KK100",
    "https://en.wikipedia.org/wiki/Abraj_Al_Bait",
    "https://en.wikipedia.org/wiki/One_World_Trade_Center",
    "https://en.wikipedia.org/wiki/Petronas_Towers",
    "https://en.wikipedia.org/wiki/Shanghai_World_Financial_Center",
    "https://en.wikipedia.org/wiki/Taipei_101",
    "https://en.wikipedia.org/wiki/Willis_Tower",
    "https://en.wikipedia.org/wiki/Zifeng_Tower"
]

d3.csv("data/buildings.csv", (row, i) => {
    // convert strings to floats
    row.completed = +row.completed
    row.floors = +row.floors
    row.height_ft = +row.height_ft
    row.height_m = +row.height_m
    row.height_px = +row.height_px
    row.wiki = wiki_links[i]
    return row
}).then((data) => {
    console.log(data)
    data = data.slice().sort((a, b) => d3.descending(a.height_m, b.height_m))
    // check out the data
    console.log(data)

    // create svg
    let svg = d3.select(".chart").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    // draw rectangles
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", "white")
        .attr("width", d => {return d.height_px})
        .attr("height", 30)
        .attr("x", 210)
        .attr("y", (d, i) => (i * 60) + 20)
        .on("click", function(event, d){
                displayDetails(d)
            })

    // add building names text
    svg.selectAll("text_names")
        .data(data)
        .enter()
        .append("text")
        .text(d => {return d.building})
        .attr("y", (d, i) => (i * 60 + 10) + 30)
        .attr("x", 200)
        .attr("class","building-text")
        .on("click", function(event, d){
                displayDetails(d)
            })

    // add building height text
    svg.selectAll("text_height")
        .data(data)
        .enter()
        .append("text")
        .text(d => {return d.height_m})
        .attr("stroke","#22223b")
        .attr("y", (d, i) => (i * 60 + 10) + 30)
        .attr("x", d => {return d.height_px + 205})
        .attr("class","building-height-text")
})

function displayDetails(d) {
    document.getElementById("building-photo").src = "img/" + d.image
    document.getElementById("building-name").innerHTML = d.building
    document.getElementById("22").innerHTML = d.height_m.toString()
    document.getElementById("32").innerHTML = d.city
    document.getElementById("42").innerHTML = d.country
    document.getElementById("52").innerHTML = d.floors.toString()
    document.getElementById("62").innerHTML = d.completed.toString()
    document.getElementById("wiki").href = d.wiki
    document.getElementById("wiki").innerHTML = "Read more on Wikipedia"
}