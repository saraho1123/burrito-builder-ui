import React from 'react';
import App from './App.js';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { getOrders, postOrder } from '../../apiCalls';
import { sampleApiData, samplePostData, updatedSampleApiData } from '../../sampleApiData'
jest.mock('../../apiCalls')


describe('OrderForm', () => {
  it('should add a new order when inputs are completed and submit button is clicked', async () => {
    getOrders.mockResolvedValueOnce(sampleApiData)
    postOrder.mockResolvedValueOnce(samplePostData)
    getOrders.mockResolvedValueOnce(updatedSampleApiData)
    render(<App/>)
    const addOrder = jest.fn(samplePostData)
    // addOrder.mockResolvedValueOnce()
    const nameInput = screen.getByPlaceholderText('Name')
    const beanChoice = screen.getByRole('button', {
      name: /beans/i
    })
    const quesoChoice = screen.getByRole('button', {
      name: /beans/i
    })
    const submitButton = screen.getByText('Submit Order')
    const userNameChoice = 'Isaac'
    fireEvent.change(nameInput, { target: {value: userNameChoice}})
    userEvent.click(beanChoice)
    userEvent.click(quesoChoice)
    userEvent.click(submitButton)
    
    
    // getOrders.mockResolvedValueOnce([...sampleApiData.orders, {name: 'Isaac', ingredients:['beans', 'queso fresco'], id:4}])

    const isaacOrder = await waitFor(() => screen.getByText('Isaac'))

    expect(isaacOrder).toBeInTheDocument()
  })

  it('should not add a new order if name is an empty string', () => {
    getOrders.mockResolvedValueOnce(sampleApiData)
    postOrder.mockResolvedValueOnce(samplePostData)
    render(<App/>)
    const addOrder = jest.fn()
    const nameInput = screen.getByPlaceholderText('Name')
    const beanChoice = screen.getByText('beans')
    const quesoChoice = screen.getByText('queso fresco')
    const submitButton = screen.getByText('Submit Order')
    const userNameChoice = ''
    fireEvent.change(nameInput, { target: {value: userNameChoice}})
    userEvent.click(beanChoice)
    userEvent.click(quesoChoice)
    userEvent.click(submitButton)

    expect(addOrder).toHaveBeenCalledTimes(0)
  })

  it('should not add a new order if no ingredients are added', () => {
    getOrders.mockResolvedValueOnce(sampleApiData)
    postOrder.mockResolvedValueOnce(samplePostData)
    render(<App/>)
    const addOrder = jest.fn()
    const nameInput = screen.getByPlaceholderText('Name')
    const submitButton = screen.getByText('Submit Order')
    const userNameChoice = 'Sarah'
    fireEvent.change(nameInput, { target: {value: userNameChoice}})
    userEvent.click(submitButton)

    expect(addOrder).toHaveBeenCalledTimes(0)
  })

})