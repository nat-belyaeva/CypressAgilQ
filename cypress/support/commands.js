// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import clickIfExist from './utilities/clickIfExist'

Cypress.Commands.add('login', (email, password) => {
  const emailInput = '[name="loginId"]'
  const passwordInput = '[name="password"]'
  const loginBtn = '.login-btn'

  cy.get(emailInput).type(email, { force: true })
  cy.get(passwordInput).type(password, { force: true })
  cy.get(loginBtn).should('be.visible').click({ force: true })
})

Cypress.Commands.add('logout', () => {
  cy.get('.dropdown__trigger').should('be.visible').click({ force: true })
  cy.get('.toolbar-logout-link a ').click({ force: true })
})

Cypress.Commands.add('loginAs', (email, password) => {
  cy.intercept('/auth/logout/user').as('logout')
  cy.intercept('/aq-api/users/profiles/*').as('sysIdUser')
  cy.clearLocalStorage()

  cy.visit('/')
  cy.wait('@logout')

  cy.login(email, password)
  cy.wait('@sysIdUser')

  //if splash page is displayed
  clickIfExist('.splash-popup .button-primary:nth-child(1)')

  cy.intercept('/aq-api/reservations/events').as('reservationCreated')
  cy.intercept('/aq-api/reservations/events/*').as('reservationConfirmationNumber')
  cy.intercept('aq-api/locations').as('locations')
  cy.intercept('/aq-api/locations/venues/*').as('currentLocation')
  cy.intercept('/aq-api/locations/venues/*').as('getLocation')
  cy.intercept('/aq-api/reservations/cost-estimates*').as('cost-estimates')
  cy.intercept('/aq-api/availability/workspaces*').as('workspaces')
})

