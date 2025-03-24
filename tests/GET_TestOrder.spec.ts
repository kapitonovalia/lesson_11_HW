import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('get order with correct request should receive code 200', async ({ request }) => {
  const requestParameters = {
    username: 'Aliia',
    password: '9876543210',
  }
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/', {
    params: requestParameters,
  })
  console.log('response body:', await response.json())
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('get order with incorrect request (skip password) and should receive code 500 ', async ({
  request,
}) => {
  const requestParameters = {
    username: 'Aliia',
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/', {
    params: requestParameters,
  })
  console.log('response headers:', response.headers())
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('get order with correct request and wrong url should receive code 401 ', async ({
  request,
}) => {
  const requestParameters = {
    username: 'Aliia',
    password: '9876543210',
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-lol-orders/', {
    params: requestParameters,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(401)
})
