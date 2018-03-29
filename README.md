# Simple stock

A bare-bones stock chart that leverages [NVD3](https://nvd3-community.github.io/nvd3/) plots and the [IEX](https://iextrading.com/developer/docs/#chart) stock API.

## Usage

All that's needed is a `div` into which to render the chart and a call to `init()` with the proper options. 

For example, assuming a div with the id `chart` exists, one would render the line chart with `init('#chart', 'line')`.

## GET parameters

The data to be displayed as well as the time range is set through GET parameters; for example, to display the last month of GOOG: `?symbols=GOOG&range=1m`.

The following parameters are available:

- symbols: case-insensitive comma-separated list of stock tickers to display; note that the candle chart will only display the first ticker if more than one is provided. e.g. `?symbols=AAPL,amzn`
- range: one of the allowed range options as specified by [IEX](https://iextrading.com/developer/docs/#chart) e.g. `&range=1y`

## Caveats

- the candle plot can only show one stock at a time
- the candle plot does have the second x-axis
