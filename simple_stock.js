var chart;

function renderChart(div, data) {
    /*
        Setup the NVD3 chart, attach data, and render

        div: (str) selector for chart div e.g. '#chart'
        data: (list) data to render, see https://github.com/nvd3-community/nvd3/blob/gh-pages/examples/candlestickChart.html for example format
    */


    nv.addGraph(function() {
        // this chart options are specific to the line chart
        if ('useInteractiveGuideline' in chart) {
            chart.useInteractiveGuideline(true);
        }
        if ('interactiveUpdateDelay' in chart) {
            chart.interactiveUpdateDelay(2000);
        }
        if ('x2Axis' in chart) {
            chart.x2Axis
                 .tickFormat(function(d) {
                    return d3.time.format('%Y-%m-%d')(new Date(d))
                 })
        }

        chart
             .margin({
                left:80,
                right:50,
             })

        chart.x(function(d) {
            return dateToTimestamp(d.date);
        });
        chart.y(function(d) {
            return d.open;
        });

        chart.xAxis
             .tickFormat(function(d) {
                return d3.time.format('%Y-%m-%d')(new Date(d))
             })

        chart.yAxis
             .axisLabel('USD');

        // remove any current chart
        d3.select(div + ' svg')
          .remove()

        d3.select(div)
          .append('svg')
          .datum(data)
          .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
    });

}

// https://stackoverflow.com/a/22076667/1153897
function getData(url, callback) {
    /*
        download data using the IEX API.
        parses JSON and then calls the callback on it
    */

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

function dateToTimestamp(date) {
    /*
        Convert given date into a timestamp;
        date assumed to be in format 'YYYY-MM-DD'
    */
    return new Date(date).getTime();
}

function parseGetParams() {
    /*
        parse the GET parameters returning an object with
        parameter name as key, and paramter value as value
        note that key values are returns as arrays.

        e.g. {symbols: ['aapl','fb'], types:['chart']}
    */
    var result = {},
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp.length == 2) result[tmp[0]] = tmp[1].split(',');
    }
    return result;
}

function buildURL(GET) {
    /*
    Build the proper IEX endpoint to download our data

    GET: (obj) {symbols: ['AAPL','FB'], range: '1y'}
    
    // REF: https://iextrading.com/developer/docs/#batch-requests
    */
    var base = 'https://api.iextrading.com/1.0/stock/';
    var tickers = 'symbols' in GET ? GET['symbols'] : 'aapl,fb';
    var endpoint = 'market/batch/?symbols=';
    var options = '&types=chart';
    options += '&range=' + ('range' in GET ? GET['range'][0] : '1m');
    
    return base + endpoint + tickers + options;
}


function init(div) {
    /*
        Function call to query data from IEX and render chosen chart type

        div: (str) selector for chart div e.g. '#chart'
        chartType: (str) 'line' or 'candle'
    */
    var GET = parseGetParams();

    if ('chartType' in GET) {
        if (GET['chartType'][0] === 'candle') {
            chart = nv.models.candlestickBarChart();
        } else {
            chart = nv.models.lineWithFocusChart();
        }
    } else {
        chart = nv.models.lineWithFocusChart();
    }


    getData(buildURL(GET), function(d) {

        var dat = Object.keys(d).map(function(i) {
            return {
                key: i,
                area: false,
                values: d[i].chart,
            };
        });

        renderChart(div, dat);
    })
}

