---
**Question:** 
```csv
Country,Region,Latitude,Longitude,Happiness score,Logged GDP per capita,Social support score,Healthy life expectancy,Freedom score,Generosity score,Perceptions of corruption score,Date
Jamaica,Latin America and Caribbean,18.109581,-77.297508,5.89,9.006,0.916,67.1,0.858,-0.125,0.889,1/1/2020
El Salvador,Latin America and Caribbean,13.794185,-88.89653,6.348,8.909,0.806,66.108,0.834,-0.121,0.754,1/1/2020
Moldova,Commonwealth of Independent States,47.411631,28.369885,5.608,8.777,0.843,65.013,0.722,-0.038,0.913,1/1/2020
Tunisia,Middle East and North Africa,33.886917,9.537499,4.392,9.315,0.689,66.898,0.593,-0.216,0.868,1/1/2020
Brazil,Latin America and Caribbean,-14.235004,-51.92528,6.376,9.566,0.897,66.48,0.8,-0.102,0.771,1/1/2020
Gabon,Sub-Saharan Africa,-0.803689,11.609444,4.829,9.681,0.788,59.715,0.705,-0.222,0.849,1/1/2020
Cameroon,Sub-Saharan Africa,7.369722,12.354722,5.085,8.119,0.7,52.705,0.763,-0.001,0.851,1/1/2020
Costa Rica,Latin America and Caribbean,9.748917,-83.753428,7.121,9.658,0.902,71.3,0.935,-0.102,0.786,1/1/2020
Thailand,Southeast Asia,15.870032,100.992541,5.999,9.742,0.89,67.251,0.905,0.269,0.886,1/1/2020
Cyprus,Western Europe,35.126413,33.429859,6.159,10.406,0.806,73.702,0.78,0.044,0.856,1/1/2020
Tanzania,Sub-Saharan Africa,-6.369028,34.888822,3.476,7.968,0.689,57.496,0.822,0.11,0.62,1/1/2020
Sierra Leone,Sub-Saharan Africa,8.460555,-11.779889,3.926,7.269,0.636,50.865,0.715,0.089,0.861,1/1/2020
Croatia,Central and Eastern Europe,45.1,15.2,5.505,10.071,0.875,70.215,0.715,-0.129,0.916,1/1/2020
Niger,Sub-Saharan Africa,17.607789,8.081666,4.91,6.842,0.617,53.5,0.76,0.014,0.723,1/1/2020
Netherlands,Western Europe,52.132633,5.291266,7.449,10.813,0.939,72.301,0.909,0.208,0.365,1/1/2020
Benin,Sub-Saharan Africa,9.30769,2.315834,5.216,7.674,0.469,54.312,0.735,-0.004,0.741,1/1/2020
Germany,Western Europe,51.165691,10.451526,7.076,10.733,0.899,72.202,0.867,0.08,0.456,1/1/2020
Senegal,Sub-Saharan Africa,14.497401,-14.452362,4.981,8.119,0.724,59.599,0.691,-0.052,0.809,1/1/2020
Macedonia,Central and Eastern Europe,41.608635,21.745275,5.16,9.511,0.82,67.504,0.739,-0.02,0.897,1/1/2020
Bulgaria,Central and Eastern Europe,42.733883,25.48583,5.102,9.869,0.938,66.804,0.745,-0.144,0.936,1/1/2020
```

Please generate the code for a annotated chart style web-based data storytelling, to explain the following insights:

- There appears to be a positive correlation between Logged GDP per capita and Healthy life expectancy. As countries have higher GDP per capita, their healthy life expectancy generally increases.
- There are some outliers, such as Gabon, which has a relatively high GDP per capita but a lower healthy life expectancy compared to other countries with similar GDP per capita.

- There appears to be a positive correlation between Social Support Score and Freedom Score. Countries with higher social support tend to have higher freedom scores.
- Some countries with high social support and freedom scores include the Netherlands, Costa Rica, and Jamaica.
- Some countries with relatively lower social support and freedom scores include Tunisia, Sierra Leone, and Benin.

- There is no obvious correlation between Generosity score and Perceptions of corruption score. Countries have varying generosity and perceptions of corruption scores, and they do not seem to follow any specific pattern.
- Countries like Cyprus and Croatia have relatively high generosity scores but low perceptions of corruption scores, while countries like Benin and Niger have low generosity scores but also low perceptions of corruption scores.

You can use any tools you like, but please output the complete code in a single file.



**Answer:** Here's a sample code for creating an annotated chart style web-based data storytelling using plotly and pandas in Python. You can run this code in a Jupyter Notebook or modify it for your preferred web development framework:

```python
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# Read the data from the CSV provided
data = pd.read_csv('data.csv')

# Scatter plot for GDP per capita and Healthy life expectancy
fig1 = px.scatter(data, x="Logged GDP per capita", y="Healthy life expectancy", 
                  text="Country", hover_data=['Country'], height=600, width=1000)
fig1.update_traces(textposition='top center')

# Add annotations for outliers
fig1.add_annotation(x=data[data.Country == "Gabon"]["Logged GDP per capita"].item(),
                   y=data[data.Country == "Gabon"]["Healthy life expectancy"].item(),
                   text="Gabon: Outlier",
                   showarrow=True,
                   arrowhead=1,
                   ax=-10,
                   ay=-80)

# Update axis labels
fig1.update_xaxes(title='Logged GDP per capita')
fig1.update_yaxes(title='Healthy life expectancy')

# Scatter plot for Social Support Score and Freedom Score
fig2 = px.scatter(data, x="Social support score", y="Freedom score",
                  text="Country", hover_data=['Country'], height=600, width=1000)
fig2.update_traces(textposition='top center')

# Add example countries
countries = ["Netherlands", "Costa Rica", "Jamaica", "Tunisia", "Sierra Leone", "Benin"]
for country in countries:
    fig2.add_annotation(x=data[data.Country == country]["Social support score"].item(),
                        y=data[data.Country == country]["Freedom score"].item(),
                        text=country,
                        showarrow=True,
                        arrowhead=1,
                        ax=0,
                        ay=-15)

# Update axis labels
fig2.update_xaxes(title='Social support score')
fig2.update_yaxes(title='Freedom score')

# Scatter plot for Generosity score and Perceptions of corruption score
fig3 = px.scatter(data, x="Generosity score", y="Perceptions of corruption score",
                  text="Country", hover_data=['Country'], height=600, width=1000)
fig3.update_traces(textposition='top center')

# Add example countries
countries = ["Cyprus", "Croatia", "Benin", "Niger"]
for country in countries:
    fig3.add_annotation(x=data[data.Country == country]["Generosity score"].item(),
                        y=data[data.Country == country]["Perceptions of corruption score"].item(),
                        text=country,
                        showarrow=True,
                        arrowhead=1,
                        ax=0,
                        ay=-15)

# Update axis labels
fig3.update_xaxes(title='Generosity score')
fig3.update_yaxes(title='Perceptions of corruption score')

# Show the plots
fig1.show()
fig2.show()
fig3.show()
```

Make sure to change the file path in the `pd.read_csv()` line to the correct location of your CSV file.

This code creates three annotated scatter plots for the insights mentioned using Plotly's Python library and the provided data. You can embed these plots in a web page according to the documentation of the library you choose to use. Note that you may need to install the required libraries using `pip install pandas plotly` if you haven't done so already.

