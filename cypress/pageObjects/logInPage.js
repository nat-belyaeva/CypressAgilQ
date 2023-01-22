class LogInPage {
    elements = {
        getEmailAddressInput: () => cy.get('[name="loginId"]'),
        getPasswordInput: () => cy.get('[name="password"]'),
        getForgotPasswordLink: () => cy.get('.forgot-pass-link '),
        getLogInBtn: () => cy.get('.login-btn'),
        getConformationPopUp: () => cy.get('.popup'),
        getOkBtnConfirmPopUp: () => cy.get('.control-bt-1'),
        getErrorTextPopup: () => cy.get('.error-content'),
        getErrorIcon: () => cy.get('error-icon'),
        getForgotPasswordForm: () => cy.get('.sign-form-container'),
        getForgotPasswordCrossBtn: () => cy.get('.sign-form-header .close-icon'),
        getHeaderForgotPasswordText: () => cy.get('.sign-form-header'),
        getForgotPasswordText: () => cy.get('.sign-in-text'),
        getForgottenEmailInput: () => cy.get('#forgottenEmail'),
        getForgottenOkBtn: () => cy.get('.ok-btn'),
        getTextEmailSentSuccessfully: () => cy.get('.forgot-pass-completion')

    };

    typeEmailAddress(userEmail) {
        this.elements.getEmailAddressInput().type(userEmail,{log:false});
    };

    typePassword(userPassword) {
        this.elements.getPasswordInput().type(userPassword, {log:false});
    };

    clickLogInBtn() {
        this.elements.getLogInBtn().click({force:true});
    };

    logIn(email, password) {
        this.typeEmailAddress(email, {log: false});
        this.typePassword(password, {log: false});
        this.clickLogInBtn();
    };

    clickOkBtnConfirmPopUp() {
        this.elements.getOkBtnConfirmPopUp().click({force: true});
    };

    clickForgotPasswordLink() {
        this.elements.getForgotPasswordLink().click({force: true});
    };

    typeForgottenEmail(email) {
        this.elements.getForgottenEmailInput().type(email, {log:false});
    };

    clickForgottenOkBtn() {
        this.elements.getForgottenOkBtn().click({force: true});
    }
    sendForgottenEmail(email) {
        this.typeForgottenEmail(email);
        this.clickForgottenOkBtn();
    }
};

export default LogInPage;