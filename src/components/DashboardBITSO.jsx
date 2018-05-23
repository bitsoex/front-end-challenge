import React from 'react';

import {ThemeContext, themes} from './ThemeContext'
import {isMobile} from 'react-device-detect';



import Exchange from './Exchange'


class DashboardBITSO extends React.Component {

    constructor (props) {
        super(props);
        this.state = { 
            theme: themes.night,
            width: window.innerWidth,
        };
    }

    updateDimensions () {
        //this.setState({width: window.innerWidth});
        this.setState({width: Math.min(document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth, 
                document.documentElement.clientWidth)});
        // console.info ('width:' + this.state.width + isMobile);
        // console.info (document.body.scrollWidth);
        // console.info (document.documentElement.scrollWidth);
        // console.info (document.body.offsetWidth);
        // console.info (document.documentElement.offsetWidth);
        // console.info (document.documentElement.clientWidth);
  
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.updateDimensions.bind(this));
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }

    changeTheme (e) {
        if (this.state.theme === themes.night) 
            this.setState({theme: themes.day})
        else
            this.setState({theme: themes.night})
    }

    render () {
        //console.info ('width:' + this.state.width + isMobile);
        const widthScreen = this.state.width;
        const viewMobile = isMobile || this.state.width < 825;

        if (viewMobile) {
            return (
                <div style={{minHeight: '95vh', backgroundColor: this.state.theme.background }}>
                    <div className="headerBitso" style={{ position: 'relative'}}>
                        <img src={require('../imgs/bitso_logo.svg')} alt='Bitso' style={{height:'2em', paddingLeft: '2em'}} />
                        
                        <span style={{position: 'absolute', height: '2em', top: '50%', marginTop: '-1.1em' ,
                            marginLeft:'1em', paddingnLeft: '2em', color: this.state.theme.blueLight, 
                            borderLeft: '1px solid ' + this.state.theme.blueLight, borderRight:'1px solid ' + this.state.theme.blueLight}} ></span>

                        <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-0.8em' , 
                            paddingLeft: '2em', color: this.state.theme.blueLight }} > EXCHANGE </span>

                        <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-1em' , paddingLeft: '2em', right: '0em'}} >
                         <input type='image' src={require('../imgs/' + this.state.theme.themeImage)} onClick={this.changeTheme.bind(this)} alt='theme' />
                        </span>
                    </div>

                    <ThemeContext.Provider value={this.state.theme}>
                        <Exchange mobile={viewMobile} widthScreen={widthScreen} />
                    </ThemeContext.Provider>
                    
                </div>
            );
        } else {
            return (
                <div style={{minHeight: '100vh', backgroundColor: this.state.theme.background }}>
                    <div className="headerBitso" style={{ position: 'relative'}}>
                        <img src={require('../imgs/bitso_logo.svg')} alt='Bitso' style={{height:'2em', paddingLeft: '2em'}} />

                        <span style={{position: 'absolute', height: '2em', top: '50%', marginTop: '-1.1em' ,
                            marginLeft:'1em', paddingnLeft: '2em', color: this.state.theme.blueLight, 
                            borderLeft: '1px solid ' + this.state.theme.blueLight, borderRight:'1px solid ' + this.state.theme.blueLight}} ></span>

                        <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-0.8em' , 
                            paddingLeft: '2em', color: this.state.theme.blueLight }} > EXCHANGE </span>

                    
                            <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-0.8em' , paddingLeft: '2em', right: '30em', color: this.state.theme.blueLight}} >
                                1 BTC = 000,000.00 MXN
                            </span>

                            <span style={{position: 'absolute', height: '2em', top: '50%', marginTop: '-1.1em' , right: '28.5em', 
                                marginLeft:'1em', paddingnLeft: '2em', 
                                borderLeft: '1px solid #cccccc', borderRight:'1px solid #cccccc'}} ></span>

                            <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-0.8em' , paddingLeft: '2em', right: '25em', color: this.state.theme.blueLight}} >
                                Wallet
                            </span>

                            <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-0.8em' , paddingLeft: '2em', right: '19em', color: this.state.theme.blueLight}} >
                                Exchange
                            </span>

                            <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-0.8em' , paddingLeft: '2em', right: '15em', color: this.state.theme.blueLight}} >
                                Ayuda
                            </span>

                            <span style={{position: 'absolute', marginTop: '-0.7em', right: '9em', }} >
                                <img src={require('../imgs/usuario.png')} alt='Usuario' style={{height: '75%', width: '75%'}} />
                            </span>

                            <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-0.8em' , paddingLeft: '2em', right: '6em', color: this.state.theme.blueLight}} >
                                Usuario
                            </span>
                            
                            <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-1em' , paddingLeft: '2em', right: '0em'}} >
                                <input type='image' src={require('../imgs/' + this.state.theme.themeImage)} onClick={this.changeTheme.bind(this)} alt='theme' />
                            </span>
                    </div>

                    <ThemeContext.Provider value={this.state.theme}>
                        <Exchange mobile={viewMobile}  widthScreen={widthScreen} />
                    </ThemeContext.Provider>
                </div>
            )
        }
    }
}

export default DashboardBITSO
