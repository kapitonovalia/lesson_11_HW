import { expect, test } from '@playwright/test'
import { LoanDTO, RiskDecisionDto } from './DTO/LoanDTO'
import { StatusCodes } from 'http-status-codes'

test('1 Сorrect solution for the Medium Risk (valid request) ', async ({ request }) => {
  const generateValidRequest = (): LoanDTO => LoanDTO.generateValidLoanDto()
  const validRequest = generateValidRequest()
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: validRequest,
    },
  )
  console.log('response status:', response.status()) // успешный код ответа
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  const riskDecision = RiskDecisionDto.serializeResponseLoan(responseBody)

  expect.soft(riskDecision.riskScore).toBeDefined()
  expect.soft(['Low Risk', 'Medium Risk', 'High Risk']).toContain(riskDecision.riskLevel)
  console.log(`The risk level: ${riskDecision.riskLevel}`)
})

test('2 Сorrect solution for the Very High Risk (valid request) ', async ({ request }) => {
  const generateLoanDtoNegativeRiskDecision = (): LoanDTO =>
    LoanDTO.generateLoanDtoNegativeDecision()
  const validRequest = generateLoanDtoNegativeRiskDecision()
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: validRequest,
    },
  )
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  const riskDecision = RiskDecisionDto.serializeResponseLoan(responseBody)

  expect.soft(riskDecision.riskScore).toBeDefined()
  expect
    .soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk'])
    .toContain(riskDecision.riskLevel)
  console.log(`The risk level: ${riskDecision.riskLevel}`)
})
test('3 Сorrect solution for the Low Risk (valid request) ', async ({ request }) => {
  const generateLoanDtoLowRisk = (): LoanDTO => LoanDTO.generateLoanDtoLowRisk()
  const validRequest = generateLoanDtoLowRisk()
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: validRequest,
    },
  )
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  const riskDecision = RiskDecisionDto.serializeResponseLoan(responseBody)

  expect.soft(riskDecision.riskScore).toBeDefined()
  expect
    .soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk'])
    .toContain(riskDecision.riskLevel)
  console.log(`The risk level: ${riskDecision.riskLevel}`)
})

test('4 Invalid input parameters', async ({ request }) => {
  const generateInvalidRequest = (): LoanDTO => LoanDTO.generateInvalidLoanDto()
  const invalidRequest = generateInvalidRequest()
  // Отправляем запрос
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: invalidRequest,
    },
  )
  console.log('response status:', response.status())
  expect(response.status()).toBe(400)
})

test('5 RequestWithoutIncome', async ({ request }) => {
  const generateRequestWithoutIncome = (): LoanDTO => LoanDTO.generateLoanDtoWithoutIncome()
  const requestWithoutIncome = generateRequestWithoutIncome()
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: requestWithoutIncome,
    },
  )
  expect(response.status()).toBe(400)
})
