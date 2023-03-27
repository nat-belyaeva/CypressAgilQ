class HomePage {

  getWhatDropdown = () => cy.get('#dropdown_1')
  getWhatInput = () => cy.get('.dropdown-input')
  getDefaultValue = () => cy.get('[value="Reservation"]')
  getEventOfWhatDropdown = () => cy.get('[data-idx="1"]')
  getReservationOfWhatDropdown = () => cy.get('[data-idx="1"]')
  getReserveOrEventDropdown = () => ('#dropdown-menu')
  getWhereMultiLocation = () => cy.get('#input-home_geosearch_geosearch')
  getLocationInput = () => cy.get('#input-home_geosearch')
  getSearchLocationResultDropdown = () => cy.get('#geosearch-results-menu')
  getCancelBtnWherePopUp = () => cy.get('.buttons-row .button-primary').eq(0)
  getCrossLocationBtn = () => cy.get('.remove-icon')
  getAssetCategory = () => cy.get('home_assetCategory')
  getWhenPopUp = () => cy.get('.when-popup')
  getSingleMultiDayTab = () => cy.get('.when-popup')
  getWhatTypeAsset = () => cy.get('[placeholder="What"]')
  getListAssetTypes = () => cy.get('#dropdown-menu .drop-down-option')
  getSearchByListBtn = () => cy.get('#searchByListBtn')
  getSearchByCalendar = () => cy.get('#searchByCalendarBtn')
  getSearchByFloorPlatBtn = () => cy.get('#searchByFloorPlanBtn')
  getListAvailableAssets = () => cy.get('.search-result-list')
  getBookBntForFirstAvailableAsset = () => cy.get('.search-result-item').eq(0).find('.button-primary')

  //When Widget
  //getStartTime = () => cy.get('#home_when_start_dateTimeWidget')
  getCurrentDate = () => cy.get('#home_when')
  getArrOfAvailableDaysInCalendar = () => cy.get('.date-time-row:nth-child(1) tbody [tabindex]')
  getArrowNextMonth = () => cy.get('.rdtNext[tabindex="0"] span')
  getApplyBtnOnCalendar = () => cy.get('.cancel-save-buttons button.save-button')
  getApplyBtnOnWhenWidget = () => cy.get('.when-cancel-save-buttons button.save-button')
  getCurrentDayOnCalendar = () => cy.get('td.rdtActive').eq(1)
  getValueOfCurrentDay = () => cy.get('.date-time-row:nth-child(1) td[tabindex][data-value]')

  //Splash-page
  getSplashPage = () => cy.get('.splash-popup')
  getAcceptBntOnSplashPage = () => cy.get('.splash-popup .button-primary:nth-child(1)')
  getDeclineBntOnSplashPage = () => cy.get('.splash-popup .button-primary:nth-child(2)')

  reserveForm = {
    getReserveForm: () => cy.get('.reservation-form'),
    getSubmitBtn: () => cy.get('.button-primary[type="submit"]'),
    getAddAssetBtn: () => cy.get('.buttons-separator .button-primary[type="button"]'),
    getReservationNameInput: () => cy.get('#name'),
    getPrivateCheckbox: () => cy.get('.bigCheckbox[type="checkbox"]#res-private'),
    getChangeOwnerBnt: () => cy.get('#owner-section-change-owner-button'),
    getMsTeamsCheckbox: () => cy.get('[for="meeting-type-1"]').eq(1),
    getInviteesBtn: () => cy.get('.display-inv-grid-icon'),
    getNewChangeOwnerPopUp: () => cy.get('div .owner-section-header'),
    getNewChangeOwnerPopUpText: () => cy.get('.owner-section-header'),
    getSearchForPearsonInputChangeOwner: () => cy.get('.simplified-user-search-widget-search'),
    getUsersList: () => cy.get('#dropdown-menu').find('.drop-down-option-contacts').find('.drop-down-option-email'),
    getOneUserFromChangeOwnerList: () => cy.get('.drop-down-option-contacts'),
    getNewOwnerResult: () => cy.get('.owner-name'),

    //for collaboration space
    getNumberOfPeopleExpectedToAttend: () => cy.get('#people-num'),

    //for Equipment & Service
    getQuantity: () => cy.get('#res-quantity'),
    getDeliveryLocation: () => cy.get('#res-delivery'),
  }

  selectEventOfWhatDropdown () {
    this.getWhatDropdown()
      .trigger('mouseover')
      .should('be.visible')
      .wait(500)
      .click()
    this.getEventOfWhatDropdown()
      .trigger('mouseover')
      .should('be.visible')
      .wait(500)
      .click()
  }

  typeLocation (location) {
    this.getLocationInput()
      .trigger('mouseover')
      .should('be.visible')
      .wait(500)
      .type(location)
      .wait(500)
  }

  selectLocationFromDropdown (resLocation) {
    this.getSearchLocationResultDropdown()
      .find('.drop-down-option')
      .contains(resLocation).should('be.visible')
      .click({ force: true })
      .wait(500)
  }

  findLocation (locationName, resLocation) {
    this.typeLocation(locationName, { force: true })
    this.selectLocationFromDropdown(resLocation)
  }

  clickCancelBtnWherePopUp () {
    this.getCancelBtnWherePopUp()
      .should('be.visible')
      .wait(500)
      .click({ force: true })
  }

  clickCrossLocationBtn () {
    this.getCrossLocationBtn()
      .should('be.visible')
      .wait(1000)
      .click({ force: true })
  }

  deleteLocation (locationType, resLoc) {
    this.findLocation(locationType, resLoc)
    this.clickCrossLocationBtn()
  }

  clickWhatField () {
    this.getWhatTypeAsset()
      .trigger('mouseover')
      .click()
  }

  checkElementOfAssetTypes (el, index) {
    this.clickWhatField()
    this.getListAssetTypes().eq(index)
      .trigger('mouseover')
      .click()
    this.getWhatTypeAsset()
      .invoke('val')
      .should('eq', el)
    cy.wait(1000)
  }

  clickSearchByListBtn () {
    this.getSearchByListBtn()
      .should('be.enabled')
      .click({ force: true })
  }

  clickBookBtnForAvlBtn () {
    this.getBookBntForFirstAvailableAsset()
      .should('be.visible')
      .wait(500)
      .click({ force: true })
      .click({ force: true })
  }

  // reserve form
  typeReservationName (reservationName) {
    this.reserveForm.getReservationNameInput()
      .should('be.visible')
      .click()
      .wait(500)
      .type(reservationName, { force: true })

  }

  clickChangeOwnerBtn () {
    this.reserveForm.getChangeOwnerBnt()
      .should('be.visible')
      .click({ force: true })
      .wait(500)

  }

  checkPrivateCheckbox () {
    this.reserveForm.getPrivateCheckbox().check({ force: true }).should('be.checked')
  }

  uncheckPrivateCheckbox () {
    this.checkPrivateCheckbox()
    this.reserveForm.getPrivateCheckbox().uncheck({ force: true }).should('not.be.checked')
  }

  clickInviteesBtn () {
    this.reserveForm.getInviteesBtn().should('be.visible').click({ force: true })

  }

  checkMsTeams () {
    this.reserveForm.getMsTeamsCheckbox().check({ force: true })

  }

  uncheckMsTeams () {
    this.reserveForm.getMsTeamsCheckbox().check({ force: true }).should('be.checked')
    this.reserveForm.getMsTeamsCheckbox().uncheck({ force: true })

  }

  typeNewChangeOwner (newOwner) {
    this.clickChangeOwnerBtn({ force: true })
    this.reserveForm.getSearchForPearsonInputChangeOwner()
      .should('be.visible')
      .click({ force: true })
      .wait(500)
      .type(newOwner)
  }

  clickSubmitBtn () {
    this.reserveForm.getSubmitBtn().should('be.enabled').click({ force: true })
  }

  typeNumberOfPeopleExpectedToAttend (number) {
    this.reserveForm.getNumberOfPeopleExpectedToAttend()
      .should('be.visible')
      .click({ force: true })
      .wait(500)
      .type(number)

  }

  typeQuantity (number) {
    this.reserveForm.getQuantity()
      .should('be.visible')
      .click({ force: true })
      .wait(500)
      .type(number)
  }

  typeDeliveryLocation (deliveryLocation) {
    this.reserveForm.getDeliveryLocation()
      .should('be.visible')
      .click({ force: true })
      .wait(500)
      .type(deliveryLocation)
  }

  clickStartDate () {
    this.getCurrentDate()
      .wait(1500)
      .trigger('mouseover')
      .click({ force: true })
  }

  clickArrowBtnNextMonth () {
    this.getArrowNextMonth()
      .should('be.visible')
      .wait(500)
      .click({ force: true })
  }

  // clickApplyBtnOnCalendar () {
  //   this.getApplyBtnOnCalendar()
  //     .should('be.visible')
  //     .wait(500)
  //     .click({ force: true })
  // }

  clickApplyBtnOnWhenWidget () {
    this.getApplyBtnOnWhenWidget()
      .should('be.visible')
      .wait(500)
      .click({ force: true })
  }

  selectAnotherDayOfMonth (day) {
    this.getArrOfAvailableDaysInCalendar()
      .eq(day)
      .click({ force: true })
  }

  checkCurrentDate (date, plusDays = 0) {
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + plusDays)
    let dateResult = `${currentDate.toLocaleString('en-US', { timeZone: 'Europe/Moscow', month: 'short' })}
         ${currentDate.toLocaleString('en-US', { timeZone: 'Europe/Moscow', day: '2-digit' })}, ${currentDate.getFullYear()}`
    console.log(dateResult)

    let dateVerified = JSON.stringify(new Date(date))
    let dateFinalResult = JSON.stringify(new Date(dateResult))

    cy.wrap(dateVerified).should('eq', dateFinalResult)
  }

  selectAnotherDay (plusDays) {
    this.getArrOfAvailableDaysInCalendar().then(dates => {
      let arrayActiveDays = dates.toArray()
      if (arrayActiveDays.length - plusDays > 0) { // Больше нуля только в том случае, если прибавляемый день находится в этом месяце
        this.getCurrentDayOnCalendar().invoke('attr', 'data-value').then(data => {
          cy.get(`.date-time-row:nth-child(1) td[tabindex][data-value=${+data + plusDays}]`).click({ force: true })
          this.clickApplyBtnOnWhenWidget()
          this.getCurrentDate().invoke('val').then(data => {
            let currentDateWeb = data.split(' - ')[0]
            this.checkCurrentDate(currentDateWeb, plusDays)
          })
        })
      } else {
        let nextMonthDay = plusDays
        this.clickArrowBtnNextMonth()
        this.selectAnotherDayOfMonth(nextMonthDay)
        this.clickApplyBtnOnWhenWidget()
        this.getCurrentDate().invoke('val').then(data => {
          let currentDateWeb = data.split(' - ')[0]
          this.checkCurrentDate(currentDateWeb, plusDays)
        })
      }
    })
  }

  clickAcceptBtnOnSplashPage () {
    this.getAcceptBntOnSplashPage({ timeout: 500 })
      .should('be.visible')
      .wait(500)
      .click({ force: true })
  }
}

export default HomePage