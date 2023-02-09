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
        cy.clearLocalStorage();
        cy.visit('/', {timeout: 90000});

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
            if ($el.text() === 'Collaboration Space') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', 'Collaboration Space');

        homePage.elements.getSearchByListBtn().should('not.be.disabled');

    });

    it('TC_02.18 > Verify that Search by Callendar button is enabled When Collaboration space is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Collaboration Space') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', 'Collaboration Space');

        homePage.elements.getSearchByCalendar().should('not.be.disabled');

    });

    it('TC_02.19 > Verify that Search by Floor button is enabled When Collaboration space is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Collaboration Space') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', 'Collaboration Space');

        homePage.elements.getSearchByFloorPlatBtn().should('not.be.disabled');

    });

    it('TC_02.22 > Verify that Search by List Button is enabled When Workspace type Asset is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.elements.getSearchByListBtn().should('not.be.disabled');

    });

    it('TC_02.23 > Verify that Search by Callendar button is enabled When Workspace type Asset is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.elements.getSearchByCalendar().should('not.be.disabled');

    });

    it('TC_02.24 > Verify that Search by Floor button is enabled When Workspace type Asset is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.elements.getSearchByFloorPlatBtn().should('not.be.disabled');

    });

    it('TC_02.25 > Verify that User is able to click Book button for available asset', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value','Workspace');

        homePage.clickSearchByListBtn({force:true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');
        homePage.clickBookBtnForAvlBtn();
        homePage.reserveForm.getReserveForm().should('be.visible');

    });

    it('TC_02.37 > Verify that Search by List Button is enabled When Equipment Asset is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[2]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[2]);

        homePage.elements.getSearchByListBtn().should('not.be.disabled');

    });

    it('TC_02.38 > Verify that Search by Calendar Button is disabled When Equipment Asset is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[2]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[2]);

        homePage.elements.getSearchByCalendar().should('be.disabled');

    });

    it('TC_02.39 > Verify that Search by Floor Plan Button is disabled When Equipment Asset is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[2]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[2]);

        homePage.elements.getSearchByFloorPlatBtn().should('be.disabled');

    });

    it('TC_02.41 > Verify that Search by List Button is enabled When Service Type Asset is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[3]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[3]);

        homePage.elements.getSearchByListBtn().should('not.be.disabled');

    });

    it('TC_02.42 > Verify that Search by Calendar Button is disabled When Service Type is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[3]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[3]);

        homePage.elements.getSearchByCalendar().should('be.disabled');

    });

    it('TC_02.43 > Verify that Search by Floor Plan Button is disabled When Service Type is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[3]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[3]);

        homePage.elements.getSearchByFloorPlatBtn().should('be.disabled');

    });

    it('TC_02.42 > Verify that Search by List Button is enabled When Parking Asset Type is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[4]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[4]);

        homePage.elements.getSearchByListBtn().should('not.be.disabled');

    });

    it('TC_02.43 > Verify that Search by Callendar button is enabled When Parking Asset Type is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[4]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[4]);

        homePage.elements.getSearchByCalendar().should('not.be.disabled');

    });

    it('TC_02.44 > Verify that Search by Floor button is enabled When Parking Asset Type is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[4]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[4]);

        homePage.elements.getSearchByFloorPlatBtn().should('not.be.disabled');

    });

    it('TC_02.47 > Verify that Search by List Button is enabled When Transportation Asset Type is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[5]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[5]);

        homePage.elements.getSearchByListBtn().should('not.be.disabled');

    });

    it('TC_02.48 > Verify that Search by Callendar button is enabled When Transportation Asset Type is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[5]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[5]);

        homePage.elements.getSearchByCalendar().should('not.be.disabled');

    });

    it('TC_02.49 > Verify that Search by Floor button is enabled When Transportation Asset Type is selected', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[5]) {
                cy.wrap($el).click();
            }
        })
        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[5]);

        homePage.elements.getSearchByFloorPlatBtn().should('not.be.disabled');

    });
})