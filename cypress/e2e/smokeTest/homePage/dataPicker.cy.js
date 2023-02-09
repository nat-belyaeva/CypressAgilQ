/// <reference types="cypress" />

import HomePage from "../../../pageObjects/homePage";
import LogInPage from "../../../pageObjects/logInPage";
import listAssetTypes from "../../../fixtures/listAssetTypes";



const logInPage = new LogInPage();
const homePage = new HomePage();
const ADMIN = Cypress.env('admin');


describe("Check Action Buttons", () => {

    beforeEach(function () {
        cy.fixture('homePage').then(data => this.data = data);
        //cy.clearLocalStorage();
        cy.visit('/');
        cy.login(ADMIN.email, ADMIN.password);

    });

    // afterEach(function () {
    //     cy.logout();
    // });
    it('TC.02_52 > Verify that Current Day is displayed in When Widget', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);

        homePage.elements.getCurrentDate().invoke('val').then(data => {
            let currentDateWeb = data.split(' - ')[0];
            homePage.checkCurrentDate(currentDateWeb)
        });
    });

    it('TC_02.53 > Verify that User is able to select Date in Future in When Widget', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);

        homePage.clickStartDate();
        homePage.selectAnotherDay(25);
    });
});
