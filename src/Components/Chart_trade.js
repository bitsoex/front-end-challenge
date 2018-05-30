import React, { Component } from 'react';
import AmCharts from "@amcharts/amcharts3-react";

let chartData = [];
// Generate random data
function generateData() {
  var firstDate = new Date();
  firstDate.setHours( 0, 0, 0, 0 );
  firstDate.setDate( firstDate.getDate() - 2000 );

  for ( var i = 0; i < 2000; i++ ) {
    var newDate = new Date( firstDate );

    newDate.setDate( newDate.getDate() + i );

    var open = Math.round( Math.random() * ( 30 ) + 100 );
    var close = open + Math.round( Math.random() * ( 15 ) - Math.random() * 10 );

    var low;
    if ( open < close ) {
      low = open - Math.round( Math.random() * 5 );
    } else {
      low = close - Math.round( Math.random() * 5 );
    }

    var high;
    if ( open < close ) {
      high = close + Math.round( Math.random() * 5 );
    } else {
      high = open + Math.round( Math.random() * 5 );
    }

    var volume = Math.round( Math.random() * ( 1000 + i ) ) + 100 + i;


    chartData[ i ] = ( {
      "date": newDate,
      "open": open,
      "close": close,
      "high": high,
      "low": low,
      "volume": volume
    } );
  }
}

generateData();

/**
 * Componente para render del stock usando la libreria AMCHART, utilizando datos dummy
 */
class Chart_trade extends Component {

  render() {
    const config = {
  "type": "stock",
  "theme": "dark",
  "dataSets": [ {
    "fieldMappings": [ {
      "fromField": "open",
      "toField": "open"
    }, {
      "fromField": "close",
      "toField": "close"
    }, {
      "fromField": "high",
      "toField": "high"
    }, {
      "fromField": "low",
      "toField": "low"
    }, {
      "fromField": "volume",
      "toField": "volume"
    }, {
      "fromField": "value",
      "toField": "value"
    } ],
    "color": "#7f8da9",
    "dataProvider": chartData,
    "categoryField": "date"
  } ],
  "balloon": {
    "horizontalPadding": 13
  },
  "panels": [ {
    "title": "Value",
    "stockGraphs": [ {
      "id": "g1",
      "type": "candlestick",
      "openField": "open",
      "closeField": "close",
      "highField": "high",
      "lowField": "low",
      "valueField": "close",
      "lineColor": "#669849",
      "fillColors": "#455840",
      "negativeLineColor": "#191e23",
      "negativeFillColors": "#59252f",
      "fillAlphas": .8,
      "balloonText": "open:<b>[[open]]</b><br>close:<b>[[close]]</b><br>low:<b>[[low]]</b><br>high:<b>[[high]]</b>",
      "useDataSetColors": false
    } ]
  },
  	{
    "legend": {},

    "stockGraphs": [ {
      "valueField": "volume",
      "fillAlphas": 0.15,
      "type": "column",
    } ]
  }
   ],
  "scrollBarSettings": {
    "graphType": "line",
    "usePeriod": "WW"
  },
  "panelsSettings": {
    "panEventsEnabled": true
  },
  "cursorSettings": {
    "valueBalloonsEnabled": true,
    "valueLineBalloonEnabled": true,
    "valueLineEnabled": true
  },
  "periodSelector": {
    "position": "bottom",
    "periods": [ {
      "period": "DD",
      "count": 10,
      "label": "10 days"
    }, {
      "period": "MM",
      "selected": true,
      "count": 1,
      "label": "1 month"
    }, {
      "period": "YYYY",
      "count": 1,
      "label": "1 year"
    }, {
      "period": "YTD",
      "label": "YTD"
    }, {
      "period": "MAX",
      "label": "MAX"
    } ]
  },
  "responsive": {
    "enabled": true
  }
};

    return (
    	<div class="chart-trade">
    		<AmCharts.React style={{ width: "100%", height: "400px" }} options={config} />
    	</div>
    );
  }
}

export default Chart_trade;