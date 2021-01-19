import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super()
    this.state = {
      orders: [],
    }
  }

  componentDidMount() {
    getOrders()
      .catch(err => console.error('Error fetching:', err));
  }

  addOrder = (orderInfo) => {
    this.setState({orders: [...this.state.orders, orderInfo]})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders} addOrder={this.addOrder}/>
      </main>
    );
  }
}


export default App;
