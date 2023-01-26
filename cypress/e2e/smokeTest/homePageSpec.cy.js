/// <reference types="cypress" />

import HomePage from "../../pageObjects/homePage";
import LogInPage from "../../pageObjects/logInPage";
import listAssetTypes from "../../fixtures/listAssetTypes";

const logInPage = new LogInPage();
const homePage = new HomePage();
const ADMIN = Cypress.env('admin');

describe("Search Widget Suite", () => {

    beforeEach(function () {
        cy.fixture('homePage').then(data => this.data = data);
        cy.clearLocalStorage();
        cy.visit('/');
        cy.login(ADMIN.email, ADMIN.password);
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
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if($el.text() === 'Collaboration Space') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value','Collaboration Space');

        homePage.elements.getSearchByListBtn().should('not.be.disabled');

    });

    it('TC_02.18 > Verify that Search by Callendar button is enabled When Collaboration space is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if($el.text() === 'Collaboration Space') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value','Collaboration Space');

        homePage.elements.getSearchByCalendar().should('not.be.disabled');

    });

    it('TC_02.19 > Verify that Search by Floor button is enabled When Collaboration space is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if($el.text() === 'Collaboration Space') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value','Collaboration Space');

        homePage.elements.getSearchByFloorPlatBtn().should('not.be.disabled');

    });

    it('TC_02.22 > Verify that Search by List Button is enabled When Workspace type Asset is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value','Workspace');

        homePage.elements.getSearchByListBtn().should('not.be.disabled');

    });

    it('TC_02.23 > Verify that Search by Callendar button is enabled When Workspace type Asset is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value','Workspace');

        homePage.elements.getSearchByCalendar().should('not.be.disabled');

    });

    it('TC_02.24 > Verify that Search by Floor button is enabled When Workspace type Asset is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value','Workspace');

        homePage.elements.getSearchByFloorPlatBtn().should('not.be.disabled');

    });

    describe("When Widget Suite", () => {

        beforeEach(function () {
            cy.fixture('homePage').then(data => this.data = data);
            cy.clearLocalStorage();
            cy.visit('/');
            cy.login(ADMIN.email, ADMIN.password);
        });

        it.skip('Verify that current date is displayed in the When Widget', () => {
           let date = new Date();
           date.setDate(date.getDate() + 1);
        })

    });



});

