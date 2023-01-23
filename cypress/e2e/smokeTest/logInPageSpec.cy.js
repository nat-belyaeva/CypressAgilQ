/// <reference types="cypress" />

import LogInPage from "../../pageObjects/logInPage";
import Header from "../../pageObjects/header";

const logInPage = new LogInPage();
const header = new Header();

describe ('LogIn test suit', () => {

    beforeEach(function () {
        cy.fixture('logInPage').then(data => this.data = data);
        cy.clearLocalStorage()
        cy.clearCookies();
        cy.visit('/');
    });


    it("TC_01.01 > Verify that User is able to log in to the forum using a valid login and password", function () {
        logInPage.logIn(this.data.userData.email, this.data.userData.password);
        header.elements.getUserProfileBtn().should('be.visible'); //this element is displayed in header after login successfully
    });

    it("TC_01.02 >  Verify that The user is not  able to log in to the forum using invalid login", function () {
        logInPage.logIn(this.data.userData.invalidEmail, this.data.userData.password);
        logInPage.elements.getConformationPopUp().should('be.visible');
        logInPage.elements.getErrorTextPopup().should('have.text', this.data.userData.textConformationPopUp);


    });

    it("TC_01.03 >  Verify that The user is not  able to log in to the forum using invalid password", function () {
        logInPage.logIn(this.data.userData.email, this.data.userData.invalidPassword);
        logInPage.elements.getConformationPopUp().should('be.visible')
        logInPage.elements.getErrorTextPopup().should('have.text', this.data.userData.textConformationPopUp);
        logInPage.clickOkBtnConfirmPopUp();
        logInPage.verifyUserCannotSignInWithIncorrectData() // Смотри loginPage.js

    });

    it("TC_01.04 >Verify that User is able to sent A password reset email to the email address entered", function () {

        logInPage.clickForgotPasswordLink();
        logInPage.elements.getForgotPasswordForm().should('be.visible');
        logInPage.elements.getHeaderForgotPasswordText()
            .should('have.text', this.data.forgotPasswordData.headerText);
        logInPage.sendForgottenEmail(this.data.userData.email);
        logInPage.elements.getTextEmailSentSuccessfully()
            .should('have.text', this.data.forgotPasswordData.textPasswordResetEmail);
    });

    it("TC_01.05 >Verify that User is not able to sent a password reset email to the Invalid email address entered",function () {

        logInPage.clickForgotPasswordLink();

        logInPage.sendForgottenEmail(this.data.forgotPasswordData.incorrectEmail);
        logInPage.elements.getForgottenOkBtn().should('be.disabled');
    });

});