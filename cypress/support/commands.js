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

Cypress.Commands.add('login', (email, password) => {
    const emailInput = '[name="loginId"]';
    const passwordInput = '[name="password"]';
    const loginBtn = '.login-btn';

    cy.get(emailInput).type(email, {force:true});
    cy.get(passwordInput).type(password, {force:true});

    cy.get(loginBtn).click({force:true});

});

Cypress.Commands.add('logout', () => {
    cy.get('.dropdown__trigger').click({force:true});
    cy.get('.toolbar-logout-link a ').click({force:true});
})