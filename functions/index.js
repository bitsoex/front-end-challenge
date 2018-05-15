const functions = require('firebase-functions');
const axios = require('axios')

exports.bitsoTicker = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  axios.get('https://api.bitso.com/v3/ticker/?book=btc_mxn')
  .then(data => {
    console.log(data.data)
    response.json(data.data)
    return 'a'
  })
  .catch(error =>{
   console.log(error)
  })
})
