import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('update order with correct request should receive code 200 ', async ({ request }) => {
  const requestHeader = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'Aliia',
    customerPhone: '12345467',
    comment: 'string',
    id: 7,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/7', {
    headers: requestHeader,
    data: requestBody,
  })
  //console.log('response body:', await response.json());
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('update order with empty api_key should receive code 401 ', async ({ request }) => {
  const requestHeader = {
    api_key: '',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'Aliia',
    customerPhone: '12345467',
    comment: 'string',
    id: 7,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/7', {
    headers: requestHeader,
    data: requestBody,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('update order with incorrect id should receive code 400 ', async ({ request }) => {
  const requestHeader = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'Aliia',
    customerPhone: '12345467',
    comment: 'string',
    id: 'h',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/h', {
    headers: requestHeader,
    data: requestBody,
  })
  console.log('response status:', response.status())
  console.log('response headers: ', response.headers())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
