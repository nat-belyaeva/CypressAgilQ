/// <reference types="cypress" />

import LogInPage from "../../pageObjects/logInPage";
import clickIfExist from "../../support/utilities/clickIfExist";

const ADMIN = Cypress.env('admin');
const logInPage = new LogInPage();

describe ('LogIn test suit', () => {

    beforeEach(function () {
        cy.fixture('logInPage').then(data => this.data = data);
        cy.clearLocalStorage()
        cy.clearCookies();
        cy.visit('/', {timeout:90000});
        cy.login(ADMIN.email, ADMIN.password);

        //if splash page is displayed
        clickIfExist('.splash-popup .button-primary:nth-child(1)');
    });

    it('TC_03.25 Verify that User is able to log out', () => {
         cy.logout();
         logInPage.elements.getLogInBtn().should('be.visible');

    });

});
