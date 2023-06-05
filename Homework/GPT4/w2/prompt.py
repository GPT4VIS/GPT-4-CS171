prompts = [
    # 1
"""
In the first part of this homework, you will create a simple webpage with HTML and CSS.
In the second part, you will do a design critique on an infographic visualization and include it into your website.
This homework assumes that you have read Chapter 3 (up to page 36) in *D3 - Interactive Data Visualization for the Web* (Second Edition!) by Scott Murray.

## 1. Web Development Basics: HTML & CSS (5 points)

### Data

The following table shows countries with an alarming hunger situation based on the Global Hunger Index (GHI) scores from 1990, 2000, and 2014. The Index ranks countries on a 100-point scale, with 0 being the best score (no hunger) and 100 being the worst.

Country | 1990 | 2000 | 2014
------------ | ------------- | ------------ | ------------
Central African Republic | 51.9	 | 51.4 | 46.9
Chad | 65 | 52 | 46.4
Haiti | 52.1 | 42.8	 | 37.3
Madagascar | 44.8 | 44.1 | 36.3
Sierra Leone | 58.8	 | 53.5 | 38.9
East Timor | — | — | 40.7
Zambia | 47 | 50.9 | 41.1

*The Global Hunger Index (GHI) is designed to comprehensively measure and track hunger globally and by country and region. Calculated each year by the International Food Policy Research Institute (IFPRI), the GHI highlights successes and failures in hunger reduction and provides insights into the drivers of hunger.* (IFPRI, 2015)

### Design and Implementation

Please finish these steps and output the final content of the index.html and style.css files.

a. **Create a new HTML file `index.html` and a new external CSS file.**

b. **Include your external stylesheet in your HTML file as well as the Bootstrap stylesheet and Javascript bundle**

c. **Start populating your `body` by laying out a grid for your page**

Read through the homework and come up with a reasonable grid for your page. Here's a [.png image](https://www.cs171.org/Homework_instructions/week-02/hw/assets/HW2%20Solution.png) of our implementation that might help you to decide on a suitable grid structure. You might have noticed that we kept this hw rather short and simple so that you can focus on key-concepts such as the bootstrap grid system. From now on, we always expect you to create and use a reasonable, accurate, and flawlessly implemented grid system for all your coding projects.

d. **Add a headline to the HTML `body`**

e. **Embed the given table (Global Hunger Index) in HTML**

Please be aware of the different html tags for rows with column names and rows with actual data (i.e., table header, table row). The bootstrap documentation might come in handy: [https://getbootstrap.com/docs/5.1/content/tables/](https://getbootstrap.com/docs/5.1/content/tables/)

f. **Center your elements**
In this homework, we want you to center both the heading and the table. Centering can be achieved through tweaking the parent-child relation between elements. If you have problems centering an element, you should always examine the dimensions and properties of the element you want to center as well as the ones of its parent. Making use of the bootstrap classes ```justify-content-center``` and ```self-align-center``` is one out of various ways to center an element. Here is an example that should be of help. Check it out - but make sure you have bootstrap embedded when you do!
```
<div class="container">
    <div class="row justify-content-center" style="background: green; height: 33.3vh; margin-top: 33.3vh">
        <div class="align-self-center" style="padding: 2vh; background: red">
            <button class="btn btn-dark">I am a button sitting in a red centered DIV</button>
        </div>
    </div>
</div>
```

g. **Add several custom styles to your external CSS file**
You can choose your design parameters freely (i.e., decisions about fonts, colors or scales are up to you) but make sure to include at least:
  - Custom font (e.g. Arial)
  - Custom style for the headline
  - Highlight column names in the table
  - Alternating row colors for the table

*Keeping your CSS rules separate means that you can use styles multiple times and your HTML documents remain clean and understandable.*

h. **Include the given JavaScript file `js/sorttable.js` at the bottom of the `body` element.**

Make sure to save the contents of this file as .js file! This script provides some additional functionality and makes your table sortable. Over the course of the semester, you will learn more about integrating interactive components with JavaScript but for this homework, it is fine if you include our given library. Example integration:

```
<script src="js/sorttable.js"></script>
```

i. **Add the class name `sortable` to the `table` Element**

If you have implemented everything correctly you should be able to sort the columns by clicking on the column names.

j. **Add a two-column layout below the table**

You should use the empty containers in the following exercise (*Infographic Design Critique*). Add the infographic to the left column and the answers to the questions in part *c* to the right column.

*Please use Bootstrap's [grid-system](https://getbootstrap.com/docs/5.1/layout/grid/), leveraging what you learned in this week's Lab. It is very flexible and will definitely be helpful for future projects.

*As a general rule, only use html `<table>` tags in an html layout to display data that can be well-represented in rows and columns (i.e., tabular data). Do not use it as a general layouting device!*

#### Extra Challenge - Bootstrap Carousel (optional, for fame and glory, not extra points)

If you've finished all the tasks above and want more programming practice, we recommend implementing a slideshow/carousel component. Examine the bootstrap documentation for some helpful sample code. As for the content of the carousel, we'd like you to include your examples for good or bad visualizations in the slideshow that you identified in last week's HW (Week 1). Make sure to use a proper headline for the slideshow.
""",

# 2
"""
In the first part of this homework, you will create a simple webpage with HTML and CSS.
In the second part, you will do a design critique on an infographic visualization and include it into your website.
This homework assumes that you have read Chapter 3 (up to page 36) in *D3 - Interactive Data Visualization for the Web* (Second Edition!) by Scott Murray.

This is the index.html and style.css files you create in the first part.
_#index.html#_
_#style.css#_

Now, let's do the second part:
## 2. Infographic Design Critique  (5 points)

a. **First read the Design Critique Overview in Canvas.**

b. **Then look at this visualization of the top 10 salaries at Google:**  [![Creative Commons License](cs171-hw2-infographic.png)](https://www.jobvine.co.za/what-does-it-take-to-get-a-job-at-google/)

c. **Extend your previously created** `index.html` **file and add the following:**

- A screenshot of the salary visualization in the left column.
- An analysis of the visualization with answers to the following questions in the right column:
  - Who is the audience?
  - What questions does it answer?
  - What is the data? be specific, including data types (N,O,Q).
  - For each data type, how is it visually encoded?
  - Do you consider this to be a 'good' visualization? Why or why not?

***Add this information to your two-column layout.*** *In the left column the screenshot and in the right column the answers to the questions above*

Now, please output the index.html and style.css files in text.
"""
]