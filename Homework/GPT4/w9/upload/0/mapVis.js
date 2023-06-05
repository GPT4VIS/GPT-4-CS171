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

        // parse date method
        this.parseDate = d3.timeParse("%m/%d/%Y");

        this.initVis();
    }

    initVis() {

    }
}