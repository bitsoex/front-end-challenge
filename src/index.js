import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'rxjs';

ReactDOM.render(
	<App />, 
	document.getElementById('root')
);
registerServiceWorker();
