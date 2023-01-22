/// <reference types="cypress" />

import HomePage from "../../pageObjects/homePage";
import LogInPage from "../../pageObjects/logInPage";
import listAssetTypes from "../../fixtures/listAssetTypes";

const logInPage = new LogInPage();
const homePage = new HomePage();
const ADMIN = Cypress.env('admin');

describe("Search Widget Suit", () => {

    beforeEach(function () {
        cy.fixture('homePage').then(data => this.data = data);
        cy.clearLocalStorage();
        cy.visit('/');
        cy.login(ADMIN.email, ADMIN.password);
    });


    it("TC_02.06 > Verify that Reservation is set up by default in the Reservation/Event dropdown", function () {
       // cy.loginUser(this.login.userData.email, this.login.userData.password);
        homePage.elements.getWhatDropdown().should('have.class', this.data.defaultClass);
        homePage.elements.getDefaultValue().should('have.value', this.data.isReservation);
    });

    it('TC_02.07 > Verify that User is able to select Event in the  Reservation/Event dropdown', function () {
        homePage.selectEventOfWhatDropdown();
        //homePage.elements.getWhereMultiLocation().type('130');
        homePage.clickCancelBtnWherePopUp();
        homePage.elements.getWhatInput().should('have.value', this.data.isEvent);
    });

    it('TC_02.08 > Verify that User is able to select a location from Location Dropdown', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);

    });

    it('TC_02.09 > Verify that User is able to select Collaboration Space from AssetType Dropdown',
        function () {
            homePage.findLocation(this.data.locationType, this.data.locationName);

    });

    it('TC_02.10 > Verify that User is able to cross selected location', function () {
            homePage.deleteLocation(this.data.locationType, this.data.locationName);
            homePage.elements.getLocationInput().should('have.value', '')

        });

    it.only('TC_02.10 ', function () {
       homePage.checkElementOfAssetTypes(this.data.assetTypes);

    });

    listAssetTypes.forEach((el, index) => {
        console.log(index, el)
        it(`Verify Asset ${el}`, function () {
          homePage.checkElementOfAssetTypes(index, el)


        })
    })
})

