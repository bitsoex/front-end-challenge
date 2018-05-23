import React from 'react'
import MarketTable from './MarketTable'
import collapseImg from '../assets/images/1x/icon_dropdown.png'
import { Provider } from 'react-redux'
import FilterMarketTickers from '../containers/FilterMarketTickers'
var ReactDOM = require('react-dom')



export default class FloatingMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			className: ""
		};
	}
	componentDidMount() {
		this.myMenu = ReactDOM.findDOMNode( this );
		//console.log("myMenu", this.myMenu);
	}
	
	contains(cls){
		return this.state.className.split(" ").filter(cls_in=> cls_in == cls).length != 0
	}
	
	add(cls){
		this.setState({
			className: this.state.className + " " + cls
		});
	}
	
	remove(cls){
		this.setState({
			className: this.state.className.split(" ").map(cls_in=>{ return cls_in == cls ? "" : cls_in}).filter(a=>a).join(" ")
		});
	}
	
	toggleClassMenu() {
		this.add("menu--animatable");   
		if(!this.contains("menu--visible")) {
			this.add("menu--visible");
		} else {
			this.remove('menu--visible');       
		}   
	}
	
	OnTransitionEnd() {
		this.remove("menu--animatable");
	}
	
	render(){
		const {className, store} = this.props;
		const loadTickers = ()=>{
			store.dispatch({
				type: 'LOAD_ALL_TICKERS'
			});
		} 
		//console.log("Render.floatingMenu", this.props);
		return (
			<div className = {className + ' ' + this.state.className} onTransitionEnd={this.OnTransitionEnd.bind(this)} onClick={_=>{this.toggleClassMenu(); loadTickers();}} >
				<div className="app-menu">
					<ul className="expand">
						<li className="header">
							<img src={collapseImg} /><div className="rotateText">MERCADOS</div>
						</li>
						<li className="body">
							<Provider store={store}>
								<FilterMarketTickers />
							</Provider>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
/*
FloatingMenu.defaultProps = {
	store: null,
	laodTicker: ()=>{}
}*/