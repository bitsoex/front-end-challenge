import React from 'react'

/**
 * 
 * Componente que genera el menu del header de Bitso
 * Implementacion responsiva del menu
 * 
 */
export default class MenuBitso extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuClassName : 'navbar',
        }
    }

    handleClick() {
        if (this.state.menuClassName === 'navbar') {
            this.setState({menuClassName: 'navbar responsive'});
        } else {
            this.setState({menuClassName: 'navbar'});
        }
    }

    /**
     * 
     * Genera la vista del menu
     * 
     */
    render () {
       return (
            <React.Fragment>
                <div className={this.state.menuClassName} >

                    <img src={require('../imgs/menu.png')} alt='Bitso' className='icon'
                        style={{width: '2em', cursor: 'pointer' }} onClick={()=>this.handleClick()} />
                        
                    <div className="dropdown" >
                        <button className="dropbtn">
                            Usuario
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Perfil</a>
                            <a href="#">Salir</a>
                        </div>
                    </div>
                    <a href='#'>Ayuda</a>
                    <div className="dropdown" >
                        <button className="dropbtn">
                            Exchange
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Trading</a>
                            <a href="#">Resumen</a>
                            <a href="#">Live Trades</a>
                            <a href="#">Posturas</a>
                        </div>
                    </div>
                    <a href='#'>Wallet</a>
                    <a href='#'>1 BTC = 000,000.00 MXN</a>
                </div>
            </React.Fragment>
        );
    }
}