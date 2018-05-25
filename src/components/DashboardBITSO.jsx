import React from 'react';

import {isMobile} from 'react-device-detect';

import {ThemeContext, themes} from './ThemeContext'
import HeaderBitso from './HeaderBitso'
import MenuBitso from './MenuBitso'
import Exchange from './Exchange'


/**
 * 
 * Componente principal, provee del contexto ThemeContext para el cambio de tema (night, day) que se propaga hacia los otros componentes hijos
 *  
 */
class DashboardBITSO extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            //tema default night
            theme: themes.night,
            width: window.innerWidth,
        };
    }

    /**
     * Actualiza la dimension de la pagina para obtener detalles de responsividad
     * 
     */
    updateDimensions () {
        //this.setState({width: window.innerWidth});
        this.setState({width: Math.min(document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth, 
                document.documentElement.clientWidth)});
    }

    /**
     *  
     * Inicia el componente 
     * 
     * */
    componentWillMount() {
        this.updateDimensions();
    }

    /**
     * 
     * Si es necesario desmontar el componente, elimina el listener 
     * 
     */
    componentWillUnmount () {
        window.removeEventListener('resize', this.updateDimensions.bind(this));
    }

    /**
     * 
     * Al iniciar el componente se agrega un listener para monitorear el tamaño de la pagina en pantalla
     * 
     */
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }

    /**
     * 
     * Función que da soporte al cambio de tema night o day
     * 
     */
    changeTheme (e) {
        if (this.state.theme === themes.night) 
            this.setState({theme: themes.day})
        else
            this.setState({theme: themes.night})
    }

    /**
     * 
     * Genera la vista principal. 
     * 
     * A) Verifica si el dispositivo es mobile
     * B) Cabecera de BITSO
     * C) Componente Exchange
     * 
     */
    render () {
        document.body.style.backgroundColor = this.state.theme.background;
        const widthScreen = this.state.width;
        const viewMobile = isMobile || this.state.width < 825;

        return (
            <div style={{minHeight: '95vh', backgroundColor: this.state.theme.background }}>
                <div className="headerBitso" style={{ position: 'relative'}}>
                    <HeaderBitso title='EXCHANGE' theme={this.state.theme} />
                    <MenuBitso theme={this.state.theme} mobile={viewMobile} />
                    <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-1em' , paddingLeft: '2em', right: '0em'}} >
                        <input type='image' src={require('../imgs/' + this.state.theme.themeImage)} onClick={this.changeTheme.bind(this)} alt='theme' />
                    </span>
                </div>
                <ThemeContext.Provider value={this.state.theme}>
                    <Exchange mobile={viewMobile} widthScreen={widthScreen} />
                </ThemeContext.Provider>
            </div>
        );
    }
}

export default DashboardBITSO
