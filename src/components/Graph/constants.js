export const CHART_OPTIONS = {
  title: { text: null },
  scrollbar: { enabled: false },
  tooltip: {
    animation: false,
    shared: true,
    split: false,
    backgroundColor: '#313d4d',
    borderColor: '#4e5863',
    style: { color: '#b0bac1' }
  },
  xAxis: {
    tickColor: '#191e23',
    lineColor: '#191e23',
    gridLineDashStyle: 'solid',
    gridLineColor: '#252c36',
    gridLineWidth: 1,
    scrollbar: { enabled: false },
    opposite: true,
    plotLines: [
      {
        dashStyle: 'dash',
        lineColor: '#252c36'
      }
    ]
  },
  yAxis: [
    {
      offset: 40,
      gridLineDashStyle: 'dash',
      gridLineColor: '#252c36',
      gridLineWidth: 1,
      scrollbar: { enabled: false },
      oposite: true
    },
    {
      gridLineWidth: 0,
      scrollbar: { enabled: false },
      max: 1000,
      labels: { enabled: false }
    }
  ],
  navigator: { enabled: false },
  rangeSelector: { enabled: false },
  credits: { enabled: false },
  chart: {
    backgroundColor: '#191e23'
  },
  series: []
}
