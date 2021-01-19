import React from 'react';
import OrderForm from './OrderForm.js';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';


describe('OrderForm', () => {
  it('should display the order form', () => {
    const mockedAddOrder = jest.fn()
    render(
      <OrderForm 
        addOrder={mockedAddOrder}
      />
    )

    const nameInput = screen.getByPlaceholderText('Name')
    const submitButton = screen.getByText('Submit Order')

    expect(nameInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('should display ingredient choices when ingredients are clicked', () => {
    const mockedAddOrder = jest.fn()
    render(
      <OrderForm 
        addOrder={mockedAddOrder}
      />
    )

    const beanChoice = screen.getByRole('button', {
      name: /beans/i
    })
    fireEvent.click(beanChoice)

    const quesoChoice = screen.getByRole('button', {
      name: /queso fresco/i
    })
    fireEvent.click(quesoChoice)

    const orderArrayDisplay = screen.getByText(/order: beans, queso fresco/i)

    expect(orderArrayDisplay).toBeInTheDocument()
  })
})