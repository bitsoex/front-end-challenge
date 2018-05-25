import React from 'react';
import render from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ChartComponent from './../charter/charterMain.js';
import ChartArea from './../charter/charterArea.js';
import ICONS from './../../../Utils/Icons';

import './tabs.css'


const styles = {
  headline: {
  height:30,

},
  headerTab:{
    position:"relative",
    left:418,
  },

};
const articleStyle={
  display:"block",
  width:700,

}

export default class TabsChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
      period:'',
    });
  };
  componentWillReceiveProps(nextProps){
			this.setState({ period:nextProps.period })
	}
  componentDidMount(){
    var period='3months';
    if (this.props.period==1){
      period='1month';
    }else if(this.props.period==2)
      period='3months';
    else{
      period='1year';
    }
    this.setState({period:period});
  }
  render() {
    var period='1year';
    if (this.props.period==1){
      period='1month';
    }else if(this.props.period==2)
      period='3months';
    else{
      period='1year';
    }
    return (
      <div>
      <Tabs
        style={styles.headerTab}
        value={this.state.value}
        onChange={this.handleChange}
        className="headline"
      >
        <Tab  className="headline" label="Candle"  value="a">
                <ChartComponent period={period}/>


        </Tab>
        <Tab label="Area" className="headline"   value="b">
                <ChartArea period={period}/>
        </Tab>
      </Tabs>
      </div>
    );
  }
}
