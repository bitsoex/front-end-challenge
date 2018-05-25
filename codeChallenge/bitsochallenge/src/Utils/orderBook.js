import {URL_SERVICES} from './../config/Config.js';
export function getOrders(book) {
	var URI=URL_SERVICES.orderBook+book;
	return(
    fetch(URI)
      .then(response => response.json())
      .then(data => {
				return(data);
    }

  ));
}
