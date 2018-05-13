

export const callGetServices = (url,params) => {

    var url_params=url;
    var responseService={}
        // params.forEach( function(valor, indice, array) {
    //     // console.log("En el índice " + indice + " hay este valor: " + valor);
    //     url=url+'?'+params.param+'='+params.value;
    // });
    console.log('params ' + JSON.stringify(params))
    params.map((param) => {
        url=url+'?'+param.param+'='+param.value;
    });
    console.log('final url ' +url)

    // fetch(url,{
    //     mode:'no-cors'
    // }).then(function(response) {
    //     console.log(response); // "opaque"
    //   });


    //   fetch(url,{
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json'
    //     },
    //     mode:'no-cors'
    // })
    // .then((response) => {
    //     console.log('Repsonse ' + JSON.stringify(response))
    //     return response.text();
    // })
    // .then((data) => {
    //     console.log('Repsonse ' + JSON.stringify(data))
    //     // return response.text();
    // })
    // .catch(function(error) {
    //     console.log('Error ' + error)

    // });

//     fetch('https://api.bitso.com/v3/ticker/?book=btc_mxn')
//     .then(function(response) {
//      console.log(response); // "opaque"
//    });

//     fetch('https://api.bitso.com/v3/order_book/?book=btc_mxn')
//        .then(function(response) {
//         console.log('Sercivio order'+ JSON.stringify(response.body)); // "opaque"
//       });

//       fetch(' https://api.bitso.com/v3/trades/?book=btc_mxn')
//       .then(function(response) {
//        console.log('Sercivio trades'+ JSON.stringify(response.body)); // "opaque"
//      });
    return(
     fetch(url_params)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
    console.log('Respuesta ' + JSON.stringify(data))
      
    })
    .catch(function(error) {

        responseService={
            "success": true,
            "payload": {
                "high": "169592.64",
                "last": "169008.75",
                "created_at": "2018-05-13T19:24:20+00:00",
                "book": "btc_mxn",
                "volume": "11.79026906",
                "vwap": "165887.24344596",
                "low": "163500.00",
                "ask": "169554.52",
                "bid": "167521.40"
            }
        };
        console.log('Respuesta')
        return(responseService);

    })
)



}

export default callGetServices;