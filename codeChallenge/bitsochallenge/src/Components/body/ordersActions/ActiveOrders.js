import React, { Component } from 'react';
import TableOrders from './OrdersTable.js'
import {getOrders} from './../../../Utils/orderBook.js';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state={

        }

      }
      componentWillMount(){
        getOrders(this.props.book).then(data => {
          this.setState({ data })
    		})
      }
      componentDidMount() {
        getOrders(this.props.book).then(data => {
          this.setState({ data })
    		})
    	}
    	componentWillReceiveProps(nextProps){
    		getOrders(nextProps.book).then(data => {
    			this.setState({ data })
    		})
    	}



  render() {
    if (this.state == null) {
			return <div>Loading...</div>
		}
    return (
      <section className="trades-section">
        <section className='trades-header'>
            <p className='trades-header-tittle'>POSTURAS DE COMPRA</p>
            <section className='trades-header-column'>
            <p className='column'><span className='coin'>{this.state.mxn}</span> Monto</p>
            <p className='column'></p>
            <p className='column'><span className='coin'>{this.state.coinSelected}</span> Precio</p>
            </section>
        </section>
        <section className='trades-list-result'>
          <TableOrders tableData={this.state.data} />
        </section>
      </section>
    );
  }
}

export default Orders;
