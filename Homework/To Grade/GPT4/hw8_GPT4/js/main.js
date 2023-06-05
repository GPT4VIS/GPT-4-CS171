// Bar chart configurations: data keys and chart titles
let configs = [
  { key: "ownrent", title: "Own or Rent" },
  { key: "electricity", title: "Electricity" },
  { key: "latrine", title: "Latrine" },
  { key: "hohreligion", title: "Religion" }
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
d3.csv("data/household_characteristics.csv").then(data => {
  data.forEach(d => {
    d.survey = parseDate(d.survey);
  });

  configs.forEach(config => {
    const parentWidth = document.getElementById('barchart-container').getBoundingClientRect().width;
    let chart = new BarChart("barchart-container", data, config, parentWidth);
    barcharts.push(chart);
  });

  const parentWidth = document.getElementById('areachart-container').getBoundingClientRect().width;
  areachart = new AreaChart("areachart-container", data, parentWidth);

  // Add an event listener for the brushed event
  areachart.svg.on("brushed", () => {
    const brushSelection = d3.brushSelection(areachart.brushArea.node());
    brushed(brushSelection);
  });
});

// React to 'brushed' event and update all bar charts
function brushed(brushRegion) {
  barcharts.forEach(chart => {
    chart.selectionChanged(brushRegion);
  });
}