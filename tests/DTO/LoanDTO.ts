export class LoanDTO {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static generateValidLoanDto(): LoanDTO {
    return new LoanDTO(50000, 20000, 30, true, 10000, 12)
  }
  static generateInvalidLoanDto(): LoanDTO {
    return new LoanDTO(0, -1000, 15, false, 0, 0)
  }
  static generateLoanDtoWithoutIncome(): LoanDTO {
    return new LoanDTO(0, 1000, 25, true, 5000, 12)
  }
  static generateLoanDtoNegativeDecision(): LoanDTO {
    return new LoanDTO(800, 1000, 25, true, 5000, 12)
  }
  static generateLoanDtoLowRisk(): LoanDTO {
    return new LoanDTO(800, 1000, 25, true, 5000, 12)
  }
}
export class RiskDecisionDto {
  riskScore: number
  riskLevel: string
  riskPeriods: number[]
  applicationId: string
  riskDecision: string

  constructor(
    riskScore: number,
    riskLevel: string,
    riskPeriods: number[],
    applicationId: string,
    riskDecision: string,
  ) {
    this.riskScore = riskScore
    this.riskLevel = riskLevel
    this.riskPeriods = riskPeriods
    this.applicationId = applicationId
    this.riskDecision = riskDecision
  }

  static serializeResponseLoan(json: any): RiskDecisionDto {
    return new RiskDecisionDto(
      json.riskScore,
      json.riskLevel,
      json.riskPeriods,
      json.applicationId,
      json.riskDecision,
    )
  }
}
