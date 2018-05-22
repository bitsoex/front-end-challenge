const functions = require('firebase-functions');
const axios = require('axios')

exports.bitsoTicker = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*')

  var ticker = request.url.split('book=')[1]
  if (ticker !== null) {
    axios.get('https://api.bitso.com/v3/ticker/?book=' + ticker)
    .then(data => {
      console.log(data.data)
      response.send(data.data)
      return 'a'
    })
    .catch(error =>{
     console.log(error)
     response.send(error)
    })
  } else {
    response.json('error')
  }
})

exports.bitsoChart = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  console.log(request.url)
  var options = request.url.split('?')[1].replace('&', '/')
  console.log(options)
  if (options !== null) {
    axios.get('https://bitso.com/trade/chartJSON/' + options)
    .then(data => {
      console.log(data.data)
      response.send(data.data)
      return 'a'
    })
    .catch(error =>{
     console.log(error)
     response.send(error)
    })
  } else {
    response.json('error')
  }
})
