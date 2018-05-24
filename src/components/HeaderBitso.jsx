import React from 'react';


/** 
 * 
 * Componente que muestra parte de la cabecera de la pagina, contiene logo de Bitso y titulo
 *  
*/
export default class HeaderBitso extends React.Component {

    /**
     * 
     * Genera la vista para cabecera
     * 
     */
    render () {
        return (   
            <React.Fragment>
                <img src={require('../imgs/bitso_logo.svg')} alt='Bitso' style={{height:'2em', paddingLeft: '2em'}} />
                <span style={{position: 'absolute', height: '2em', top: '50%', marginTop: '-1.1em' ,
                    marginLeft:'1em', paddingnLeft: '2em', color: this.props.theme.blueLight, 
                    borderLeft: '1px solid ' + this.props.theme.blueLight, borderRight:'1px solid ' + this.props.theme.blueLight}} ></span>
                <span style={{position: 'absolute', height: '4em', top: '50%', marginTop: '-0.8em' , 
                    paddingLeft: '2em', color: this.props.theme.blueLight }} > {this.props.title} </span>
            </React.Fragment>
        );
        
    }
}
