import React from 'react'

/**
 * 
 * Componente que genera el menu del header de bitso
 * 
 * 
 */
export default class MenuBitso extends React.Component {

    /**
     * Genera el menu para mobiles
     */
    menuMobile () {
        return <div>Mobile</div>
    }

    /**
     * Genera el menu para no mobiles
     */
    menuNavigator () {
        return (
            <React.Fragment>
                <div className='navbar' >
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

    /**
     * 
     * Genera la vista del menu
     * 
     */
    render () {
        if (this.props.mobile) {
            return this.menuMobile();   
        } else {
            return this.menuNavigator();
        }
    }
}