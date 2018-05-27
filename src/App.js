import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware, ReduxObservable, combineEpics } from 'redux-observable'
import ReactDOM from 'react-dom'

import {tradesEpic, tradesReducer} from './reducers/trades'
import {tickersEpic, tickersReducer} from './reducers/tickers'
import {booksEpic, booksReducer} from './reducers/books'
import {websocketEpic, websocketReducer} from './reducers/websocket'
import {historyTradeEpic, historyTradeReducer} from './reducers/historytrade'

import {FilterTrades, FilterBids, FilterAsks, FilterLineChart } from './containers/FilterTrades'
import {FilterTickers } from './containers/FilterTrades'
import FilterBooks from './containers/FilterBooks'

import FloatingMenu from './components/FloatingMenu'
import {observerResize} from './util/observer.resize'
import Header from './components/Header'

const tradesMiddleware = createEpicMiddleware(tradesEpic);
const booksMiddleware = createEpicMiddleware(booksEpic);
const wsMiddleware = createEpicMiddleware(websocketEpic);
const tickersMiddleware = createEpicMiddleware(tickersEpic);
const historyTradeMiddleware = createEpicMiddleware(historyTradeEpic);
const storeTrades = createStore(
	combineReducers({
		booksReducer,
		tradesReducer,
		websocketReducer,
		tickersReducer,
		historyTradeReducer
	}),
	{},
	applyMiddleware(
		tradesMiddleware,
		booksMiddleware,
		wsMiddleware,
		tickersMiddleware,
		historyTradeMiddleware
	)
);

storeTrades.dispatch({
	type: 'LOAD_BOOKS'
})


class App extends Component {
	
	constructor(props) {
		super(props);
		
		this.state ={
			isChecked: true,
			theme: 'darken',
			widthChart: 700,
			heightChart: 600
		};
		
		this.setContainerRef = element => {
			this.containerRef = element;
		};
		
	}

	 componentDidMount() {
		observerResize().subscribe(()=>{
			if(this.containerRef){
				const {width, height} = this.containerRef.getBoundingClientRect();
				console.log( this.containerRef.getBoundingClientRect(), width, height);
				this.setState({
					widthChart: width,
					heightChart: height
				});
			}
		});
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
		const classTheme = isChecked ? "" : "light";
		
		return (
			<div className={"wireframe " + classTheme}>
				<div className="row header1">
					<div className="inner">
						<div className="container">
							<Header toggleCheckboxChange={this.toggleCheckboxChange.bind(this)} store={storeTrades} isChecked={this.state.isChecked}  />
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
								<div className="container"  ref={this.setContainerRef}>
									<Provider store={storeTrades} >
										<FilterLineChart widthChart={this.state.widthChart} heightChart={this.state.heightChart} />
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
