import React, { Component } from 'react';
import { render } from 'react-dom';
import { timeParse } from "d3-time-format";
import { TypeChooser } from "react-stockcharts/lib/helper";
import Lists from './Lists/Lists';
import Graphic from './Graphic/Graphic';
import './Posturas.css';

class Posturas extends Component {
    constructor(props) {
        super(props);
        
        this.state={
          array_post:this.props.array_post
        }
    
      }

      componentWillReceiveProps(nextProps){
        this.setState({array_post:nextProps.array_post})
      }

  render() {
    return (
      <section className="body-section">
        	<TypeChooser>
				{type => <Graphic type={type} data={this.state.array_post} />}
			</TypeChooser>
        <Lists array_post={this.state.array_post}/>

      </section>
    );
  }
}

export default Posturas;
