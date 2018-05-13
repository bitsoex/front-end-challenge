

export const callGetServices = (url,params) => {

    var url_params=url;
    var responseService={}

    params.map((param) => {
        url_params=url+'?'+param.param+'='+param.value;
    });
    
    return(
     fetch(url_params)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
    console.log('Respuesta ' + JSON.stringify(data))
    return(data);
      
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