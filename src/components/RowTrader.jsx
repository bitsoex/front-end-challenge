import React from 'react';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

class RowTrader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        }
    }

    onOut() {
        this.setState({hover: false});
    }

    onOver () {
        this.setState({hover: true});
    }

    getPriceColor () {
        if (this.props.makerSide==='buy') {
            if (this.state.hover) return '#adff49';
            else return this.props.theme.greenDark;
        } else {
            if (this.state.hover) return '#ff8179';
                else return this.props.theme.redDark;
        }
    }

    render () {
        
        return (
            <div className='bodyTableTraders' 
                    style={{ fontWeight: 'lighter' , paddingTop: '4px', paddingBottom: '4px', 
                        backgroundColor: this.state.hover?this.props.theme.headerMarketTitle:this.props.theme.bodyExchangeColor, 
                        }} 
                    onMouseOver={()=>this.onOver()} onMouseOut={()=>this.onOut()} > 
                <div style={{display:'inline-block', width: '3em', color: this.state.hover?'white':this.props.theme.grayDark}}>
                    <Moment format="HH:mm:ss">{this.props.hour}</Moment>
                </div>
                <div style={{display:'inline-block', width: '8em', textAlign: 'right', 
                        color: this.getPriceColor() , }}>
                    <NumberFormat value={this.props.price}
                                displayType={'text'} thousandSeparator={true} decimalScale={ this.props.currency==='MXN'?2:8}  />
                </div>
                <div style={{display:'inline-block', width: '8em', textAlign: 'right', color: this.state.hover?'white':this.props.theme.blueLight}}>
                    {this.props.amount}
                </div>
            </div>
        );
    }
}

export default RowTrader;