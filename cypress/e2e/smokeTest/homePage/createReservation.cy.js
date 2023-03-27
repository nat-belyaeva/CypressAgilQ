/// <reference types="cypress" />

import HomePage from '../../../pageObjects/homePage'
import LogInPage from '../../../pageObjects/logInPage'
import getClick from '../../../support/utilities/getClick'

import { faker } from '@faker-js/faker'

const logInPage = new LogInPage()
const homePage = new HomePage()
const ADMIN = Cypress.env('admin')
let randomNumber
let randomReservationName
let randomLocation

describe('Single Reservation Creation', () => {
  beforeEach(function () {
    randomNumber = faker.random.numeric()
    randomReservationName = faker.company.name() + randomNumber
    randomLocation = faker.address.cityName()

    cy.loginAs(ADMIN.email, ADMIN.password)
    cy.fixture('homePage').then(data => this.data = data)

  })
  it('TC_02.35 > Verify that User is able to create single reservation with Workspace Asset type for Today', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[1]) {
        cy.wrap($el).click()
      }
    })
    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

  })

  it('TC_02.36 > Verify that User is able to create single reservation with Collaboration Space Asset type for Today', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[0]) {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Collaboration Space')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.typeNumberOfPeopleExpectedToAttend(this.data.numberOfPeopleExpectedToAttend)
    homePage.reserveForm.getNumberOfPeopleExpectedToAttend().should('have.value', this.data.numberOfPeopleExpectedToAttend)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')
  })

  it('TC_02.40 > Verify that User is able to create single reservation with Equipment Asset type for Today', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[2]) {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Equipment')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.typeDeliveryLocation(randomLocation)
    homePage.typeQuantity(this.data.quantity)
    homePage.reserveForm.getQuantity().should('have.value', this.data.quantity)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')
  })

  it('TC_02.41 > Verify that User is able to create single reservation with Service Asset type', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[3]) {
        cy.wrap($el).click()
      }
    })
    homePage.getWhatTypeAsset().should('have.value', this.data.assetTypes[3])
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.typeDeliveryLocation(randomLocation)
    homePage.typeQuantity(this.data.quantity)
    homePage.reserveForm.getQuantity().should('have.value', this.data.quantity)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

  })

  it('TC_02.46 > Verify that User is able to create single reservation with Parking Asset type for Today', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[4]) {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', this.data.assetTypes[4])
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')
  })

  it('TC_02.50 > Verify that User is able to create single reservation with Transportation Asset type for Today', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[5]) {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', this.data.assetTypes[5])
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

  })

  it('TC_02.51 > Verify that User is able to create single reservation with Health and Wellness Asset type for Today', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[6]) {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', this.data.assetTypes[6])
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')
  })

  it('TC_02.59 > Verify that User is able to create single reservation with Collaboration Space Asset type in Future', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[0]) {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Collaboration Space')
    homePage.clickStartDate()
    homePage.selectAnotherDay(3)
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.typeNumberOfPeopleExpectedToAttend(this.data.numberOfPeopleExpectedToAttend)
    homePage.reserveForm.getNumberOfPeopleExpectedToAttend().should('have.value', this.data.numberOfPeopleExpectedToAttend)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')
  })

  it('TC_02.60 > Verify that User is able to create single reservation with Workspace Asset type on Future day', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[1]) {
        cy.wrap($el).click()
      }
    })
    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickStartDate()
    homePage.selectAnotherDay(3)
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')
  })

  it('TC_02.61 > Verify that User is able to create single reservation with Equipment Asset type on Future Day', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[2]) {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Equipment')
    homePage.clickStartDate()
    homePage.selectAnotherDay(3)
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.typeDeliveryLocation(randomLocation)
    homePage.typeQuantity(this.data.quantity)
    homePage.reserveForm.getQuantity().should('have.value', this.data.quantity)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')
  })

  it('TC_02.62 > Verify that User is able to create single reservation with Service Asset type on Future day', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[3]) {
        cy.wrap($el).click()
      }
    })
    homePage.getWhatTypeAsset().should('have.value', this.data.assetTypes[3])
    homePage.clickStartDate()
    homePage.selectAnotherDay(3)
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.typeDeliveryLocation(randomLocation)
    homePage.typeQuantity(this.data.quantity)
    homePage.reserveForm.getQuantity().should('have.value', this.data.quantity)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')

  })

  it('TC_02.63 > Verify that User is able to create single reservation with Parking Asset type on Future Day', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[4]) {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', this.data.assetTypes[4])
    homePage.clickStartDate()
    homePage.selectAnotherDay(3)
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')
  })

  it('TC_02.64 > Verify that User is able to create single reservation with Transportation Asset type on Future Day', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[5]) {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', this.data.assetTypes[5])
    homePage.clickStartDate()
    homePage.selectAnotherDay(3)
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')
  })

  it('TC_02.65 > Verify that User is able to create single reservation with Health and Wellness Asset type on Future Day', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === this.data.assetTypes[6]) {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', this.data.assetTypes[6])
    homePage.clickStartDate()
    homePage.selectAnotherDay(3)
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.typeReservationName(randomReservationName)
    homePage.clickSubmitBtn()

    cy.wait('@reservationCreated').its('response.statusCode').should('eq', 200)
    cy.wait('@reservationConfirmationNumber').its('response.body').should('have.a.property', 'sysidConfirmationNumber')
  })
})