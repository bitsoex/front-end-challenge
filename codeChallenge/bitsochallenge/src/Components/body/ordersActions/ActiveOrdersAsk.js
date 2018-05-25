import React, { Component } from 'react';
import TableOrders from './OrdersTable.js'
import TableOrdersAsks from './OrdersTableAsk.js'
import {getOrders} from './../../../Utils/orderBook.js';
import './orders.css'
class OrdersAsk extends Component {
    constructor(props) {
        super(props);

        this.state={
          mxn:"mxn",
          coinSelected:"BTC"
        }


      }
      componentWillMount(){
        this.delaySetter();

      }

      componentDidMount() {
        this.getUpdateOrders();
    	}
    	componentWillReceiveProps(nextProps){
        getOrders(nextProps.book).then(data => {
    			this.setState({ data })
    		})
    	}
      delaySetter(){
        setTimeout(function() { this.getUpdateOrders()}.bind(this),5000);
      }
      getUpdateOrders(){
    		getOrders(this.props.book).then(data => {
    			this.setState({ data })
    		})
        this.delaySetter();
    	}


  render() {
    if (this.state == null) {
			return <div>Loading...</div>
		}
    return (
      <section className="orders-section left">
        <section className='trades-header'>
            <span className='trades-header-tittle'>POSTURAS DE VENTA</span>
        </section>
        <section className='trades-list-result'>
          <TableOrdersAsks tableData={this.state.data} />
        </section>

      </section>

    );
  }
}

export default OrdersAsk;
