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
		const listItems = items.map(({action, value, label}, index)=>{
			return(
				<li key={index} onClick={e=>action(value)}>{label}</li>
			);
		})
		return(
			<ul className="dropdown-body">
				{listItems}
			</ul>
		);
	}
	
	render(){
		const {down, children, items} = this.props;
		
		/*const boundChildren = React.Children.map(children, child => {
			if (child.type === DropdownTrigger) {
				const originalOnClick = child.props.onClick;
				child = cloneElement(child, {
					ref: 'trigger',
					onClick: (event) => {
						if (!disabled) {
							this._onToggleClick(event);
							if (originalOnClick) {
								originalOnClick.apply(child, arguments);
							}
						}
					}
				});
			} else if (child.type === DropdownContent && removeElement && !active) {
				child = null;
			}
			return child;
		});*/
		
		return(
			<div  onClick={this.toggleButton.bind(this)} className={"dropdown " + (this.state.down ? 'openmenu' : '')}>
				{children}
				{this.menuItems(items)}
			</div>
		);
	}
}

export default DropDown