prompts = [
    """
## 1) Visualizing Covid Data (10 points)

### Data

- **covid_data_20** is an official csv file from [HealthData.gov](https://data.cdc.gov/Case-Surveillance/United-States-COVID-19-Cases-and-Deaths-by-State-o/9mfq-cb36).
The structure of the file is slightly more sophisticated than the ones you've seen so far. This file contains Covid data from the year 2020 and has been cleaned up be the CS171 staff. There are 13675 rows in the dataset. For each of the 53* states and other jurisdictions in the dataset, there are n= 258 rows in the csv file where n is the number of days the dataset contains. In short, the experts that prepared the dataset basically concatenated the state-timelines.

* Initially, the dataset listed 'NY' and 'NYC' separately. The clean dataset now contains 516 'NY' rows as 'NYC' rows have been replaced by 'NY'.

- **census_usa** is another csv file that features the US state population totals. The data can be downloaded at the [United States Census Bureau Website](https://www.census.gov/data/datasets/time-series/demo/popest/2010s-state-total.html). All 52 states and other jurisdictions (i.e. the 50 states as well as the District of Columbia and Puerto Rico) and occupy exactly one row in this data set. In the columns, the total population for the respective states are listed. You have access to the population for all the years from 2010-2019.

### Template

THe template includes
- a responsive html grid for all the components,
- a brush component (brushable timeline), which allows users to filter the dataset by dates, and
- a responsive table which updates on brush, listing all the US states & summaries (click 'switch view' to see it).

While the data wrangling algorithms are very helpful, the table is ugly. You should implement a choropleth map to visualize it.
These are some files in the template:
_#mapVis.js#_
_#main.js#_
_#dataTable.js#_

### Implementation

Check out dataTable.js and examine closely how the former developer has structured the code. Since your map is basically just a nicer way to display the data, the ```class DataTable``` should at least provide some inspiration and orientation. In terms of the code architecture and the class structure, ```DataTable``` could even serve as blueprint for your ```class MapVis```. Make sure that MapVis contains a comprehensive ```constructor()``` method with all the parameters needed as well as the pipeline methods ```initVis()```, ```wrangleData()```, and ```updateVis()``` method.

1. **Define Constructor**

As mentioned in above, make sure to include all the data you need. In addition to the data included in ```class DataTable```, you will also need to account for geographical data. Also, make sure to start your pipeline in your constructor by calling the ```initVis()``` method.

After finish step1, output the content of mapVis.js
""",

# 1
"""
## 1) Visualizing Covid Data (10 points)

### Data

- **covid_data_20** is an official csv file from [HealthData.gov](https://data.cdc.gov/Case-Surveillance/United-States-COVID-19-Cases-and-Deaths-by-State-o/9mfq-cb36).
The structure of the file is slightly more sophisticated than the ones you've seen so far. This file contains Covid data from the year 2020 and has been cleaned up be the CS171 staff. There are 13675 rows in the dataset. For each of the 53* states and other jurisdictions in the dataset, there are n= 258 rows in the csv file where n is the number of days the dataset contains. In short, the experts that prepared the dataset basically concatenated the state-timelines.

* Initially, the dataset listed 'NY' and 'NYC' separately. The clean dataset now contains 516 'NY' rows as 'NYC' rows have been replaced by 'NY'.

- **census_usa** is another csv file that features the US state population totals. The data can be downloaded at the [United States Census Bureau Website](https://www.census.gov/data/datasets/time-series/demo/popest/2010s-state-total.html). All 52 states and other jurisdictions (i.e. the 50 states as well as the District of Columbia and Puerto Rico) and occupy exactly one row in this data set. In the columns, the total population for the respective states are listed. You have access to the population for all the years from 2010-2019.

### Template

These are some files you have already created:
_#main.js#_
_#mapVis.js#_
The only external libraries that you can use is D3v7.

### Implementation

Finish this step. Don't implement extra codes. Show me the code you added to mapVis.js.
2. **Define initVis() method**

    Use the knowledge and insights you've accumulated over the past weeks and this week's lab to set up a proper initVis() method. Include your margin conventions, title, tooltip, legend, and scales. 

	Hint: In order to draw a map, D3 basically just draws paths. The number of paths will not change with any kind of ```updateVis()``` function because you will not change the number of countries in your selection. Thus, you can draw your map already in ```initVis()``` and store the selection, i.e. all the states as a property. You can access that property, i.e. the selection, in other methods (e.g. ```updateVis()```) and can simply change and update the fill attribute.
""",

# 2
"""
## 1) Visualizing Covid Data (10 points)

### Data

- **states-albers-10m** is already projected -> you can just scale it to fit your browser window without any further projection

- **covid_data_20** is an official csv file from [HealthData.gov](https://data.cdc.gov/Case-Surveillance/United-States-COVID-19-Cases-and-Deaths-by-State-o/9mfq-cb36).
The structure of the file is slightly more sophisticated than the ones you've seen so far. This file contains Covid data from the year 2020 and has been cleaned up be the CS171 staff. There are 13675 rows in the dataset. For each of the 53* states and other jurisdictions in the dataset, there are n= 258 rows in the csv file where n is the number of days the dataset contains. In short, the experts that prepared the dataset basically concatenated the state-timelines.

* Initially, the dataset listed 'NY' and 'NYC' separately. The clean dataset now contains 516 'NY' rows as 'NYC' rows have been replaced by 'NY'.

- **census_usa** is another csv file that features the US state population totals. The data can be downloaded at the [United States Census Bureau Website](https://www.census.gov/data/datasets/time-series/demo/popest/2010s-state-total.html). All 52 states and other jurisdictions (i.e. the 50 states as well as the District of Columbia and Puerto Rico) and occupy exactly one row in this data set. In the columns, the total population for the respective states are listed. You have access to the population for all the years from 2010-2019.

### Template

These are some files you have already created:
_#mapVis.js#_
_#main.js#_
The only external libraries that you can use is D3v7.

### Implementation

Finish these steps. Plz tell me how to modify the codes.
3. **Set up the map**

    In this homework, we ask you to draw a map of the US using D3. In this week's lab, you've already created a world map using projections and a geo path generator to then draw the countries. When drawing the US state paths, there are a few geometries available that you can use. Check out this [github repo](https://github.com/topojson/us-atlas) and the documentation. Also, [this](https://github.com/d3/d3-geo) is the link to the d3.geo() documentation that might come in handy for this task.

    In short, there are two different routes you can choose: 1) you can use a geometry that has not been projected (e.g. 'states-10m.json'), and you do the projection yourself and play around with ```scale``` and ```transform()```, and 2) alternatively, you can use a map that has already been projected (e.g. 'states-albers-10m.json') to a specific viewpoint (976 on 610) to then just do some basic math to create the perfect fit for your website. You've seen the code for projections in the lab, here's the code for geometries that have been projected to exact viewpoints.

    ```javascript
    vis.viewpoint = {'width': 975, 'height': 610};
        vis.zoom = vis.width / vis.viewpoint.width;

    // adjust map position
    vis.map = vis.svg.append("g") // group will contain all state paths
        .attr("class", "states")
        .attr('transform', `scale(${vis.zoom} ${vis.zoom})`);
    ```

    You should now be able to draw all the states. Do so in initVis.
"""
]