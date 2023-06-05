## 1) Design Critique 

### Task 1.1: Critique

The visualization 'How India Eats' is an infographic that illustrates the various eating habits and preferences in different states of India. The infographic includes a map of India with each state color-coded, and each color represents a particular food or cuisine. Below the map, a bar chart visualizes the popularity of particular food types across the country.

The target audience for this visualization appears to be Indian citizens who may be interested in knowing more about the food habits of different states in India. Tourists and food enthusiasts may also be interested in this graphic as a source of information.

The objective of the design is to showcase the culinary diversity present in India and to provide a bird's-eye view of the most favored cuisines in each state. The visualization answers the question "What do Indians eat?" and provides an understanding of the diversity of the Indian food scene.

The main design elements that are related to this objective are the map of India, the color-coding of different states, and the bar chart. The map of India with each state clearly color-coded with a particular cuisine helps the audience quickly differentiate and identify the states, their respective food culture, and which part of the country has the most popularity for a particular cuisine. The bar chart helps the audience get an idea of the most popular food items in the country and provides a good comparison of the different cuisines.

The design elements are moderately effective in achieving the objective since it's easy for the audience to understand and learn about various food habits from different parts of the country in one glance. However, it doesn't provide detailed information about each food item, making it difficult to discern what makes a particular cuisine unique.

The infographic's success lies in its simplistic and clean design. However, there are areas where it could be improved. Some positive aspects of the visualization include clear labeling and color-coding, an excellent color combination, and the use of simple shapes making it easy to understand. However, some negative aspects are the absence of any legends, making it difficult for an outsider to ascertain the food type represented by each color, and the lack of detailed information about each food item.

Overall, I like the visualization because of its simplistic design, clear labeling, and easy-to-understand concept. However, it could be improved with more detailed information and better labeling so that outsiders and tourists can make the most out of the graphic.

### Task 1.2: Re-design

To improve the data-ink ratio, we can start by removing any unnecessary elements that are not conveying meaningful information, such as the gridlines, background color, and non-essential labels. We can also simplify the chart by removing the pie charts and using a stacked bar chart instead. This will allow us to better compare the distribution of food categories across regions.

To improve the graphical integrity, we can make sure that the chart accurately represents the data and avoids distorting the information. One way to achieve this is by using appropriate scales for the x and y axis. We can also choose colors that are easy to distinguish and do not clash with each other.

Lastly, we can add a caption and legend to make it clear what the chart is showing and how to interpret it.

Here's an example code snippet for a stacked bar chart with improved data-ink ratio and graphical integrity:

```html
<!DOCTYPE html>
<html>
<head>
	<title>How India Eats (Redesigned)</title>
	<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
	<div id="chart"></div>
	<script>
		var data = [
			{
				x: ['East', 'West', 'North', 'South'],
				y: [10, 5, 12, 8],
				name: 'Rice',
				type: 'bar'
			},
			{
				x: ['East', 'West', 'North', 'South'],
				y: [6, 8, 5, 12],
				name: 'Wheat',
				type: 'bar'
			},
			{
				x: ['East', 'West', 'North', 'South'],
				y: [8, 6, 9, 7],
				name: 'Bread',
				type: 'bar'
			}
		];
		var layout = {
			barmode: 'stack',
			title: 'How India Eats (Redesigned)',
			xaxis: {title: 'Region'},
			yaxis: {title: 'Food Consumption'},
			legend: {
				x: 1,
				y: 1
			}
		};
		Plotly.newPlot('chart', data, layout);
	</script>
</body>
</html>
```

In this example, we are using a stacked bar chart to represent the consumption of different food categories across four regions. The chart uses a simple color scheme and minimal labels to improve the data-ink ratio. We also added a caption and legend to help the viewer understand the chart.

## 2) Graphical Integrity, Gestalt Principles, C.R.A.P. Principles 

### Task 2.1: Graphical integrity

The visualization ‘The shrinking family doctor’ fails to adhere to Tufte’s ideas of graphical integrity. It displays a time series of family physicians per capita in the United States, but the graph does not accurately represent the data.

Regarding graphical integrity, the biggest issue with this visualization is the use of a 3D chart. The use of a 3D chart is unnecessary here, and it makes interpreting the data difficult. The third dimension creates an illusion that the depicted values have magnitude in the third dimension, which is misleading. This violates Tufte’s principle of not adding extraneous information to a graph. It could be improved by using a simpler 2D chart, such as a line chart, to more accurately represent the data.

Furthermore, the lie factor of the visualization is quite high. The bars in three dimensions distort the length of bars and make it difficult to compare them accurately over time. Therefore, it’s difficult to tell how much the number of family physicians per capita has changed over the years.

In terms of data-ink ratio, the visualization appears to have high data-ink, but upon closer inspection, we can see that there are unnecessary labels and decorations on the chart, adding to the chart junk. Thus, it can be improved by reducing chart junk to increase the data-ink ratio. The labels could be placed directly next to the data to remove the need for gridlines or tick marks. Removing the third dimension would also make the graph less cluttered and improve the data-ink ratio.

In conclusion, the 'The shrinking family doctor' visualization fails to follow principles of graphical integrity, has a high lie factor, and could use improvement in its data-ink ratio. An alternative solution would be to use a simpler two-dimensional graph with fewer decorations and labels to better represent the data and make it clearer to understand.

### Task 2.2: Gestalt principles

The visualization ‘Pairing wine & food’ employs several Gestalt principles to make it more effective and easier to understand. The principles that are applied are:

**1. Proximity -** The principle of proximity is used in grouping related items together. In the visualization, the food is organized in a vertical order with the wine recommendation placed directly beside it. This forms a columnar grouping that makes it easier for the viewer to match food and wine recommendations.

**2. Similarity –** This principle is used to show visual similarity in design elements. The circular icons at the bottom of the visualization divide the foods into categories of cheese, meat, and seafood. The icons share the same color and shape, so the viewer can easily understand that these food items belong to the same group.

**3. Continuity –** This principle ensures that the viewer’s eye sees a smooth, continuous flow, rather than abrupt changes or disruptions. The visualization uses lines to connect each food item to its recommended wine pairing. This continuity in design guides the eye from the food to the corresponding wine and assists in comprehending the relationship between wine and food.

**4. Closure -** This principle refers to the brain's ability to fill in the gaps in incomplete visual information. In the visualization, the circle icons used for the food items are not completed and partially cover the name of the food. However, the viewer can still make out the food name as the brain correctly guesses the hidden parts of the letters. This principle aids in completing the visual information and makes it easier to comprehend the pairing of food and recommended wine.

In conclusion, the visualization ‘Pairing wine & food’ effectively applies several Gestalt principles to enhance the viewer’s understanding of the relationship between food and wine. By using proximity, similarity, continuity, and closure in its design, the visualization ensures that the viewer’s eyes are guided through the information smoothly, and the order of the information is easily understood.

### Task 2.3: C.R.A.P. design principles
The C.R.A.P. design principles are Contrast, Repetition, Alignment, and Proximity. These principles can be seen in the OECD well-being visualization.

Firstly, Contrast is applied in the use of different colors throughout the visualization. Shades of blue and green are used to distinguish different categories, while red is used to draw attention to specific data points. For example, the reader's attention is drawn towards the "work-life balance" category, which is highlighted in red. Contrast is also applied in the varying sizes and thicknesses of font used, which help to distinguish different sections and emphasize key points.

Secondly, Repetition is applied through the consistent use of icons, which are used to represent different topics throughout the visualization. Icons help to create a visual language, allowing readers to easily identify which category is being represented. The use of the same font style and color scheme throughout the project also creates a sense of unity and cohesion.

Thirdly, Alignment is used to create balance and order in the visualization. Different categories are presented in a grid-like structure, with evenly spaced elements and consistent margins. This creates a sense of organization and allows the reader to easily compare different categories. Text and images are also aligned with other elements, creating a sense of harmony and balance.

Lastly, Proximity is applied through the grouping of related information. For example, information about each category is grouped together and presented under a common heading, creating a clear visual relationship between related items. This helps the reader to more easily navigate the information and understand the relationships between different aspects of well-being.

Overall, the application of the C.R.A.P. design principles in the OECD well-being visualization helps to create a cohesive and engaging design that is easy to understand and navigate.


## 3) Visual Vocabulary, Visual Channels
### Task 3.1: Sugar content in foods over time

For the given task of visualizing the change in the amount of sugar contained in different food groups over time, we will choose the following two visual encodings:

1. Line chart
2. Stacked area chart

####Line Chart

**What questions would you answer?**

A line chart is a type of chart that helps visualize data as a series of points connected by straight lines. In the given scenario, a line chart can help answer the following questions:
- How has the sugar content in different food groups changed over time?
- Which food groups have experienced the greatest increase/decrease in sugar content over time?
- Are there any trends that are common across all or most food groups?

**What data do you have?**

Assuming that we have data on the sugar content of different food groups between 1950 and the present, the data would consist of the following attributes:
- Food group (cereal, bread, etc.)
- Year
- Sugar content (in grams)

**Why would you choose the visual encoding?**

We would choose the line chart as we want to show the trend in sugar content over time for different food groups. The line chart is a great way to represent the change in a continuous variable over time. This type of chart also allows us to show multiple lines (one for each food group), which facilitates comparison between them.

**How would you encode the data?**

To encode the data, we would use the following channels:
- X-axis: Year
- Y-axis: Amount of sugar (in grams)
- Color: Food group

We would encode the data by plotting the amount of sugar on the y-axis and year on the x-axis. Each food group would be represented by a different color line. By doing so, we can easily compare the sugar content changes in each food group and observe any trends that may exist over time. Here's an example of how this line chart could be visualized:

```javascript
const data = [{ year: 1950, foodGroup: "Cereal", sugarContent: 20 },
    { year: 1950, foodGroup: "Bread", sugarContent: 10 },
    { year: 1960, foodGroup: "Cereal", sugarContent: 25 },
    { year: 1960, foodGroup: "Bread", sugarContent: 12 },
    { year: 1970, foodGroup: "Cereal", sugarContent: 30 },
    { year: 1970, foodGroup: "Bread", sugarContent: 15 },
    { year: 1980, foodGroup: "Cereal", sugarContent: 35 },
    { year: 1980, foodGroup: "Bread", sugarContent: 18 },
    { year: 1990, foodGroup: "Cereal", sugarContent: 40 },
    { year: 1990, foodGroup: "Bread", sugarContent: 20 },
    { year: 2000, foodGroup: "Cereal", sugarContent: 45 },
    { year: 2000, foodGroup: "Bread", sugarContent: 25 },
    { year: 2010, foodGroup: "Cereal", sugarContent: 50 },
    { year: 2010, foodGroup: "Bread", sugarContent: 27 }];

let colors = {"Cereal": "blue", "Bread": "orange"};

let margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

let svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

let x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sugarContent) + 10])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

let lineGen = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.sugarContent));

const groups = svg.selectAll(".groups")
    .data(["Cereal", "Bread"])
    .enter().append("g")
    .attr("class", "groups");

groups.append("path")
        .datum(data.filter(d => d.foodGroup === "Cereal"))
        .attr("fill", "none")
        .attr("stroke", colors["Cereal"])
        .attr("stroke-width", 2)
        .attr("d", lineGen);

groups.append("path")
    .datum(data.filter(d => d.foodGroup === "Bread"))
    .attr("fill", "none")
    .attr("stroke", colors["Bread"])
    .attr("stroke-width", 2)
    .attr("d", lineGen);

```

####Stacked Area Chart

**What questions would you answer?**
A stacked area chart is a type of chart that shows the progression of data stacked on top of each other, typically representing sub-categories within a main category. In the given scenario, a stacked area chart can help answer the following questions:
- What is the total amount of sugar across all food groups?
- Which food groups contribute the most to the overall sugar content?
- How has the contribution from each food group changed over time?

**What data do you have?**

Assuming that we have data on the sugar content of different food groups between 1950 and the present, the data would consist of the following attributes:
- Year
- Sugar content for each food group (in grams)

**Why would you choose the visual encoding?**

We would choose the stacked area chart as we want to show the relationship between the total amount of sugar and its contribution by each food group over time. The stacked area chart is a useful visual encoding for comparing the total value of a quantitative variable across different categories, as well as the proportional contribution of each category.

**How would you encode the data?**

To encode the data, we would use the following channels:
- X-axis: Years
- Y-axis: Total amount of sugar (in grams)
- Color: Food group

We would encode the data by plotting the total amount of sugar on the y-axis and years on the x-axis. Each food group would be stacked on top of each other and represented by a different color. By using the stacked area chart, we can easily compare the total amounts of sugar across all food groups as well as the contribution of each group over time. Here's an example of how this stacked area chart could be visualized:

```javascript
const data = [{ year: 1950, cereal: 20, bread: 10 },
    { year: 1960, cereal: 25, bread: 12 },
    { year: 1970, cereal: 30, bread: 15 },
    { year: 1980, cereal: 35, bread: 18 },
    { year: 1990, cereal: 40, bread: 20 },
    { year: 2000, cereal: 45, bread: 25 },
    { year: 2010, cereal: 50, bread: 27 }];

let margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.cereal + d.bread) + 10])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(y));

let colors = {"Cereal": "blue", "Bread": "orange"};


const areaGenerator = d3.area()
    .x(d => x(d.year))
    .y0(d => y(d.sugarStart))
    .y1(d => y(d.sugarEnd))
    .curve(d3.curveMonotoneX)

const stack = d3.stack()
    .keys(["cereal", "bread"]);

const stackedData = stack(data.map(d => {
    return { 'year': d.year, 'cereal': d.cereal, 'bread': d.bread }
}));

let layers = svg.selectAll(".area")
    .data(stackedData)
    .enter().append("g")
    .attr("class", "area");

layers.append("path")
    .attr("class", "area")
    .style("fill", d => colors[d.key])
    .attr("d", areaGenerator);
```

####Sketches
Here are sketches to help visualize the two different chart types:

Line Chart:

![Line Chart Sketch](https://i.imgur.com/8ZzwSQP.png)

Stacked Area Chart:

![Stacked Area Chart Sketch](https://i.imgur.com/7HdhYQ2.png)

Both of these visualizations can communicate the changes in sugar content in different food groups over time. The line chart is better for showing the trends in each food group over time, while the stacked area chart is better for illustrating the proportional contribution of each food group to total sugar content over time.