import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    // this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value })
  }

  handleIngredientChange = e => {
    e.preventDefault()
    let ingredient = e.target.name
    this.setState({ingredients: [...this.state.ingredients, ingredient]})
  }

  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      'name': this.state.name,
      'ingredients': this.state.ingredients,
    }
    if(newOrder.name === ''  || newOrder.ingredients.length < 1) {
      alert("Please inter a name AND an ingredient for your order")
    } else {
      this.props.addOrder(newOrder)
      this.clearInputs();
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
