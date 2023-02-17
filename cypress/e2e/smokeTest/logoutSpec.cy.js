/// <reference types="cypress" />

import LogInPage from '../../pageObjects/logInPage'

const ADMIN = Cypress.env('admin')
const logInPage = new LogInPage()

describe('LogIn test suit', () => {

  beforeEach(function () {
    cy.loginAs(ADMIN.email, ADMIN.password)
    cy.fixture('homePage').then(data => this.data = data)
  })

  it('TC_03.25 Verify that User is able to log out', () => {
    cy.logout()
    logInPage.getLogInBtn().should('be.visible')
  })
})
