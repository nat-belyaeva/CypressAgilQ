/// <reference types="cypress" />

import HomePage from "../../../pageObjects/homePage";
import LogInPage from "../../../pageObjects/logInPage";
import listAssetTypes from "../../../fixtures/listAssetTypes";
import clickIfExist from "../../../support/utilities/clickIfExist";

const logInPage = new LogInPage();
const homePage = new HomePage();
const ADMIN = Cypress.env('admin');

describe("Search Widget Suite", () => {

    beforeEach(function () {
        cy.intercept('/auth/logout/user').as('logout');
        cy.intercept('/aq-api/users/profiles/*').as('sysIdUser');

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


    it("TC_02.06 > Verify that Reservation is set up by default in the Reservation/Event dropdown", function () {

        homePage.elements.getWhatDropdown().should('have.class', this.data.defaultClass);
        homePage.elements.getDefaultValue().should('have.value', this.data.isReservation);
    });

    it('TC_02.07 > Verify that User is able to select Event in the  Reservation/Event dropdown', function () {
        homePage.selectEventOfWhatDropdown();
        homePage.clickCancelBtnWherePopUp();
        homePage.elements.getWhatInput().should('have.value', this.data.isEvent);
    });

    it('TC_02.08 > Verify that User is able to select a location from Location Dropdown', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);

    });


    it('TC_02.09 > Verify that User is able to cross selected location', function () {
        homePage.deleteLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().then(el => expect(el.val()).to.eql('Where'));

    });

    listAssetTypes.forEach((el, index) => {
        let number = 10;
        it(`TC_02.${number + index} > Verify Asset ${el} is selected by Admin User`, function () {
            homePage.checkElementOfAssetTypes(el, index)
        });
    });
});
























