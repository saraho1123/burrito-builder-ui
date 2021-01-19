import React from 'react';
import OrderForm from './OrderForm.js';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';


describe('OrderForm', () => {
  const mockedAddOrder = jest.fn()
  let nameInput
  let beanChoice
  let quesoChoice
  let submitButton

  beforeEach(() => {
    render(
      <OrderForm 
        addOrder={mockedAddOrder}
      />
    )
    nameInput = screen.getByPlaceholderText('Name')
    beanChoice = screen.getByText('beans')
    quesoChoice = screen.getByText('queso fresco')
    submitButton = screen.getByText('Submit Order')
  })
  it('should display the order form', () => {
    expect(nameInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('should display ingredient choices when ingredients are clicked', () => {
    userEvent.click(beanChoice)
    userEvent.click(quesoChoice)

    const orderArrayDisplay = screen.getByText(/order: beans, queso fresco/i)

    expect(orderArrayDisplay).toBeInTheDocument()
  })

  it('should call addOrder on click of submit button if fields correctly completed', () => {
    const userNameChoice = 'Isaac'
    fireEvent.change(nameInput, { target: {value: userNameChoice}})
    userEvent.click(beanChoice)
    userEvent.click(quesoChoice)
    userEvent.click(submitButton)

    const expectedNewOrder = {
      'name': 'Isaac',
      'ingredients': ['beans', 'queso fresco']
    }
    
    expect(mockedAddOrder).toHaveBeenCalledTimes(1)
    expect(mockedAddOrder).toHaveBeenCalledWith(expectedNewOrder)
  })
})