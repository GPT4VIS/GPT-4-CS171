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
// 	(4) Create new are chart object
d3.csv("data/household_characteristics.csv").then(data => {

  // Convert strings to date objects
  data.forEach(d => {
    d.survey = parseDate(d.survey);
  });

  // Create new bar chart objects
  configs.forEach(config => {
    let bc = new BarChart("#" + config.key, data, config);
    barcharts.push(bc);
  });

  // Create new area chart object
  areachart = new AreaChart(".col-md-6", data);
});


// React to 'brushed' event and update all bar charts
function brushed() {

  // * TO-DO *

}
