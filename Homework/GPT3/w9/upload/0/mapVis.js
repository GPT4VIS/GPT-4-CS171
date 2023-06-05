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
    
  }
}