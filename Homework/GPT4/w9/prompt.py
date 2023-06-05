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
_#index.html#_
_#dataTable.js#_
The only external libraries that you can use is D3v7. Note that you cannot use jQuery or $ in the implementation.

### Implementation

Check out dataTable.js and examine closely how the former developer has structured the code. Since your map is basically just a nicer way to display the data, the ```class DataTable``` should at least provide some inspiration and orientation. In terms of the code architecture and the class structure, ```DataTable``` could even serve as blueprint for your ```class MapVis```. Make sure that MapVis contains a comprehensive ```constructor()``` method with all the parameters needed as well as the pipeline methods ```initVis()```, ```wrangleData()```, and ```updateVis()``` method.

Show me how to finish step2. Only use d3, no jQuery ($).

2. **Define initVis() method**

    Use the knowledge and insights you've accumulated over the past weeks and this week's lab to set up a proper initVis() method. Include your margin conventions, title, tooltip, legend, and scales. Note that you cannot use jQuery or $ in the implementation.

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
_#index.html#_
_#dataTable.js#_
The only external libraries that you can use is D3v7.

### Implementation

Check out dataTable.js and examine closely how the former developer has structured the code. Since your map is basically just a nicer way to display the data, the ```class DataTable``` should at least provide some inspiration and orientation. In terms of the code architecture and the class structure, ```DataTable``` could even serve as blueprint for your ```class MapVis```. Make sure that MapVis contains a comprehensive ```constructor()``` method with all the parameters needed as well as the pipeline methods ```initVis()```, ```wrangleData()```, and ```updateVis()``` method.

Finish these steps. Plz tell me how to modify mapVis.js and index.html

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
""",

# 3
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
_#index.html#_
_#dataTable.js#_
The only external libraries that you can use is D3v7.

### Implementation

Check out dataTable.js and examine closely how the former developer has structured the code. Since your map is basically just a nicer way to display the data, the ```class DataTable``` should at least provide some inspiration and orientation. In terms of the code architecture and the class structure, ```DataTable``` could even serve as blueprint for your ```class MapVis```. Make sure that MapVis contains a comprehensive ```constructor()``` method with all the parameters needed as well as the pipeline methods ```initVis()```, ```wrangleData()```, and ```updateVis()``` method.

Finish these steps. Plz tell me how to modify mapVis.js
4. **Define wrangleData() method**  

    Check out how ```wrangleData()``` was implemented for ```class DataTable```. Use it as a blueprint. Make sure to log all the data by the end of ```wrangleData()``` to ensure that you have the data structures you need.
""",


# 4
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
_#index.html#_
_#dataTable.js#_
The only external libraries that you can use is D3v7.

### Implementation

Check out dataTable.js and examine closely how the former developer has structured the code. Since your map is basically just a nicer way to display the data, the ```class DataTable``` should at least provide some inspiration and orientation. In terms of the code architecture and the class structure, ```DataTable``` could even serve as blueprint for your ```class MapVis```. Make sure that MapVis contains a comprehensive ```constructor()``` method with all the parameters needed as well as the pipeline methods ```initVis()```, ```wrangleData()```, and ```updateVis()``` method.

Finish these steps. Plz tell me how to modify mapVis.js
6. **Define updateVis() method**

	You should have your pipeline set up in such a way that ```wrangleData()``` calls ```updateVis()```. As soon as the final COVID data structure has been prepared, you should grab the state paths and update their fill attribute.
""",

# 5
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
_#index.html#_
_#dataTable.js#_
The only external libraries that you can use is D3v7.

### Implementation

Check out dataTable.js and examine closely how the former developer has structured the code. Since your map is basically just a nicer way to display the data, the ```class DataTable``` should at least provide some inspiration and orientation. In terms of the code architecture and the class structure, ```DataTable``` could even serve as blueprint for your ```class MapVis```. Make sure that MapVis contains a comprehensive ```constructor()``` method with all the parameters needed as well as the pipeline methods ```initVis()```, ```wrangleData()```, and ```updateVis()``` method.

Finish these steps. Plz tell me how to modify mapVis.js

7. **Add tooltip**

    Just like you did in the lab, add a tooltip when you hover over a state and provide all information, i.e. absolute and relative covid cases and deaths.
""",

# 6
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
_#index.html#_
_#brushVis.js#_
The only external libraries that you can use is D3v7.

### Implementation

Finish these steps. Plz tell me how to modify brushVis.js

8. **Connect your map to the brush**

    On brush, call the ```wrangleData()``` method of your MapVis instance. The map should update when you brush.
""",

# 7
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
_#brushVis.js#_
The only external libraries that you can use is D3v7.

### Implementation

Finish these steps. Plz tell me how to modify index.html and mapVis.js

9. **Enable category selection via bootstrap select**

    Find a good place for a bootstrap select element in your html grid and add the following lines of code:

    ```html
    <select id='categorySelector' class="custom-select align-self-center" style="width: 50%" onchange="categoryChange()">
        <option value="absCases" selected>Cases (absolute)</option>
        <option value="absDeaths">Deaths (absolute)</option>
        <option value="relCases">Cases (relative to population)</option>
        <option value="relDeaths">Deaths (relative to population)</option>
    </select>

    ```
    Also, here's some useful js that goes together with the HTML above.

    ```javascript
    let selectedCategory =  document.getElementById('categorySelector').value;

    function categoryChange() {
        selectedCategory =  document.getElementById('categorySelector').value;
        myMapVis.wrangleData(); // maybe you need to change this slightly depending on the name of your MapVis instance
    }
    ```

    Whenever you select a category, the map should now update.
""",

# 8
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
_#index.html#_
The only external libraries that you can use is D3v7.

### Implementation

Finish these steps. Plz tell me how to modify index.html and mapVis.js

10. **Add legend to your map**

    Add a legend - you can utilize a continuous color scale or discrete color steps.
""",


# 9
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
_#barVis.js#_
_#main.js#_
_#dataTable.js#_
_#index.html#_
The only external libraries that you can use is D3v7.

### Implementation -- BarVis

Besides the choropleth map, you should implement a class that takes care of creating bar charts so that you can include two instances of that class in the dashboard. Since you have plenty of bar chart code lying around on your computer from former projects, this shouldn't be too hard. One bar chart should show the top 10 states for a filtered category, and the other should show the lowest 10 states for that category.

Finish these steps. Plz tell me how to modify index.html, main.js, and barVis.js
2. **Prepare class architecture and the constructor method**

    Set up your standard methods for your new class and define a constructor. The class should be used for both ascending and descending bar chart instances. The template contains relevant wrangling code from the ```DataTable``` and left some comments in the ```wrangleData()``` method about the reamining work.

    If you haven't done so already, this is the time to create two instances of the ```class BarVis```. The screenshot should give you an idea of where to position them.
""",

# 10
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
_#barVis.js#_
_#main.js#_
_#index.html#_
_#dataTable.js#_
The only external libraries that you can use is D3v7.

### Implementation -- BarVis

Finish the following step. Plz tell me how to modify barVis.js
3. **Complete initVis()**

    Thankfully, the margin conventions are already set up. Now, make sure you also set up your axis and scales before moving on to ```wrangleData()```.
""",

# 11
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
_#barVis.js#_
_#main.js#_
_#dataTable.js#_
_#index.html#_
The only external libraries that you can use is D3v7.

### Implementation -- BarVis

Besides the choropleth map, you should implement a class that takes care of creating bar charts so that you can include two instances of that class in the dashboard. Since you have plenty of bar chart code lying around on your computer from former projects, this shouldn't be too hard. One bar chart should show the top 10 states for a filtered category, and the other should show the lowest 10 states for that category.

Finish the following step. Plz tell me how to modify barVis.js

4. **Complete wrangleData()**

    As mentioned above, there are some helpful comments at the bottom of the ```wrangleData()``` method to help with the sorting and filtering of the data. The code already in the ```wrangleData()``` method is copy and pasted from ```DataTable```, so make sure you understand how it's working in the Table first.
""",

# 12
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
_#barVis.js#_
_#main.js#_
_#dataTable.js#_
_#index.html#_
The only external libraries that you can use is D3v7.

### Implementation -- BarVis

Finish the following step. Plz tell me how to modify barVis.js

5. **Draw the bars and axis in updateVis()**

    Once you finished ```wrangleData()```, call ```updateVis()``` and draw the bars. Use enter(), merge(), exit().
""",

# 13
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
_#barVis.js#_
_#mapVis.js#_
_#main.js#_
_#index.html#_
The only external libraries that you can use is D3v7.

### Implementation -- BarVis

Finish these steps. Plz tell me how to modify index.html, main.js, barVis.js, and brushVis.js

6. **React to brushing and category change**

    As you've done already successfully for the map, have your bar charts react to the user input (brush and category selection). Also, make sure to include transitions!
""",

# 14
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
_#barVis.js#_
_#mapVis.js#_
_#main.js#_
_#index.html#_
The only external libraries that you can use is D3v7.

### Implementation -- BarVis

Finish these steps. Plz tell me how to modify index.html, main.js, barVis.js, and brushVis.js

7. **Add a tooltip**
    
    Add a tooltip when hovering over a bar.
""",

# 15
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
_#barVis.js#_
_#mapVis.js#_
_#main.js#_
_#index.html#_
_#styles.css#_
The only external libraries that you can use is D3v7.

### Implementation -- BarVis

Finish these steps. Plz tell me how to modify index.html, main.js, barVis.js, mapVis.js, and styles.css

5. **Prettify**

    link views, add titles, axis, legends, hover effects, etc.
"""
]