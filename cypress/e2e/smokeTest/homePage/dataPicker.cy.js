/// <reference types="cypress" />

import HomePage from "../../../pageObjects/homePage";
import LogInPage from "../../../pageObjects/logInPage";
import listAssetTypes from "../../../fixtures/listAssetTypes";
import checkCurrentDate from "../../../support/utilities/verifyCurrentDate";

const logInPage = new LogInPage();
const homePage = new HomePage();
const ADMIN = Cypress.env('admin');


describe("Check Action Buttons", () => {

    beforeEach(function () {
        cy.fixture('homePage').then(data => this.data = data);
        cy.clearLocalStorage();
        cy.visit('/');
        cy.login(ADMIN.email, ADMIN.password);

    });

    // afterEach(function () {
    //     cy.logout();
    // });
    it('TC_02.17 > Verify that Search by List Button is enabled When Collaboration space is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);

        homePage.elements.getCurrentDate().invoke('val').then(data => {
            let currentDateWeb = data.split(' - ')[0];
            cy.wrap(checkCurrentDate(currentDateWeb)).should('eq', true);


        })
    })

    it.only('TC_02.17 > Verify that Search by List Button is enabled When Collaboration space is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);

        homePage.clickStartDate();

    })

    });
