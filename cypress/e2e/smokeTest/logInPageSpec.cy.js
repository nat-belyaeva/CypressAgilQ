/// <reference types="cypress" />

import LogInPage from '../../pageObjects/logInPage'
import Header from '../../pageObjects/header'

const logInPage = new LogInPage()
const header = new Header()

describe('LogIn test suit', () => {

  beforeEach(function () {
    cy.fixture('logInPage').then(data => this.data = data)
    cy.clearLocalStorage()
    cy.visit('/', { timeout: 90000 })
    cy.intercept('/aq-api/users/profiles/*').as('sysIdUser')
  })

  it('TC_01.01 > Verify that User is able to log in to the forum using a valid login and password', function () {
    logInPage.logIn(this.data.userData.email, this.data.userData.password)
    cy.wait('@sysIdUser')
    header.getUserProfileBtn().should('be.visible') //this element is displayed in header after login successfully
  })

  it('TC_01.02 >  Verify that The user is not  able to log in to the forum using invalid login', function () {
    logInPage.logIn(this.data.userData.invalidEmail, this.data.userData.password)
    logInPage.getConformationPopUp().should('be.visible')
    logInPage.getErrorTextPopup().should('have.text', this.data.userData.textConformationPopUp)
  })

  it('TC_01.03 >  Verify that The user is not  able to log in to the forum using invalid password', function () {
    logInPage.logIn(this.data.userData.email, this.data.userData.invalidPassword)
    logInPage.getConformationPopUp().should('be.visible')
    logInPage.getErrorTextPopup().should('have.text', this.data.userData.textConformationPopUp)
    logInPage.clickOkBtnConfirmPopUp()
    logInPage.verifyUserCannotSignInWithIncorrectData() // Смотри loginPage.js
  })

  it('TC_01.04 >Verify that User is able to sent A password reset email to the email address entered', function () {
    logInPage.clickForgotPasswordLink()
    logInPage.getForgotPasswordForm().should('be.visible')
    logInPage.getHeaderForgotPasswordText()
      .should('have.text', this.data.forgotPasswordData.headerText)
    logInPage.sendForgottenEmail(this.data.userData.email)
    logInPage.getTextEmailSentSuccessfully()
      .should('have.text', this.data.forgotPasswordData.textPasswordResetEmail)
  })

  it('TC_01.05 >Verify that User is not able to sent a password reset email to the Invalid email address entered', function () {
    logInPage.clickForgotPasswordLink()
    logInPage.sendForgottenEmail(this.data.forgotPasswordData.incorrectEmail)
    logInPage.getForgottenOkBtn().should('be.disabled')
  })

  it('TC_01.20 > Verify that Login button is disabled When Password is not filled in', function () {
    logInPage.typeEmailAddress(this.data.userData.email)
    logInPage.getLogInBtn().should('be.disabled')
  })

  it('TC_01.21 > Verify that Login button is disabled When Email is not filled in', function () {
    logInPage.typeEmailAddress(this.data.userData.password)
    logInPage.getLogInBtn().should('be.disabled')
  })

})