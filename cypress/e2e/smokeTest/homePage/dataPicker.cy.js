/// <reference types="cypress" />

import HomePage from '../../../pageObjects/homePage'

const homePage = new HomePage()
const ADMIN = Cypress.env('admin')

describe('Check Date & TIme Picker', () => {

  beforeEach(function () {
    cy.loginAs(ADMIN.email, ADMIN.password)
    cy.fixture('homePage').then(data => this.data = data)
  })

  it('TC.02_52 > Verify that Current Day is displayed in When Widget', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    homePage.getCurrentDate().invoke('val').then(data => {
        let currentDateWeb = data.split(' - ')[0]
    homePage.checkCurrentDate(currentDateWeb)
    })
  })

  it('TC_02.53 > Verify that User is able to select Date in Future in When Widget', function () {
    homePage.findLocation(this.data.locationType, this.data.locationName)
    homePage.getLocationInput().should('have.value', this.data.LocationValue)
    cy.wait('@getLocation')
    homePage.clickStartDate()
    homePage.selectAnotherDay(3)
  })
})
