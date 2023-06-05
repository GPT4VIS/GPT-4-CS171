prompts = [ 
# 0    
"""
In this assignment, you’ll use HTML, CSS and JavaScript to create a small dashboard for a local pizza delivery company. It should help the company to get meaningful insights into their collected data and to evaluate their performance. We provide a template that will serve as your point of departure code.

This homework assumes that you have read and programmed along with chapter 3 (up to page 53) in *D3 - Interactive Data Visualization for the Web* (Second Edition) by Scott Murray.

### Template
We are providing a small template (*Bootstrap* already included) for this homework.
Your only job is to extend the `main.js` and `index.html` files:
_#main.js#_
_#index.html#_

### Data

We have included two datasets from *PizzaWorld* in the framework. 
One table has 1198 rows with pizza deliveries and the other table has 200 rows with corresponding customer feedback.

The data (arrays with JSON objects) are already stored in these two global variables:

- ```deliveryData```
- ```feedbackData```

*The variables are accesible in the JS file ```main.js```*

*To get started, write the variables to the web console and inspect them.*

#### Delivery Data
- ```delivery_id```
- ```date```
- ```area``` (Boston | Cambridge | Somerville)
- ```price``` (in USD)
- ```count``` (number of delivered pizzas)
- ```driver```
- ```delivery_time``` (minutes)
- ```temperature```
- ```drinks_ordered``` (true | false)
- ```order_type``` (web | phone)

#### Feedback Data
- ```delivery_id``` (matches the deliveries)
- ```punctuality``` (medium | low | high)
- ```quality ``` (medium | low | high)
- ```wrong_pizza ``` (true | false)

### Implementation

Open ```main.js```. You'll find an empty function ```createVisualization()``` that you'll populate in order to update the DOM dynamically.
    
Start by extracting the following numbers from the provided data and append them with meaningful labels to the HTML document:

* Number of pizza deliveries
* Number of all delivered pizzas (*count*)
* Average delivery time
* Total sales in USD
* Number of all feedback entries
* Number of feedback entries per quality category: *low*, *medium*, *high*

You should do all of that (extracting numbers and adding labels to HTML) directly in JavaScript. Update the DOM dynamically with JavaScript!

*Make sure you test your code after you have implemented this part! Once your code is working, consider your code structure and code design:*
- *If your code is already longer than a couple of lines, extract it into a separate function and call that function within createVisualization().*
- *Think about calculating the above numbers at the same time (e.g., inside a single loop), if possible. That will make the code shorter and easier to read, as well as faster.*
- *Make sure you use consistent spacing, layout, self-explanatory variable names, and code comments! If you do this as you progress in your coding project, this will save you a lot of time later!*

**Hint:** Javascript has a number of native methods and properties that make interacting with HTML elements easy. For instance

* ```document.getElementById('some_id')``` returns an element by its ID. You can then manipulate that element.
* Once you've selected an element, you can get and set its text through the ```innerText``` property. So if you'd like to assign the current value to a variable do something like ```let elemText = document.getElementById('some_id').innerText``` and if you want to change that value do ```document.getElementById('some_id').innerText = 'New Value'```.
* To add or retrieve the HTML within an element, use the ```innerHTML``` property (e.g. ```document.getElementById('some_id').innerHTML = '<h1>Title</h1>'```.)
* The ```value``` property get and sets the value of ```input```, ```select```, and ```button``` elements.

Now please output the main.js and inex.html file in text.
""",

# 1
"""
In this assignment, you’ll use HTML, CSS and JavaScript to create a small dashboard for a local pizza delivery company. It should help the company to get meaningful insights into their collected data and to evaluate their performance. We provide a template that will serve as your point of departure code.

This homework assumes that you have read and programmed along with chapter 3 (up to page 53) in *D3 - Interactive Data Visualization for the Web* (Second Edition) by Scott Murray.

### Template
We are providing a small template (*Bootstrap* already included) for this homework.
Your only job is to extend the `main.js` and `index.html` files:
_#main.js#_
_#index.html#_

### Data

We have included two datasets from *PizzaWorld* in the framework. 
One table has 1198 rows with pizza deliveries and the other table has 200 rows with corresponding customer feedback.

The data (arrays with JSON objects) are already stored in these two global variables:

- ```deliveryData```
- ```feedbackData```

*The variables are accesible in the JS file ```main.js```*

*To get started, write the variables to the web console and inspect them.*

#### Delivery Data
- ```delivery_id```
- ```date```
- ```area``` (Boston | Cambridge | Somerville)
- ```price``` (in USD)
- ```count``` (number of delivered pizzas)
- ```driver```
- ```delivery_time``` (minutes)
- ```temperature```
- ```drinks_ordered``` (true | false)
- ```order_type``` (web | phone)

#### Feedback Data
- ```delivery_id``` (matches the deliveries)
- ```punctuality``` (medium | low | high)
- ```quality ``` (medium | low | high)
- ```wrong_pizza ``` (true | false)

### Implementation

So far, you should have done all your DOM manipulation inside of ```createVisualization()```. If you call *renderBarChart()* our script will automatically group (and count) the deliveries per day. Subsequently a bar chart will be added to the container: ```#chart-area```.

Requirements:
- You need a div-container with the id ```#chart-area``` in your HTML document
- As a **function parameter**, you have to include a JSON array with deliveries (each delivery is an object and must include at least the property: ```date```). Try to call *renderBarChart()* (inside ```createVisualization```) with the argument ```deliveryData```.
You should now see a basic bar chart on your page.

Now please output the main.js and inex.html file in text.
""",

# 2
"""
In this assignment, you’ll use HTML, CSS and JavaScript to create a small dashboard for a local pizza delivery company. It should help the company to get meaningful insights into their collected data and to evaluate their performance. We provide a template that will serve as your point of departure code.

This homework assumes that you have read and programmed along with chapter 3 (up to page 53) in *D3 - Interactive Data Visualization for the Web* (Second Edition) by Scott Murray.

### Template
We are providing a small template (*Bootstrap* already included) for this homework.
Your only job is to extend the `main.js` and `index.html` files:
_#main.js#_
_#index.html#_

### Data

We have included two datasets from *PizzaWorld* in the framework. 
One table has 1198 rows with pizza deliveries and the other table has 200 rows with corresponding customer feedback.

The data (arrays with JSON objects) are already stored in these two global variables:

- ```deliveryData```
- ```feedbackData```

*The variables are accesible in the JS file ```main.js```*

*To get started, write the variables to the web console and inspect them.*

#### Delivery Data
- ```delivery_id```
- ```date```
- ```area``` (Boston | Cambridge | Somerville)
- ```price``` (in USD)
- ```count``` (number of delivered pizzas)
- ```driver```
- ```delivery_time``` (minutes)
- ```temperature```
- ```drinks_ordered``` (true | false)
- ```order_type``` (web | phone)

#### Feedback Data
- ```delivery_id``` (matches the deliveries)
- ```punctuality``` (medium | low | high)
- ```quality ``` (medium | low | high)
- ```wrong_pizza ``` (true | false)

### Implementation

**Filter the data before drawing the bar chart**
In the next task, you should filter the ```deliveryData``` array depending on the selected options, before calling *renderBarChart()*.

a. Add two **select-boxes** to your HTML document. The user should be able to select:
	- ```area``` (*All*, *Boston*, *Cambridge* or *Somerville*)
	- ```order type``` (*All*, *Web* or *Phone*).

	Make sure to set the callback function of the select boxes to the function that updates and creates our visualization!

b. If the user selects an option, filter the variable ```deliveryData``` accordingly and then call *renderBarChart()* again. Every time you call this function, it will analyze all changes in your array and update the chart with D3.

    It is good practice to do a sanity check on the result you get after filtering or processing data. Take a look at the original data, do the numbers make sense? Are there missing values? This is especially important when dealing with real-world data that has not been cleaned and prepared for easy use in a homework ;-)

Now please output where to update index.html and main.js
""",

# 3
"""
In this assignment, you’ll use HTML, CSS and JavaScript to create a small dashboard for a local pizza delivery company. It should help the company to get meaningful insights into their collected data and to evaluate their performance. We provide a template that will serve as your point of departure code.

This homework assumes that you have read and programmed along with chapter 3 (up to page 53) in *D3 - Interactive Data Visualization for the Web* (Second Edition) by Scott Murray.

### Template
We are providing a small template (*Bootstrap* already included) for this homework.
Your only job is to extend the `main.js` and `index.html` files:
_#main.js#_
_#index.html#_

### Data

We have included two datasets from *PizzaWorld* in the framework. 
One table has 1198 rows with pizza deliveries and the other table has 200 rows with corresponding customer feedback.

The data (arrays with JSON objects) are already stored in these two global variables:

- ```deliveryData```
- ```feedbackData```

*The variables are accesible in the JS file ```main.js```*

*To get started, write the variables to the web console and inspect them.*

#### Delivery Data
- ```delivery_id```
- ```date```
- ```area``` (Boston | Cambridge | Somerville)
- ```price``` (in USD)
- ```count``` (number of delivered pizzas)
- ```driver```
- ```delivery_time``` (minutes)
- ```temperature```
- ```drinks_ordered``` (true | false)
- ```order_type``` (web | phone)

#### Feedback Data
- ```delivery_id``` (matches the deliveries)
- ```punctuality``` (medium | low | high)
- ```quality ``` (medium | low | high)
- ```wrong_pizza ``` (true | false)

### Implementation
Finish the following steps and print the content of main.js

**Global data filtering**
In the previous step you have implemented a function which reacts to the user input (change of a select-box value) and updates the chart immediately.

Additionally, these filter options should also affect the displayed dataset summary that you implemented earlier.

→ If the user filters the data by a specific ```area``` or ```order type``` you should **update the bar chart and the display of the summary data** from step (2).

*Hint: The data are stored in two separate variables. Make sure your filtering algorithm influences customer feedback as well as order data.*

""",

# 4
"""
In this assignment, you’ll use HTML, CSS and JavaScript to create a small dashboard for a local pizza delivery company. It should help the company to get meaningful insights into their collected data and to evaluate their performance. We provide a template that will serve as your point of departure code.

This homework assumes that you have read and programmed along with chapter 3 (up to page 53) in *D3 - Interactive Data Visualization for the Web* (Second Edition) by Scott Murray.

### Template
We are providing a small template (*Bootstrap* already included) for this homework.
Your only job is to extend the `style.css` and `index.html` files:
_#style.css#_
_#index.html#_

### Implementation

**Style your webpage using CSS**
We already provided a simple css file in our template. Adjust either the CSS or the html elements you dynamically generate to create a visually pleasing and easy to read webpage.

Lastly, make sure to include a tooltip ```div``` in your index.html 
```
<div id="tooltip" class="hidden">
    <p><strong>Deliveries</strong></p>
    <p><span id="value"></span></p>
</div>
``` 
Check out  ```barchart.js``` and  ```style.css``` to understand why ```#tooltip``` is already working.

Now please output the style.css and index.html file in text.
"""
]