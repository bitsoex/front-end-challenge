import React, { Component } from 'react';

import './Lists.css';

class Lists extends Component {
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


      </section>
    );
  }
}

export default Lists;
