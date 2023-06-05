// Bar chart configurations: data keys and chart titles
let configs = [
    {key: "ownrent", title: "Own or Rent"},
    {key: "electricity", title: "Electricity"},
    {key: "latrine", title: "Latrine"},
    {key: "hohreligion", title: "Religion"}
];


// Initialize variables to save the charts later
let barcharts = [];
let areachart;


// Date parser to convert strings to date objects
let parseDate = d3.timeParse("%Y-%m-%d");


// (1) Load CSV data
// 	(2) Convert strings to date objects
// 	(3) Create new bar chart objects
// 	(4) Create new area chart object

d3.csv("data/household_characteristics.csv", d => {
    d.survey = parseDate(d.survey)
    return d
}).then(data => {

    // Create bar chart and area chart objects
    let ownrent = new BarChart("ownrent-bar", data, configs[0], data.ownrent);
    let electricity = new BarChart("electricity-bar", data, configs[1], data.electricity);
    let latrine = new BarChart("latrine-bar", data, configs[2], data.latrine);
    let hohreligion = new BarChart("hohreligion-bar", data, configs[3], data.hohreligion);

    barcharts = [ownrent, electricity, latrine, hohreligion];
    areachart = new AreaChart("area-chart", data);
});


// React to 'brushed' event and update all bar charts
function brushed() {

    // Get the extent of the current brush
    let selectionRange = d3.brushSelection(d3.select(".brush").node());

    // Convert the extent into the corresponding domain values
    let selectionDomain = selectionRange.map(areachart.x.invert);

    // Update all bar charts (detailed information)
    barcharts.forEach(bar => bar.selectionChanged(selectionDomain))

}