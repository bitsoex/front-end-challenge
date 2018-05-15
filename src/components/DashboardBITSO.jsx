import React from 'react';

import {ThemeContext, themes} from './ThemeContext'

//import BookContext from './BookContext'
// import Ticker from './Ticker'
// import Traders  from './Traders'
// import GraphicExchange from './GraphicExchange'
// import OrderBooks from './OrderBooks'

import Exchange from './Exchange'
import Markets from './Markets'

class DashboardBITSO extends React.Component {

    constructor (props) {
        super(props);
        this.state = { 
            theme: themes.night
        };
    }


    render () {
        return (
            <div style={{minHeight: '95vh', backgroundColor: this.state.theme.background }}>
                <div className="headerBitso">
                    <img src={require('../imgs/bitso_logo.svg')} alt='Bitso' style={{height:'2.75em', paddingLeft: '2em'}}/>
                </div>
                <ThemeContext.Provider value={this.state.theme}>
                    <Exchange />
                    <Markets />
                </ThemeContext.Provider>
            </div>
        )
    }
}

export default DashboardBITSO
