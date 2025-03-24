import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('delete order with correct a valid order ID should receive code 204', async ({ request }) => {
  const requestHeader = {
    api_key: '1234567890123456',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/8', {
    headers: requestHeader,
  })
  console.log('response status:', await response.status())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('delete order with incorrect order ID should receive code 400', async ({ request }) => {
  const requestHeader = {
    api_key: '1234567890123456',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/g', {
    headers: requestHeader,
  })
  console.log('response status:', await response.status())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('delete order with empty api_key should receive code 401', async ({ request }) => {
  const requestHeader = {
    api_key: '',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/4', {
    headers: requestHeader,
  })
  console.log('response status:', await response.status())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(401)
})
