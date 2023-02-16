/// <reference types="cypress" />

import HomePage from "../../../pageObjects/homePage";
import LogInPage from "../../../pageObjects/logInPage";
import listAssetTypes from "../../../fixtures/listAssetTypes";
import clickIfExist from "../../../support/utilities/clickIfExist";
import getClick from "../../../support/utilities/getClick";


const logInPage = new LogInPage();
const homePage = new HomePage();
const ADMIN = Cypress.env('admin');


describe("Check Date & TIme Picker", () => {

    beforeEach(function () {
        cy.intercept('/auth/logout/user').as('logout');
        cy.intercept('/aq-api/users/profiles/*').as('sysIdUser');
        cy.intercept('/aq-api/locations/venues/*').as('getLocation');

        cy.fixture('homePage').then(data => this.data = data);
        cy.clearLocalStorage();

        cy.visit('/');
        cy.wait('@logout');

        cy.login(ADMIN.email, ADMIN.password);
        cy.wait('@sysIdUser');

        //if splash page is displayed
       clickIfExist('.splash-popup .button-primary:nth-child(1)');

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
        cy.wait('@getLocation')
        homePage.clickStartDate(); //sts is not find this element
        //getClick('.start-end-date-field', '.when-popup');
        homePage.selectAnotherDay(25);
    });
});
