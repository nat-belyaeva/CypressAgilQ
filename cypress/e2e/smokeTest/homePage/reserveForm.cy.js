/// <reference types="cypress" />

import HomePage from '../../../pageObjects/homePage'

import { faker } from '@faker-js/faker'
import getClick from '../../../support/utilities/getClick'

const homePage = new HomePage()
const ADMIN = Cypress.env('admin')
let randomReservationName

describe('reserve form verification', () => {
  beforeEach(function () {
    randomReservationName = faker.company.name()
    cy.loginAs(ADMIN.email, ADMIN.password)
    cy.fixture('homePage').then(data => this.data = data)

  })

  it('TC_02.26 > Verify that Submit button is disabled after opening the Reserve form', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === 'Workspace') {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    homePage.reserveForm.getReserveForm().should('be.visible')
    homePage.reserveForm.getSubmitBtn().should('be.disabled')
  })

  it('TC_02.27 > Verify that Add Asset button is disabled after opening the Reserve form', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === 'Workspace') {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    cy.wait('@cost-estimates')
    homePage.reserveForm.getReserveForm().should('be.visible')
    homePage.reserveForm.getAddAssetBtn().should('be.disabled')

  })

  it('TC_02.28 > Verify that Private checkbox is unchecked after opening the Reserve form', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === 'Workspace') {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')
    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')
    cy.wait('@cost-estimates')
    homePage.reserveForm.getPrivateCheckbox().should('not.be.checked')
  })

  it('TC_02.29 > Verify that User is able to check the Private checkbox', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === 'Workspace') {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')
    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')
    cy.wait('@cost-estimates')
    homePage.checkPrivateCheckbox()
  })

  it('TC_02.30 > Verify that User is able to uncheck the Private checkbox', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === 'Workspace') {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')
    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')
    cy.wait('@cost-estimates')
    homePage.uncheckPrivateCheckbox()
  })

  it('TC_02.31 > Verify that User is able to type reservation Name', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === 'Workspace') {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')

    cy.wait('@cost-estimates')

    const reserveName = randomReservationName
    homePage.typeReservationName(reserveName)
    homePage.reserveForm.getReservationNameInput().then(el => expect(el.val()).to.eql(reserveName))
  })

  it('TC_02.32 > Verify that Change Owner button is clickable', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === 'Workspace') {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')
    cy.wait('@cost-estimates')
    homePage.clickChangeOwnerBtn()
    homePage.reserveForm.getNewChangeOwnerPopUp()
      .should('be.visible')
      .click()
      .wait(500)
      .should('be.visible')
      .and('have.text', this.data.newChangeOwnerPopupText)
  })

  it.only('TC_02.33 > Verify that User is able to change Owner for another', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === 'Workspace') {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickSearchByListBtn({ force: true })
    cy.wait('@workspaces')
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')
    cy.wait('@cost-estimates')
    homePage.clickChangeOwnerBtn()
    homePage.reserveForm.getNewChangeOwnerPopUp()
      .should('be.visible')
      .click()
      .wait(500)
      .should('be.visible')

    homePage.typeNewChangeOwner(this.data.newReservationOwner)
    homePage.reserveForm.getSearchForPearsonInputChangeOwner().should('have.value', this.data.newReservationOwner)
    homePage.reserveForm.getUsersList().each($el => {
      cy.log($el.text())
      if ($el.text() === this.data.userEmail) {
        cy.wrap($el).click()
      }
    })

    homePage.reserveForm.getNewOwnerResult().should('be.visible')
      .and('have.text', this.data.fullNameOfNewOwner)
  })

  it('TC_02.34 > Verify that Abb button is enabled when Reservation Name field is filled in for Workspace asset type', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.clickWhatField()
    homePage.getListAssetTypes().each(($el, index, $list) => {
      if ($el.text() === 'Workspace') {
        cy.wrap($el).click()
      }
    })

    homePage.getWhatTypeAsset().should('have.value', 'Workspace')
    homePage.clickSearchByListBtn({ force: true })
    homePage.getListAvailableAssets().should('be.visible')

    //use recurse function to click the button BookBtnForAvlBtn()
    getClick('.search-result-item:nth-child(1) button', '.reservation-form-container')
    cy.wait('@cost-estimates')

    const reserveName = randomReservationName
    homePage.typeReservationName(reserveName)
    homePage.reserveForm.getAddAssetBtn().should('be.enabled')
  })
})