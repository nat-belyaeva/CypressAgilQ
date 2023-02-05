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
        //cy.clearLocalStorage();

    });
    before(function () {
        cy.visit('/');
        cy.login(ADMIN.email, ADMIN.password);

    })

    it('TC_02.26 > Verify that Submit button is disabled after opening the Reserve form', function () {
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
        homePage.reserveForm.getReserveForm().should('be.visible');
        homePage.reserveForm.getSubmitBtn().should('be.disabled');

    });

    it('TC_02.27 > Verify that Add Asset button is disabled after opening the Reserve form', function () {
        // homePage.findLocation(this.data.locationType, this.data.locationName);
        // homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        // homePage.clickWhatField();
        // homePage.elements.getListAssetTypes().each(($el, index, $list) => {
        //     if ($el.text() === 'Workspace') {
        //         cy.wrap($el).click();
        //     }
        // })
        //
        // homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');
        //
        // homePage.clickSearchByListBtn({force: true});
        // cy.wait(3000);
        //
        // homePage.elements.getListAvailableAssets().should('be.visible');
        // homePage.clickBookBtnForAvlBtn();
        homePage.reserveForm.getReserveForm().should('be.visible');
        homePage.reserveForm.getAddAssetBtn().should('be.disabled');

    });

    it('TC_02.28 > Verify that Private checkbox is unchecked after opening the Reserve form', function () {
        // homePage.findLocation(this.data.locationType, this.data.locationName);
        // homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        // homePage.clickWhatField();
        // homePage.elements.getListAssetTypes().each(($el, index, $list) => {
        //     if ($el.text() === 'Workspace') {
        //         cy.wrap($el).click();
        //     }
        // })
        //
        // homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');
        //
        // homePage.clickSearchByListBtn({force: true});
        // cy.wait(3000);
        //
        // homePage.elements.getListAvailableAssets().should('be.visible');
        // homePage.clickBookBtnForAvlBtn();
        homePage.reserveForm.getPrivateCheckbox().should('not.be.checked');

    });

    it('TC_02.29 > Verify that User is able to check the Private checkbox', function () {
        // homePage.findLocation(this.data.locationType, this.data.locationName);
        // homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        // homePage.clickWhatField();
        // homePage.elements.getListAssetTypes().each(($el, index, $list) => {
        //     if ($el.text() === 'Workspace') {
        //         cy.wrap($el).click();
        //     }
        // })
        //
        // homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');
        //
        // homePage.clickSearchByListBtn({force: true});
        // cy.wait(3000);
        //
        // homePage.elements.getListAvailableAssets().should('be.visible');
        // homePage.clickBookBtnForAvlBtn();

        homePage.checkPrivateCheckbox();

    });

    it('TC_02.30 > Verify that User is able to uncheck the Private checkbox', function () {
        // homePage.findLocation(this.data.locationType, this.data.locationName);
        // homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        // homePage.clickWhatField();
        // homePage.elements.getListAssetTypes().each(($el, index, $list) => {
        //     if ($el.text() === 'Workspace') {
        //         cy.wrap($el).click();
        //     }
        // })
        //
        // homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');
        //
        // homePage.clickSearchByListBtn({force: true});
        // cy.wait(3000);
        //
        // homePage.elements.getListAvailableAssets().should('be.visible');
        //
        // homePage.clickBookBtnForAvlBtn();
        homePage.uncheckPrivateCheckbox();

    });

    it('TC_02.31 > Verify that User is able to type reservation Name', function () {
        // homePage.findLocation(this.data.locationType, this.data.locationName);
        // homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        // homePage.clickWhatField();
        // homePage.elements.getListAssetTypes().each(($el, index, $list) => {
        //     if ($el.text() === 'Workspace') {
        //         cy.wrap($el).click();
        //     }
        // })
        //
        // homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');
        //
        // homePage.clickSearchByListBtn({force: true});
        // cy.wait(3000);
        //
        // homePage.elements.getListAvailableAssets().should('be.visible');
        //
        // homePage.clickBookBtnForAvlBtn();
        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);
        homePage.reserveForm.getReservationNameInput().then(el => expect(el.val()).to.eql(reserveName));

    });

    it.skip('TC_02.33 > Verify that Change Owner button is clickable', function () {
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
        homePage.clickChangeOwnerBtn();
        homePage.reserveForm.getNewChangeOwnerPopUp
            .should('be.visible')
            .and('have.text', this.data.newChangeOwnerPopupText);
    });

    it.skip('TC_02.34 > Verify that User is able to change Owner for another', function () {
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
        homePage.typeNewChangeOwner(this.data.newReservationOwner);

    })

})