prompts = [
# 0
"""
This homework assumes that you have read and programmed along with chapter 3 (p. 53-62) and chapter 5 in *D3 - Interactive Data Visualization for the Web*.

## 1) The World's Tallest Buildings

In this homework you will implement a horizontal bar chart with D3. Your bar chart will represent the ten tallest, fully-completed buildings in the world. Users will be able to click on a bar or label on the chart to get more information about a specific building.

*During development you can base your work on the following screenshot, but the design decisions (colors, fonts, ...) are principally up to you:*

### Data

We have provided a dataset with the world's tallest buildings. The CSV file (```data/buildings.csv```) includes a header row, which should help you to identify the different values, and a list of ten buildings. The content of the CSV file is:
```
building,country,city,height_m,height_ft,height_px,floors,completed,image
Burj Khalifa,United Arab Emirates,Dubai,828,2717,276,163,2010,1.jpg
International Commerce Centre,China,Hong Kong,484,1588,161,108,2010,6.jpg
KK100,China,Shenzhen,442,1449,147,100,2011,10.jpg
Makkah Royal Clock Tower,Saudi Arabia,Mecca,601,1972,200,120,2012,2.jpg
One World Trade Center,United States,New York City,541,1776,180,94,2014,3.jpg
Petronas Twin Towers,Malaysia,Kuala Lumpur,452,1483,151,88,1998,7.jpg
Shanghai World Financial Center,China,Shanghai,492,1614,164,101,2008,5.jpg
Taipei 101,Taiwan,Taipei,508,1667,169,101,2004,4.jpg
Willis Tower,United States,Chicago,442,1451,147,108,1974,9.jpg
Zifeng Tower,China,Nanjing,450,1476,150,66,2010,8.jpg

```

The ```img``` folder contains an image in portrait format for each building.

### Implementation

1. **Set up a new D3 v7 project and load the CSV file**
2. **Create a multi-column layout (HTML/CSS)**
    Split your page into multiple columns. The bar chart will be placed on the left side of the page while the right side will consist of a container that displays the dynamic content when the user selects a building in the bar chart. We strongly encourage you to use the *Bootstrap* [grid system](https://getbootstrap.com/docs/5.1/layout/grid/).
	
3. **Draw the SVG bar chart with D3**

	- Create a drawing area with at least 500 x 500px
	- Bind the loaded data to SVG rectangles (and place them correctly)
	- The bars should be left-aligned
	- Similar this week's lab, the different heights are given in pixels, so you don't have to use dynamic scales (data column: ```height_px```). That's something we'll cover in the next week.

4. **Add labels for** ***building names*** **and** ***height measures*** **to the bar chart**
	
	- The *building names* should be placed left of the bar chart and be right aligned (use the SVG text property ```text-anchor: end```). That means that you will have to shift your rectangles to the right, to avoid overlapping of text and rectangles. (Take a look at our example screenshot above to see how it should look.)
	- The labels for the *building heights* should be displayed inside the rectangles, at the right end of the bars.
	- Use proper font colors and sizes

	Note: If you are using the same HTML tags for different selections you have to work with *class attributes*. Here's an example:
	
	```javascript
	svg.selectAll("span.firstName")
		.data(data)
    	.enter()
    	.append("span")
    	.attr("class", "firstName")
		...
		
	svg.selectAll("span.age")
		.data(data)
    	.enter()
    	.append("span")
    	.attr("class", "age")
		...
	```
	
	We generally recommend that you use *class attributes*, and to add styling rules - which should affect the whole selection - to your external stylesheet.

5. **Sort the buildings in descending order by height**
	*Include your sorting algorithm directly after loading the data.*

Now, please output all the index.html, main.js, and style.css files in text.
"""
,

# 1
"""
This homework assumes that you have read and programmed along with chapter 3 (p. 53-62) and chapter 5 in *D3 - Interactive Data Visualization for the Web*.

## 1) The World's Tallest Buildings (10 points)

In this homework you will implement a horizontal bar chart with D3. Your bar chart will represent the ten tallest, fully-completed buildings in the world. Users will be able to click on a bar or label on the chart to get more information about a specific building.

*During development you can base your work on the following screenshot, but the design decisions (colors, fonts, ...) are principally up to you:*

### Data

We have provided a dataset with the world's tallest buildings. The CSV file (```data/buildings.csv```) includes a header row, which should help you to identify the different values, and a list of ten buildings. The content of the CSV file is:
```
building,country,city,height_m,height_ft,height_px,floors,completed,image
Burj Khalifa,United Arab Emirates,Dubai,828,2717,276,163,2010,1.jpg
International Commerce Centre,China,Hong Kong,484,1588,161,108,2010,6.jpg
KK100,China,Shenzhen,442,1449,147,100,2011,10.jpg
Makkah Royal Clock Tower,Saudi Arabia,Mecca,601,1972,200,120,2012,2.jpg
One World Trade Center,United States,New York City,541,1776,180,94,2014,3.jpg
Petronas Twin Towers,Malaysia,Kuala Lumpur,452,1483,151,88,1998,7.jpg
Shanghai World Financial Center,China,Shanghai,492,1614,164,101,2008,5.jpg
Taipei 101,Taiwan,Taipei,508,1667,169,101,2004,4.jpg
Willis Tower,United States,Chicago,442,1451,147,108,1974,9.jpg
Zifeng Tower,China,Nanjing,450,1476,150,66,2010,8.jpg

```

The ```img``` folder contains an image in portrait format for each building.

These are the index.html, main.js, and style.css you have already created:
_#index.html#_
_#main.js#_
_#style.css#_

### Implementation
Finish these steps and output the code files that you have updated.

6. **Make it interactive**
	*After selecting a specific building by clicking on the SVG labels or bars, more detailed information should be presented to the user. That information should live in a separate column. Take a look at our solution screenshot to get some inspiration.*

	Just like in the lab, you will have to use D3V7 *event listeners* to solve this task. However, in the homework, you're supposed to do more than just firing a console.log. We recommend writing a separate function that you call to take care of the task.

7. **Use good programming practices to structure your code**

	This is a good point to take a couple of minutes to think about your code. Is everything clear, well structured, and documented? Oftentimes moving a block of code into its own separate function goes a long way toward improving readability! Your code should be concise and easy to read. That not only reduces debugging time, but will allow you to understand your code when you come back to it in a couple of months.  Be kind to your future self!
	
	* Identify code that can easily be re-factored into separate functions. E.g. click event listeners for the rectangles and text currently behave the same way. That means you should probably have a single function that is called when clicking either on a rectangle or a building name.
	* Document all your functions, and make note of important points in the code. However, don't go overboard by documenting every line of code.
	* Use speaking variable names. Avoid using names like ```let temp_d``` or ```.div3```. Rather use names like ```let sorted_buildings``` or ```.barchart```. 


""",

#2
"""
This homework assumes that you have read and programmed along with chapter 3 (p. 53-62) and chapter 5 in *D3 - Interactive Data Visualization for the Web*.

## 1) The World's Tallest Buildings (10 points)

In this homework you will implement a horizontal bar chart with D3. Your bar chart will represent the ten tallest, fully-completed buildings in the world. Users will be able to click on a bar or label on the chart to get more information about a specific building.

*During development you can base your work on the following screenshot, but the design decisions (colors, fonts, ...) are principally up to you:*

### Data

We have provided a dataset with the world's tallest buildings. The CSV file (```data/buildings.csv```) includes a header row, which should help you to identify the different values, and a list of ten buildings. The content of the CSV file is:
```
building,country,city,height_m,height_ft,height_px,floors,completed,image
Burj Khalifa,United Arab Emirates,Dubai,828,2717,276,163,2010,1.jpg
International Commerce Centre,China,Hong Kong,484,1588,161,108,2010,6.jpg
KK100,China,Shenzhen,442,1449,147,100,2011,10.jpg
Makkah Royal Clock Tower,Saudi Arabia,Mecca,601,1972,200,120,2012,2.jpg
One World Trade Center,United States,New York City,541,1776,180,94,2014,3.jpg
Petronas Twin Towers,Malaysia,Kuala Lumpur,452,1483,151,88,1998,7.jpg
Shanghai World Financial Center,China,Shanghai,492,1614,164,101,2008,5.jpg
Taipei 101,Taiwan,Taipei,508,1667,169,101,2004,4.jpg
Willis Tower,United States,Chicago,442,1451,147,108,1974,9.jpg
Zifeng Tower,China,Nanjing,450,1476,150,66,2010,8.jpg

```

The ```img``` folder contains an image in portrait format for each building.

These are the index.html, main.js, and style.css you have already created:
_#index.html#_
_#main.js#_
_#style.css#_

### Implementation
Finish these steps and output the code files that you have updated.

8. **Use CSS to design your page**

	*Take care of an adequate spacing between your elements.*
	
	> We have used the *Google Font "Roboto"* in our example. If you are interested in using different fonts, this page might be helpful: [https://www.google.com/fonts](https://www.google.com/fonts)
	
9. **Check for bad practices**
    * Congratulations, you are done with the main task. Before moving on, however, make sure to skim your code for bad practices. This most and foremost means that your code is readable and includes comments where necessary. For your HTML code, we don't wanna see <br> tags anywhere in your code to space things out. Instead, make proper use of classes and ids. In your java script code, try using a forEach loop where possible and get comfortable with arrow functions.

"""
]