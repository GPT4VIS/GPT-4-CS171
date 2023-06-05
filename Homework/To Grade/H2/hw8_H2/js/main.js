// Bar chart configurations: data keys and chart titles
let configurations = [
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
// 	(4) Create new are chart object

d3.csv("data/household_characteristics.csv"). then(csv=>{
    csv.forEach(function(d){
        d.survey = parseDate(d.survey);
    });

    data = csv;

    configurations.forEach(function(d,i){
        barname = "bar_" + configurations[i].key;
        label = "bar" + i;
        barcharts[i] = new BarChart(label, data, configurations[i].key, configurations[i].title);
    });

    areachart = new AreaChart("histogram-chart", data);
});


// React to 'brushed' event and update all bar charts
function brushed() {
    let selectionRange = d3.brushSelection(d3.select(".brush").node());
    let selectionDomain = selectionRange.map(areachart.xScale.invert);
    barcharts.forEach(d=>d.selectionChanged(selectionDomain));
};

window.addEventListener("resize", function(d){
    areahart.initVis()
    barcharts.forEach(d=>d.initVis())
});

