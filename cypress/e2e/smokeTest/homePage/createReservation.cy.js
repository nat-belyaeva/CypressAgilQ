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
    it.only('TC_02.35 > Verify that User is able to create single reservation with Workspace Asset type', function () {
       cy.intercept('/aq-api/reservations/events').as('reservationCreated');
        cy.intercept('/aq-api/reservations/events/*').as('reservationConfirmationNumber');

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
        cy.wait(1000);

        homePage.elements.getListAvailableAssets().should('be.visible');

        homePage.clickBookBtnForAvlBtn();
        const reserveName = randomReservationName;
        homePage.typeReservationName(reserveName);
        homePage.clickSubmitBtn();

        cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200);
        cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

    });
});