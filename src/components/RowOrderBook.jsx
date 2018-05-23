import React from 'react'
import NumberFormat from 'react-number-format';

export default class RowOrderBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        };
    }
    onOut() {
        this.setState({hover: false});
    }

    onOver () {
        this.setState({hover: true});
    }

    getOrderColor () {
        if (this.props.orderSide==='bids') {
            if (this.state.hover) return '#597353';
            else return this.props.theme.bodyExchangeColor;
        } else {
            if (this.state.hover) return '#59252e';
                else return this.props.theme.bodyExchangeColor;
        }
    }

    render () {
        if (this.props.orderSide === 'bids') {
            return (
                <div style={{paddingTop: '0.125em', paddingBottom: '0.125em', fontWeight: 'lighter', backgroundColor: this.getOrderColor() }}
                    onMouseOver={()=>this.onOver()} onMouseOut={()=>this.onOut()} >

                    <span style={{ width: '3em', display: 'inline-block', textAlign: 'left', }} >
                        <span style={{width: (this.props.data.length * 100)+'%', minWidth: '5%', 
                            backgroundColor: this.props.theme.greenLight, display: 'inline-block', height: '0.75em'}}></span> 
                    </span>

                    <span style={{ width: '3em', display: 'inline-block', textAlign: 'right', color: this.state.hover?'white':this.props.theme.blueLight}}>
                        <NumberFormat value={this.props.data.sum}
                                    displayType={'text'} decimalScale={4}  />
                    </span>
                    <span style={{ width: '8em', display: 'inline-block', textAlign: 'right', color: this.state.hover?'white':this.props.theme.blueLight}}>
                        <NumberFormat value={this.props.data.amount}
                                displayType={'text'} decimalScale={8}  />
                    </span>

                    <span style={{ width: '8em', display: 'inline-block', textAlign: 'right', color: this.state.hover?'white':this.props.theme.blueLight}}>
                        <NumberFormat value={this.props.data.value}
                                    displayType={'text'} thousandSeparator={true} decimalScale={ this.props.currency==='MXN'?2:8}  />
                    </span>

                    <span style={{ width: '8em', display: 'inline-block', textAlign: 'right', color: this.state.hover?'#adff49':this.props.theme.greenLight}}>
                        <NumberFormat value={this.props.data.price}
                                    displayType={'text'} thousandSeparator={true} decimalScale={ this.props.currency==='MXN'?2:8}  />
                    </span>

                </div>
            );
        } else {
            return (
                <div style={{paddingTop: '0.125em', paddingBottom: '0.125em', fontWeight: 'lighter', backgroundColor: this.getOrderColor(), textAlign: 'left', paddingLeft: '1.5em'}}
                    onMouseOver={()=>this.onOver()} onMouseOut={()=>this.onOut()} >

                    <span style={{ width: '8em', display: 'inline-block', textAlign: 'left', color: this.state.hover?'#cc4458':this.props.theme.redLight}}>
                        <NumberFormat value={this.props.data.price}
                                    displayType={'text'} thousandSeparator={true} decimalScale={ this.props.currency==='MXN'?2:8}  />
                    </span>

                    <span style={{ width: '8em', display: 'inline-block', textAlign: 'left', color: this.state.hover?'white':this.props.theme.blueLight}}>
                        <NumberFormat value={this.props.data.value}
                                    displayType={'text'} thousandSeparator={true} decimalScale={ this.props.currency==='MXN'?2:8}  />
                    </span>

                    <span style={{ width: '8em', display: 'inline-block', textAlign: 'left', color: this.state.hover?'white':this.props.theme.blueLight}}>
                        <NumberFormat value={this.props.data.amount}
                                displayType={'text'} decimalScale={8}  />
                    </span>

                    <span style={{ width: '3em', display: 'inline-block', textAlign: 'left', color: this.state.hover?'white':this.props.theme.blueLight}}>
                        <NumberFormat value={this.props.data.sum}
                                    displayType={'text'} decimalScale={4}  />
                    </span>

                    <span style={{ width: '3em', display: 'inline-block', textAlign: 'right'}} >
                        <span style={{width: (this.props.data.length * 90)+'%', minWidth: '5%', 
                            backgroundColor: this.props.theme.redLight, display: 'inline-block', height: '0.75em'}}></span> 
                    </span>
                    
                    

                    

                    

                </div>
            );
        }   
    }

}