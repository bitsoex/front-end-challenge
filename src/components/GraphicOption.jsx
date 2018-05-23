import React from 'react';

export default class GraphicOption extends React.Component {

    handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
    }
    
	handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
    }
    
	handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
    }

    render () {
        return (
        <div className={this.props.className} onMouseDown={(e)=>this.handleMouseDown(e)} 
                onMouseEnter={(e)=>this.handleMouseEnter(e)} onMouseMove={(e)=>this.handleMouseMove(e)} >
            <img src={this.props.option.image}  alt='dd' style={{width: '2em'}}/>
            {this.props.children}
        </div>
        );
    }
}
