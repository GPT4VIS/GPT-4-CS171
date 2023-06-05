prompts = [
    ## 0
"""
This homework requires that you have read and programmed along with chapters 7 and 8 in *D3 - Interactive Data Visualization for the Web*.

## 1) Za'atari Refugee Camp (10 points)

Za’atari is a refugee camp in Jordan that opened in 2011 to host people fleeing from the Syrian civil war. With around 80,000 refugees it is one of the largest UN-supported camps and over the past few years it transformed from a tent camp to a real city with water and sewage systems, markets, coffee shops etc.

*In this homework you will create two charts to present data from Za'atari in a meaningful way.*

### Data
#### Population

As part of this homework assignment we provide a CSV file with population statistics between January 2013 and November 2015. The statistics are based on active registrations in the UNHCR database. The data is placed on "data/zaatari-refugee-camp-population.csv". The header of the csv file is "date,population". The first line of the data is "2013-01-14,56666"

[zaatari-refugee-camp-population.csv](https://www.cs171.org/Homework_instructions/week-05/hw/assets/zaatari-refugee-camp-population.csv)

### Implementation
Finish the following steps.

1. **Set up a new D3 project with D3.v7 and create a two-column layout in your HTML file**
During the course of this homework you will add an area chart to the left column and a bar chart to the right column.

2. **Load the CSV file and prepare the data for the area chart**
	
	The *dates* are loaded as string values. Similar to numeric values (e.g. ```d.price = +d.price```) you have to convert these values. You will need *Date Objects* to create flexible *time scales* later.
	
	*This website should help you to convert the data into the right format: [https://github.com/d3/d3-time-format/blob/master/README.md](https://github.com/d3/d3-time-format/blob/master/README.md). Make sure to test your results before continuing.*

3. **From now on, your charts should implement the D3 margin convention**

	Create ```margin```, ```height```, and ```width``` variables and append a new SVG drawing space for the area chart to the HTML document via JavaScript.

4. **Area chart: Before you create the actual area chart, create linear scales for the x- and y-axes**

	Use the ***D3 time scale function*** for the x-axis.  It is an extension of *d3.scaleLinear()* that uses JS date objects as the domain representation.

	*Read more about D3's time scales: [https://github.com/d3/d3-scale/blob/master/README.md#time-scales](https://github.com/d3/d3-scale/blob/master/README.md#time-scales). You can (and should) always google for additional examples, if you are still unclear on the usage of D3 elements we require you to include.*

5. **Area chart: Map the population data to the area (using SVG path)**

	*Compared to a simple line chart you should fill the whole area between the data points and the x-axis.*
	
	To create an area chart, follow the steps below:
	
	a. Define a function that generates the area:
	
	See [https://github.com/d3/d3-shape/blob/master/README.md#areas](https://github.com/d3/d3-shape/blob/master/README.md#areas) (```d3.area()```) for details.
	
	b. Draw the area (using an SVG path element)
	
	```javascript
	let path = svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);
	```

	c. Change the style with CSS 
	
	If any of these steps are unclear, study some D3 area chart examples online. Make sure you understand the code before you implement it yourself! 
	
	d. Bonus (optional): Render the actual boundary (upper line of the area chart) as line, with different visual properties.

6. **Area chart: Append the x- and y-axes and add a chart title**

	From now on, we expect that you will always label your charts, display meaningful axes, and provide a legend if necessary. Also, make sure your axes start at appropriate values.
	In data visualization we aim to create meaningful, easy-to-understand visualizations to provide insight into the data. Missing labels or axes are often a main cause for misunderstanding data!
	
	* Format the labeling of the x-axis to display the month and year in text format (e.g. April 2013). 
	* Make sure that the labels don't overlap each other, by rotating the text labels of the x-axis. 

Now, print the content of index.html, main.js, style.css files.
""",

## 1
"""
This homework requires that you have read and programmed along with chapters 7 and 8 in *D3 - Interactive Data Visualization for the Web*.

## 1) Za'atari Refugee Camp (10 points)

Za’atari is a refugee camp in Jordan that opened in 2011 to host people fleeing from the Syrian civil war. With around 80,000 refugees it is one of the largest UN-supported camps and over the past few years it transformed from a tent camp to a real city with water and sewage systems, markets, coffee shops etc.

*In this homework you will create two charts to present data from Za'atari in a meaningful way.*
This is the index.html, main.js, and style.css that you have already created:
_#index.html#_
_#main.js#_
_#style.css#_

### Data
#### Population

As part of this homework assignment we provide a CSV file with population statistics between January 2013 and November 2015. The statistics are based on active registrations in the UNHCR database. The data is placed on "data/zaatari-refugee-camp-population.csv". The header of the csv file is "date,population". The first line of the data is "2013-01-14,56666"

[zaatari-refugee-camp-population.csv](https://www.cs171.org/Homework_instructions/week-05/hw/assets/zaatari-refugee-camp-population.csv)

### Implementation
Finish the following steps.

**Create dynamic tooltips for your area chart**

*There are many different ways to include tooltips. Follow the steps below for one approach, but feel free to experiment with others*
	
Make sure the tooltip shows the camp's population for the current mouse position, as shown in the above animation.
	
Note: This step is relatively complex, compared to the earlier steps. Add individual elements step-by-step and make sure they are working before adding on more elements. Debugging tip: during development, add color to your elements through css styles to ensure they are being rendered properly. 

1. Create a group for all the tooltip elements and hide it by setting the style attribute 'display' to 'none' (Skip this step during development to make sure you are rendering things correctly). Save this element as a variable, which you will use to append text elemenet and later update the tooltip position. Give it a class name.
2. Append a vertical tooltip line to the leftmost position of the group (x=0) and that spans the full height of the svg.  Don't forget to assign the 'stroke' attr for it to render properly!
3. Append an empty SVG text element for the tooltip population value. place it 10px away from the top left corner of the group, and don't forget to give it a class or id! 
4. Append an empty SVG text element for the tooltip date value. Position this text just below the population text holder. Give it a unique class or id name. 
5. Append a rectangle over the whole chart to capture 'mouse events'. Add listeners to 'mouseover', 'mouseout', and 'mousemove' events. On mouseover, set the display style of the tooltip group to 'null, on mouseout set it to 'none', and on mousemove, trigger a new 'mousemove' function that will handle the positioning of the tooltip. 

Now, output the content of the files updated in text.
""",

# 2
"""
This homework requires that you have read and programmed along with chapters 7 and 8 in *D3 - Interactive Data Visualization for the Web*.

## 1) Za'atari Refugee Camp (10 points)

Za’atari is a refugee camp in Jordan that opened in 2011 to host people fleeing from the Syrian civil war. With around 80,000 refugees it is one of the largest UN-supported camps and over the past few years it transformed from a tent camp to a real city with water and sewage systems, markets, coffee shops etc.

*In this homework you will create two charts to present data from Za'atari in a meaningful way.*
This is the index.html, main.js, and style.css that you have already created:
_#index.html#_
_#main.js#_
_#style.css#_

### Data
#### Population

As part of this homework assignment we provide a CSV file with population statistics between January 2013 and November 2015. The statistics are based on active registrations in the UNHCR database. The data is placed on "data/zaatari-refugee-camp-population.csv". The header of the csv file is "date,population". The first line of the data is "2013-01-14,56666"

[zaatari-refugee-camp-population.csv](https://www.cs171.org/Homework_instructions/week-05/hw/assets/zaatari-refugee-camp-population.csv)

### Implementation
Finish the following steps.

7. **Create dynamic tooltips for your area chart**
* ```d3.bisector```is a function that finds the closest index in an array for a given value, specifying an accessor function.  You can read more about it here: [https://github.com/d3/d3-array#bisector](https://github.com/d3/d3-array#bisector)

* For this homework, you will need to define a bisector that returns the date attribute, such as the example below. This can then be applied as bisectDate(array, d), returning the index of  the array which contains the closest value to 'd'. 

  ```javascript 
  let bisectDate = d3.bisector(d=>d.date).left;
  ```
 
* Write a mousemouve function with the following signature: 

      ```javascript
      function mousemove(event){
          //code goes here
      }
      ```

* Inside this function implement the following steps: 

		1. Use d3.pointer(event)[0] to get the x position of the mouse pointer. 
    2. Use .invert on the xscale to find the equivalent date value for the x position of the mouse pointer. 
    3. Call the previsously declared bisector function to get the index of the closest date in the original data array. 
		4. Use the index from the previous step to grab the data element at that location.  
    5. Shift the whole tooltip group on the x-axis to the position of the mouse. 
    6. Update the tooltip text properties with the date and population values 
	
Now, output the content of the files you have updated in text.
""",

#3
"""
This homework requires that you have read and programmed along with chapters 7 and 8 in *D3 - Interactive Data Visualization for the Web*.

## 1) Za'atari Refugee Camp (10 points)

Za’atari is a refugee camp in Jordan that opened in 2011 to host people fleeing from the Syrian civil war. With around 80,000 refugees it is one of the largest UN-supported camps and over the past few years it transformed from a tent camp to a real city with water and sewage systems, markets, coffee shops etc.

*In this homework you will create two charts to present data from Za'atari in a meaningful way.*
This is the index.html, main.js, and style.css that you have already created:
_#index.html#_
_#main.js#_
_#style.css#_

### Data
#### Type of Shelter

The REACH initiative and Unicef evaluated the type of shelters in the Za'atari refugee camp. Although, the camp is gradually transforming into a real city, a lot of people still have to live in tents:

> The vast majority of households (79.68%) were recorded as living in caravans. That number was followed by 10.81% of households recorded as living in a combination of tents and caravans, while 9.51% were observed to be living in tents only.

### Implementation
Finish the following steps.
8. **Create a compound JS data structure to store information about the shelter types** 

	Store the information you have about the different shelter types in your own data structure. (As a reminder, 79.68% of households were recorded as living in caravans. 10.81% of households live in a combination of tents and caravans, while 9.51% live in tents only.)

	* Store the *type of shelter* and *percentage values*.
	* You will have to use your data structure for your bar chart afterwards, so make sure that it is as simple and efficient as possible. The actual implementation is up to you.
    
9. **Create a vertical bar chart for the camp's three shelter types**

	* Append a new SVG drawing area for the bar chart (using D3 margin conventions) to the right column of your webpage.
	* Map the data from your new dataset to SVG rectangles to create a vertical bar chart (refer to the screenshot in Section Implementation.1 for how it should look). The y-axis represents the percentage of people living in one of the three shelter types.
	* Usa a linear scale for the y axis. 
	* For the x dimension you may choose to use either an ordinal scale or no explicit D3 scale function, as there are only 3 categories. (Note, however, that in one of the next steps you will have to add labels for each bar. Your scale implementation here affect the way you add labels later.)
	* Add a chart title.

Now, output the content of the files you have updated in text.
""",


#4
"""
This homework requires that you have read and programmed along with chapters 7 and 8 in *D3 - Interactive Data Visualization for the Web*.

## 1) Za'atari Refugee Camp (10 points)

Za’atari is a refugee camp in Jordan that opened in 2011 to host people fleeing from the Syrian civil war. With around 80,000 refugees it is one of the largest UN-supported camps and over the past few years it transformed from a tent camp to a real city with water and sewage systems, markets, coffee shops etc.

*In this homework you will create two charts to present data from Za'atari in a meaningful way.*
This is the index.html and main.js that you have already created:
_#index.html#_
_#main.js#_

### Data
#### Type of Shelter

The REACH initiative and Unicef evaluated the type of shelters in the Za'atari refugee camp. Although, the camp is gradually transforming into a real city, a lot of people still have to live in tents:

> The vast majority of households (79.68%) were recorded as living in caravans. That number was followed by 10.81% of households recorded as living in a combination of tents and caravans, while 9.51% were observed to be living in tents only.

### Implementation
Finish the following steps.

10. **Bar chart: Draw x- and y-axes**

	*The ticks of the y-axis should be formatted as percentages.*
	
	[https://github.com/d3/d3-axis/blob/master/README.md](https://github.com/d3/d3-axis/blob/master/README.md)

11. **Bar chart: Append labels at the top of each bar to indicate the actual percentages**

	* Each bar should have a label to indicate the percentage, directly above the bar.
	* Each bar should also have a label with the name of the shelter type. This can be done either by using a categorical x axis, or by manually adding text labels.
    
Now, output the updated part, as well as their line numbers, of each file.
""",

# 5
"""
This homework requires that you have read and programmed along with chapters 7 and 8 in *D3 - Interactive Data Visualization for the Web*.

## 1) Za'atari Refugee Camp (10 points)

Za’atari is a refugee camp in Jordan that opened in 2011 to host people fleeing from the Syrian civil war. With around 80,000 refugees it is one of the largest UN-supported camps and over the past few years it transformed from a tent camp to a real city with water and sewage systems, markets, coffee shops etc.

*In this homework you will create two charts to present data from Za'atari in a meaningful way.*
This is the index.html, main.js, and style.css that you have already created:
_#index.html#_
_#style.css#_
_#main.js#_


### Implementation
Finish the following steps.

13. **Use CSS to style the webpage**
	
	*Spacing between charts, font size, color scheme, ...*
	
	This is your space to be creative! Please use at least 3 CSS styles, and keep the design guidelines you have learned so far in lecture in mind. But you don't need to go overboard. (Required are 3 different CSS styles)

Now, output the content of style.css
"""
]