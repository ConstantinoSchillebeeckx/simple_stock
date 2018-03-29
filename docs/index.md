---
layout: default
usage: |
  ### Usage

  The data and time range to be displayed are set through *GET* parameters; for example, to display the last month of GOOG as a line chart you do something like [this](?symbols=GOOG&range=1m&chartType=line).

  The following *GET* parameters are available:

  - **chartType**: either `candle` or `line`
  - **symbols**: case-insensitive comma-separated list of stock tickers to display; note that the candle chart will only display the first ticker if more than one is provided. e.g. `?symbols=AAPL,amzn`
  - **range**: one of the allowed range options as specified by [IEX](https://iextrading.com/developer/docs/#chart) e.g. `&range=1y`

  ##### Note

  - if not provided, the default *GET* parameters are `range=1m`, `symbols=AAPL,FB` and `chartType=line`.
  - only the line chart will display a second x-axis, which is used to zoom and pan along time.
---


<div id="chart">
    <div class="btn-group" role="group" aria-label="...">
      <a href='?symbols=GOOG&range=1y&chartType=line' type="button" class="btn btn-warning">Line</a>
      <a href='?symbols=fb&range=1y&chartType=candle' type="button" class="btn btn-warning">Candle</a>
    </div>
</div>

<script>
    jQuery(function(){
        // initialize line chart 
        init('#chart');
    });
</script>

