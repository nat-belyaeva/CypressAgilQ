/// <reference types="cypress" />

import HomePage from "../../../pageObjects/homePage";
import LogInPage from "../../../pageObjects/logInPage";

import { faker } from '@faker-js/faker';
const logInPage = new LogInPage();
const homePage = new HomePage();
const ADMIN = Cypress.env('admin');
const randomNumber = faker.random.numeric();
const randomReservationName = faker.company.name() + randomNumber ;
const randomLocation = faker.address.cityName();


describe('Single Reservation Creation', () => {
    beforeEach(function () {
        cy.fixture('homePage').then(data => this.data = data);
        cy.clearLocalStorage();

        cy.visit('/');
        cy.login(ADMIN.email, ADMIN.password);

        cy.intercept('/aq-api/reservations/events').as('reservationCreated');
        cy.intercept('/aq-api/reservations/events/*').as('reservationConfirmationNumber');

        cy.intercept('/aq-api/reservations/cost-estimates').as('cost-estimates');
        cy.intercept('aq-api/availability/workspaces').as('workspaces');
        cy.intercept('aq-api/locations').as('locations');
        cy.intercept('/aq-api/locations/venues/*').as('currentLocation')

    });

    it('TC_02.35 > Verify that User is able to create single reservation with Workspace Asset type', function () {
       // cy.intercept('/aq-api/reservations/events').as('reservationCreated');
       //  cy.intercept('/aq-api/reservations/events/*').as('reservationConfirmationNumber');

        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[1]) {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Workspace');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();

        cy.wait('@cost-estimates');
       // cy.wait('@workspaces');

        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);
        homePage.clickSubmitBtn();

        cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200);
        cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

    });

    it('TC_02.36 > Verify that User is able to create single reservation with Collaboration Space Asset type', function () {
        // cy.intercept('/aq-api/reservations/events').as('reservationCreated');
        // cy.intercept('/aq-api/reservations/events/*').as('reservationConfirmationNumber');

        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[0]) {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Collaboration Space');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        cy.wait('@currentLocation');
        //cy.wait('@workspaces');

        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);
        homePage.typeNumberOfPeopleExpectedToAttend(this.data.numberOfPeopleExpectedToAttend)

        homePage.reserveForm.getNumberOfPeopleExpectedToAttend().should('have.value',this.data.numberOfPeopleExpectedToAttend );

        homePage.clickSubmitBtn();

        cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200);
        cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

    });

    it('TC_02.40 > Verify that User is able to create single reservation with Equipment Asset type', function () {
        // cy.intercept('/aq-api/reservations/events').as('reservationCreated');
        // cy.intercept('/aq-api/reservations/events/*').as('reservationConfirmationNumber');

        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[2]) {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', 'Equipment');

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        cy.wait('@currentLocation');
       // cy.wait('@workspaces');

        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);

        const location = randomLocation;
        homePage.typeDeliveryLocation(location);

        homePage.typeQuantity(this.data.quantity);
        homePage.reserveForm.getQuantity().should('have.value',this.data.quantity);

        homePage.clickSubmitBtn();

        cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200);
        cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

    });

    it('TC_02.41 > Verify that User is able to create single reservation with Service Asset type', function () {
        // cy.intercept('/aq-api/reservations/events').as('reservationCreated');
        // cy.intercept('/aq-api/reservations/events/*').as('reservationConfirmationNumber');

        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[3]) {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[3]);

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        cy.wait('@currentLocation');
        //cy.wait('@workspaces');

        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);

        const location = randomLocation;
        homePage.typeDeliveryLocation(location);

        homePage.typeQuantity(this.data.quantity);
        homePage.reserveForm.getQuantity().should('have.value',this.data.quantity);

        homePage.clickSubmitBtn();

        cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200);
        cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

    });

    it('TC_02.46 > Verify that User is able to create single reservation with Parking Asset type', function () {
        // cy.intercept('/aq-api/reservations/events').as('reservationCreated');
        //  cy.intercept('/aq-api/reservations/events/*').as('reservationConfirmationNumber');

        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[4]) {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[4]);

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        cy.wait('@currentLocation');
        //cy.wait('@workspaces');

        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);
        homePage.clickSubmitBtn();

        cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200);
        cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

    });

    it('TC_02.50 > Verify that User is able to create single reservation with Transportation Asset type', function () {
        // cy.intercept('/aq-api/reservations/events').as('reservationCreated');
        //  cy.intercept('/aq-api/reservations/events/*').as('reservationConfirmationNumber');

        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[5]) {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[5]);

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        cy.wait('@currentLocation');
       // cy.wait('@workspaces');

        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);
        homePage.clickSubmitBtn();

        cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200);
        cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

    });

    it('TC_02.51 > Verify that User is able to create single reservation with Health and Wellness Asset type', function () {
        // cy.intercept('/aq-api/reservations/events').as('reservationCreated');
        //  cy.intercept('/aq-api/reservations/events/*').as('reservationConfirmationNumber');

        homePage.findLocation(this.data.locationType, this.data.locationName);
        homePage.elements.getLocationInput().should('have.value', this.data.LocationValue);
        homePage.clickWhatField();
        homePage.elements.getListAssetTypes().each(($el, index, $list) => {
            if ($el.text() === this.data.assetTypes[6]) {
                cy.wrap($el).click();
            }
        })

        homePage.elements.getWhatTypeAsset().should('have.value', this.data.assetTypes[6]);

        homePage.clickSearchByListBtn({force: true});
        cy.wait(3000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        cy.wait('@currentLocation');
        //cy.wait('@workspaces');

        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);
        homePage.clickSubmitBtn();

        cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200);
        cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

    });
});