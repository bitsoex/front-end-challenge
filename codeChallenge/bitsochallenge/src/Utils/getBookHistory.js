import {URL_SERVICES} from './../config/Config.js';
export function getBook(period) {
	var URI=URL_SERVICES.historyBook+period;
	return(
    fetch(URI)
      .then(response => response.json())
      .then(data => {
				data.forEach((d, i) => {d.date = new Date(d.date)})
				return(data);
    }

  ));
}
