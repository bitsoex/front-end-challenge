




export function getData(book, range,url) {
    console.log('Asi llega el rango ' + range )
    var responseService={}
	return(
	fetch(url+book+'/'+range)
		.then(response => response.json())
		.then(data => {
			return(data);
		}
		)    .catch(function(error) {
            responseService='error'
            return(responseService);
        }));
}

export const callGetServices = (url,params) => {

    var url_params=url;
    var responseService={}

    params.forEach((param) => {
        url_params=url+'?'+param.param+'='+param.value;
    });
    
    return(
     fetch(url_params)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
    return(data);
      
    })
    .catch(function(error) {

        responseService='error'
        return(responseService);

    })
)



}

export default callGetServices;