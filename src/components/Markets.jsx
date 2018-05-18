import React from 'react'

import GraphicMarket from './GraphicMarket'

class Markets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bgColor : props.theme.headerMarkets,
            translate: 0,
            duration: 1,
            display: 'inline-block',
            currentBookMarket: 'btc_mxn',
        }
        this.panelMarket = React.createRef();
    }



    showHide () {
        this.setState({ display: this.state.display==='none'?'inline-block':'none' });
    }

    mouseLeave () {
        this.setState({bgColor: this.props.theme.headerMarkets})
    }

    mouseEnter () {
        this.setState({bgColor: this.props.theme.headerMarketsHover})
    }

    graphics () {
        let graphs = [];
        for (let i = 0; i < this.props.books.length; i++) {
            graphs.push(<GraphicMarket book={this.props.books[i].book} theme={this.props.theme} activeGraphic={true} key={i} />);
        }
        return graphs;
    }

    render () {
        return (
            <div id="markets" ref={this.panelMarket} style={{
                position: 'absolute',
                right: this.state.display==='none'? '0':'273' +'px',
                top: '0px',
                border: '4px',
                height: '80vh',
                backgroundColor: this.props.theme.bodyMarkets,
            }}>
                
                <div style={{position: 'relative', }} onMouseLeave={this.mouseLeave.bind(this)} onMouseEnter={this.mouseEnter.bind(this)} onClick={this.showHide.bind(this)} >
                    <h1 style={{ transform: 'rotate(90deg)',
                        msTransform: 'rotate(90deg)', 
                        WebkitTransform: 'rotate(90deg)', 
                        position: 'absolute',
                        left: '-1.6em',
                        top: '4em', 
                        cursor: 'pointer',
                        mixBlendMode : 'overlay',
                        color: '#FFFFFF', 

                    }} >
                        MERCADOS
                    </h1>
                </div>

                <div style={{ width: '30px', height: '100%', display: 'inline-block', 
                            textAlign: 'center', cursor: 'pointer', backgroundColor: this.state.bgColor,
                        }} className='headerVerticalMarket' onMouseLeave={this.mouseLeave.bind(this)} onMouseEnter={this.mouseEnter.bind(this)} onClick={this.showHide.bind(this)} >
                    <img src={require('../imgs/icon_dropdown.svg')}  alt='dd' 
                        style={{ width: '1em', height: '1em', paddingTop: '1em', transform: 'rotate(-90deg)', right: '0.4em', position:'relative' }} />
                </div>

                <div style={{ display: this.state.display , height: '100%', position:'absolute', 
                    width: '270px', backgroundColor: this.props.theme.bodyExchangeColor, paddingLeft: '0.25em' }}>

                    <div style={{backgroundColor: this.props.theme.headerMarketTitle, paddingLeft: '1em', 
                            height: '3em', }}>
                        <h1 style={{ margin: '0px', paddingTop: '0.5em' }}>MERCADOS 15 DÍAS</h1>
                    </div>

                    { this.graphics() }
                </div>
            </div>
        );
    }
}

export default Markets;