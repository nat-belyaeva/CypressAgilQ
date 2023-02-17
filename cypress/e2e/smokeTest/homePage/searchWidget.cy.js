/// <reference types="cypress" />

import HomePage from '../../../pageObjects/homePage'
import listAssetTypes from '../../../fixtures/listAssetTypes'

const homePage = new HomePage()
const ADMIN = Cypress.env('admin')

describe('Search Widget Suite', () => {

  beforeEach(function () {
    cy.loginAs(ADMIN.email, ADMIN.password)
    cy.fixture('homePage').then(data => this.data = data)
  })

  it('TC_02.06 > Verify that Reservation is set up by default in the Reservation/Event dropdown', function () {
    homePage.getWhatDropdown().should('have.class', this.data.defaultClass)
    homePage.getDefaultValue().should('have.value', this.data.isReservation)
  })

  it('TC_02.07 > Verify that User is able to select Event in the  Reservation/Event dropdown', function () {
    homePage.selectEventOfWhatDropdown()
    homePage.clickCancelBtnWherePopUp()
    homePage.getWhatInput().should('have.value', this.data.isEvent)
  })

  it('TC_02.08 > Verify that User is able to select a location from Location Dropdown', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
  })

  it('TC_02.09 > Verify that User is able to cross selected location', function () {
    homePage.deleteLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().then(el => expect(el.val()).to.eql('Where'))
  })

  listAssetTypes.forEach((el, index) => {
    let number = 10
    it(`TC_02.${number + index} > Verify Asset ${el} is selected by Admin User`, function () {
      homePage.checkElementOfAssetTypes(el, index)
    })
  })
})
























