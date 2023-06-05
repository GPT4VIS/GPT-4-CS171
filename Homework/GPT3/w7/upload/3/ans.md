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