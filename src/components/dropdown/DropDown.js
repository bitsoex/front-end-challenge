import React, {Component} from "react"

class DropDown extends React.Component {
	
	constructor(props){
		super(props);
		this.state ={
			down: false
		}
	}
	
	toggleButton(){
		console.log("toggle buton");
		this.setState({
			down: !this.state.down
		})
	}
	
	menuItems(items){
		const listItems = items.map(({action, value, label, previousValue, className}, index)=>{
			return(
				<li key={index} onClick={e=>action(value, previousValue)} className={className ? className : ""}>{label}</li>
			);
		})
		return(
			<ul className="dropdown-body">
				{listItems}
			</ul>
		);
	}
	
	render(){
		const {	children, items} = this.props;
		
		return(
			<div  onClick={this.toggleButton.bind(this)} className={"dropdown " + (this.state.down ? 'openmenu' : '')}>
				{children}
				{this.menuItems(items)}
			</div>
		);
	}
}

export default DropDown