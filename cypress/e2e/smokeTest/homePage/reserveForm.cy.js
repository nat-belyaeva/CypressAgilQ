/// <reference types="cypress" />

import HomePage from "../../../pageObjects/homePage";
import LogInPage from "../../../pageObjects/logInPage";

import { faker } from '@faker-js/faker';
const logInPage = new LogInPage();
const homePage = new HomePage();
const ADMIN = Cypress.env('admin');
const randomReservationName = faker.company.name();


describe('reserve form verification', () => {
    beforeEach(function () {
        cy.fixture('homePage').then(data => this.data = data);
        cy.clearLocalStorage();


        cy.visit('/');
        cy.login(ADMIN.email, ADMIN.password);

        cy.intercept('/aq-api/reservations/cost-estimates').as('cost-estimates');
        cy.intercept('aq-api/availability/workspaces').as('workspaces');
        cy.intercept('aq-api/locations').as('locations')

    });
    // before(function () {
    //     cy.visit('/');
    //     cy.login(ADMIN.email, ADMIN.password);
    //
    // })

    it('TC_02.26 > Verify that Submit button is disabled after opening the Reserve form', function () {

        //cy.intercept('/aq-api/locations').as('locations');

        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');
        cy.wait('@locations');
        homePage.clickBookBtnForAvlBtn();
        homePage.reserveForm.getReserveForm().should('be.visible');
        homePage.reserveForm.getSubmitBtn().should('be.disabled');

    });

    it('TC_02.27 > Verify that Add Asset button is disabled after opening the Reserve form', function () {

        cy.intercept('/aq-api/locations').as('locations');
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');
        cy.wait('@locations');
        homePage.clickBookBtnForAvlBtn();
        homePage.reserveForm.getReserveForm().should('be.visible');
        homePage.reserveForm.getAddAssetBtn().should('be.disabled');

    });

    it('TC_02.28 > Verify that Private checkbox is unchecked after opening the Reserve form', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');
        homePage.clickBookBtnForAvlBtn();
        homePage.reserveForm.getPrivateCheckbox().should('not.be.checked');

    });

    it('TC_02.29 > Verify that User is able to check the Private checkbox', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');
        homePage.clickBookBtnForAvlBtn();

        homePage.checkPrivateCheckbox();

    });

    it('TC_02.30 > Verify that User is able to uncheck the Private checkbox', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        homePage.uncheckPrivateCheckbox();

    });

    it('TC_02.31 > Verify that User is able to type reservation Name', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);
        homePage.reserveForm.getReservationNameInput().then(el => expect(el.val()).to.eql(reserveName));

    });

    it('TC_02.32 > Verify that Change Owner button is clickable', function () {

        cy.intercept('/aq-api/reservations/cost-estimates').as('cost-estimates');
        cy.intercept('aq-api/availability/workspaces').as('workspaces');
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        cy.wait('@cost-estimates');
        cy.wait('@workspaces');
        homePage.clickChangeOwnerBtn();

        homePage.reserveForm.getNewChangeOwnerPopUp()
            .should('be.visible')
            .click()
            .wait(500)
            .should('be.visible')
            .and('have.text', this.data.newChangeOwnerPopupText);
    });

    it('TC_02.33 > Verify that User is able to change Owner for another', function () {

        // cy.intercept('/aq-api/reservations/cost-estimates').as('cost-estimates');
        // cy.intercept('aq-api/availability/workspaces').as('workspaces');
        // cy.intercept('aq-api/locations').as('locations')

        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);
        cy.wait('@workspaces');
        cy.wait('@locations');
        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        cy.wait('@cost-estimates');
        //cy.wait('@workspaces');
        cy.wait(2000)
        homePage.clickChangeOwnerBtn();

        homePage.reserveForm.getNewChangeOwnerPopUp()
            .should('be.visible')
            .click()
            .wait(500)
            .should('be.visible')

        homePage.typeNewChangeOwner(this.data.newReservationOwner);
        homePage.reserveForm.getSearchForPearsonInputChangeOwner().should('have.value', this.data.newReservationOwner);

        homePage.reserveForm.getUsersList().each($el=> {
            cy.log($el.text())
            if($el.text() === this.data.userEmail) {
                cy.wrap($el).click();
            }
        })

        homePage.reserveForm.getNewOwnerResult().should('be.visible')
            .and('have.text', this.data.fullNameOfNewOwner);

    });

    it('TC_02.34 > Verify that Abb button is enabled when Reservation Name field is filled in for Workspace asset type', function () {
        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === 'Workspace') {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);

       homePage.reserveForm.getAddAssetBtn().should('be.enabled');


    });

})