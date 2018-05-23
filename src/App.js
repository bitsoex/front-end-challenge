import React, { Component } from 'react'
import logo from './assets/images/1x/bitso_logo.png'

import { createEpicMiddleware, ReduxObservable, combineEpics } from 'redux-observable'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import {tradesEpic, tradesReducer} from './reducers/trades'
import {tickersEpic, tickersReducer} from './reducers/tickers'
import {booksEpic, booksReducer} from './reducers/books'
import {websocketEpic, websocketReducer} from './reducers/websocket'

import FilterPing from './containers/FilterPing'
import {FilterTrades, FilterBids, FilterAsks, FilterLineChart } from './containers/FilterTrades'
import {FilterTickers } from './containers/FilterTrades'

import FilterBooks from './containers/FilterBooks'
import FilterLabelBook from './containers/FilterLabelBook'

import mainLogo from './assets/images/1x/bitso_logo.png';

import BarChart from './components/BarChart';
import FloatingMenu from './components/FloatingMenu';

const myLogger = (store) => (next) => (action) =>{
	console.log("Logged action: ", action);
	next(action);
}

const tradesMiddleware = createEpicMiddleware(tradesEpic);
const booksMiddleware = createEpicMiddleware(booksEpic);
const wsMiddleware = createEpicMiddleware(websocketEpic);
const tickersMiddleware = createEpicMiddleware(tickersEpic);
const storeTrades = createStore(
	combineReducers({
		booksReducer,
		tradesReducer,
		websocketReducer,
		tickersReducer
	}),
	{},
	applyMiddleware(
		myLogger,
		tradesMiddleware,
		booksMiddleware,
		wsMiddleware,
		tickersMiddleware
	)
);



storeTrades.subscribe(_=>{
	console.log("Store updated!", storeTrades.getState());
});

storeTrades.dispatch({
	type: 'LOAD_BOOKS'
})

function createFakeData(){
    // This function creates data that doesn't look entirely random
    const data = []

    for (let x = 0; x <= 30; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x,y})
    }
	console.log("Fake data", data);
    return data;
  }

class App extends Component {
		
	state = {
		isChecked: true,
		theme: 'darken'
	}
	
	toggleCheckboxChange = () => {
		const { handleCheckboxChange, label } = this.props;

		this.setState(({ isChecked }) => (
		{
			isChecked: !isChecked,
			theme: isChecked ? 'lighten': 'darken'
		}
		));
	}
	
	render(){
			 const { isChecked, theme } = this.state;
		/*return (
			<div className = {`${theme}`}>
				<header className="header">
					<ul>
					  <li><a className="logo"><img src={mainLogo} /></a></li>
					  <li><a>|</a></li>
					  <li><a>EXCHANGE</a></li>
					  <li className="floatRight">
						<a href="#about">
							  <label className="switch">
								<input type="checkbox" onChange={this.toggleCheckboxChange} checked={isChecked} />
								<span className="slider round"></span>
							</label>
						</a>
					</li>
					  <li className="floatRight"><a href="#about">Usuario</a></li>
					  <li className="floatRight"><a href="#about">Exchange</a></li>
					  <li className="floatRight"><a href="#about">Wallet</a></li>
					  <li className="floatRight"><a href="#about">|</a></li>
					  <li className="floatRight"><a href="#about">1 BTC = 000,000.00 MXN</a></li>
					</ul>
				</header>
				<header className="header2">
					<ul>
					  <li><a className="greenText">BTC/MXN</a></li>
					  <li>
						<a >
							<span className="withOpacity">Volumen 24 hrs</span>
							<span>170.5405818 BTC</span>
						</a>
					</li>
					  <li><a >
						<span className="withOpacity">Max.</span>
							<span>304,934.23 MXN</span>
						</a></li>
					  <li><a >
						<span className="withOpacity"> Min.</span>
							<span>1274,934.23 MXN</span>
					  </a></li>
					  <li><a >
						<span className="withOpacity">Variación</span>
							<span>+4,061.68 MXN (1.4%)</span>
					  </a></li>
					</ul>
				</header>
				<div className="row">
				<div className="aside">
					<table className="lastTrades">
						<thead>
							<tr>
								<th colSpan="3">
								ÚLTIMOS TRADES
								</th>
							</tr>
							 <tr>
								<td>HORA</td>
								<td>
									<span className="withOpacity">MXN</span>
									<span>PRECIO</span>
								</td>
								<td><span className="withOpacity">BTC</span>
									<span>MONTO</span></td>
							  </tr>
						</thead>
						<tbody>
							  <tr>
								<td>16:10:25</td>
								<td>319.149.99</td>
								<td>0.0904<span className="withOpacity">0000</span></td>
							  </tr>
							  <tr>
								<td>16:10:25</td>
								<td>319.149.99</td>
								<td>1.090484<span className="withOpacity">00</span></td>
							  </tr>
							</tbody>
					</table>
			</div>
			<div className="section">
				<nav>
					 <a >HTML</a> |
					 <a >zoom</a>
				</nav>
				<BarChart className="graphicSVG" data={[5,10,1,3]} size={[500,500]} />
				<div className="posturas row">
					<div className="col-2">
					
					</div>
					<div className="col-2">
						<table className="lastTrades">
						<thead>
							<tr>
								<th colSpan="3">
								ÚLTIMOS TRADES
								</th>
							</tr>
							 <tr>
								<td>HORA</td>
								<td>
									<span className="withOpacity">MXN</span>
									<span>PRECIO</span>
								</td>
								<td><span className="withOpacity">BTC</span>
									<span>MONTO</span></td>
							  </tr>
						</thead>
						<tbody>
							  <tr>
								<td>16:10:25</td>
								<td>319.149.99</td>
								<td>0.0904<span className="withOpacity">0000</span></td>
							  </tr>
							  <tr>
								<td>16:10:25</td>
								<td>319.149.99</td>
								<td>1.090484<span className="withOpacity">00</span></td>
							  </tr>
							</tbody>
					</table>
				</div>
				<div>
				</div>
			</div>
			</div>
			<div className="mercados">
			</div>
			</div>
			</div>
		);*/
		return (
			<div className="wireframe">
				<div className="row header1">
					<div className="inner">
						<div className="container">
							<ul>
								<li className="vcenter"><img src="./bitso_logo.png" /></li>
								<li className="vcenter"><span>|</span></li>
								<li className="vcenter title"><span>EXCHANGE</span></li>
								<li className="vcenter floatRight">
									<label className="switch">
										<input type="checkbox" onChange={this.toggleCheckboxChange} checked={isChecked} />
										<span className="slidericons round"></span>
										<span className="slider round"></span>
									</label>
								</li>
								<li className="vcenter floatRight"><span href="#about">Usuario</span></li>
								<li className="vcenter floatRight"><span href="#about">Exchange</span></li>
								<li className="vcenter floatRight"><span href="#about">Wallet</span></li>
								<li className="vcenter floatRight"><span href="#about">|</span></li>
								<li className="vcenter floatRight">
									<Provider store={storeTrades}>
										<FilterLabelBook  />
									</Provider>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="row header2">
					<div className="inner">
						<div className="container">
							<Provider store={storeTrades}>
								<FilterBooks />
							</Provider>
						</div>
					</div>
				</div>
				<div className="row separator">
				</div>
				<div className="row content">
					<div className="col trades">
						<div className="inner">
							<div className="container">
							<Provider store={storeTrades}>
								<FilterTrades />
							</Provider>
							</div>
						</div>
					</div>
					<div className="col main">
						<div className="row graphic">
							<div className="inner">
								<div className="container">
									<Provider store={storeTrades}>
										<FilterLineChart />
									</Provider>
								</div>
							</div>
						</div>
						<div className="row separator"></div>
						<div className="row postures">
							<div className="col buying">
								<div className="inner">
									<div className="container">
										<Provider store={storeTrades}>
											<FilterBids />
										</Provider>
									</div>
								</div>
							</div>
							<div className="col separator">
							</div>
							<div className="col selling">
								<div className="container">
									<Provider store={storeTrades}>
										<FilterAsks />
									</Provider>
								</div>
							</div>
						</div>
					</div>
					<div className="col floating">
						<div className="inner">
							<div className="container">
								<FloatingMenu className="menu" store={storeTrades}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default App;
