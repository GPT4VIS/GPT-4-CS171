/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */


class MapVis {

  constructor(parentElement, geoData, covidData, usaData) {
    this.parentElement = parentElement;
    this.geoData = geoData;
    this.covidData = covidData;
    this.usaData = usaData;
    this.displayData = [];
    this.selectedState = '';

    // let's start things off by initializing the map
    this.initVis();
  }

  initVis() {
    let vis = this;

    vis.margin = { top: 0, right: 0, bottom: 0, left: 0 };
    vis.width = 500 - vis.margin.left - vis.margin.right;
    vis.height = 350 - vis.margin.top - vis.margin.bottom;

    vis.div = d3.select(`#${vis.parentElement}`);
    vis.svg = vis.div.append('svg')
      .attr('viewBox', `0 0 ${vis.width + vis.margin.left + vis.margin.right}
            ${vis.height + vis.margin.top + vis.margin.bottom}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    vis.content = vis.svg.append('g')
      .attr('transform', `translate(${vis.margin.left},${vis.margin.top})`);

    vis.projection = d3.geoAlbersUsa()
      .scale(550)
      .translate([vis.width / 2, vis.height / 2]);

    vis.path = d3.geoPath()
      .projection(vis.projection);

    vis.criteria = 'cases_sum';

    // Initialize State viewBox and population scale
    vis.usaData.forEach(d => d.population = +d.pop_last);
    vis.stateList = topojson.feature(vis.geoData, vis.geoData.objects.states).features;

    vis.displayData = vis.covidData.filter(d => d.year === '2020');
    vis.displayData.forEach(d => {
      d.State = d.State.replace('NYC', 'NY');
      d.date = new Date(d.date);
      d.cases_sum = +d.cases_sum;
      d.deaths_sum = +d.deaths_sum;
    });

    // Set the domain for color scale from zero to the maximun number of cases_sum in the data
    vis.colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(vis.displayData, d => d[vis.criteria])]);

    // Define tooltip
    vis.tooltip = d3.select('body').append('div')
      .attr('class', 'map-tooltip d3-tip')
      .attr('id', 'map-tooltip')
      .style('opacity', 0);

    vis.usaData.forEach(d => {
      const covData = vis.displayData.filter(c => c.State === d.state);
      let data = [];
      data = {
        cases_sum: d3.sum(covData, v => v.cases_sum),
        deaths_sum: d3.sum(covData, v => v.deaths_sum),
        population: d.population
      };
      Object.assign(d, data);
    });

    vis.legend = vis.svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${vis.width - 260},${vis.height - 25})`);

    // Create color gradient legend
    vis.legendGradient = vis.legend.append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    vis.legendGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', vis.colorScale(0));
    vis.legendGradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', vis.colorScale(d3.max(vis.displayData, d => d[vis.criteria]) / 2));
    vis.legendGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', vis.colorScale(d3.max(vis.displayData, d => d[vis.criteria])));

    vis.legend.append('rect')
      .attr('x', -1)
      .attr('y', -10)
      .attr('width', 262)
      .attr('height', 12)
      .style('fill', 'url(#gradient)');
  }
}