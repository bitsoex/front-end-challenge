import React, { Component } from 'react';
import TableOrders from './OrdersTable.js'
import TableOrdersAsks from './OrdersTableAsk.js'
import {getOrders} from './../../../Utils/orderBook.js';
import './orders.css'
class Orders extends Component {
    constructor(props) {
        super(props);

        this.state={
          mxn:"mxn",
          coinSelected:"BTC"
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
      <section className="orders-section">
        <section className='trades-header'>
            <span className='trades-header-tittle'>POSTURAS DE COMPRA</span>
        </section>
        <section className='trades-list-result'>
          <TableOrders tableData={this.state.data} />
        </section>

      </section>

    );
  }
}

export default Orders;
