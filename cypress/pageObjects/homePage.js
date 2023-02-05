class HomePage {
    elements = {
        getWhatDropdown: () => cy.get('#dropdown_1'),
        getWhatInput: () => cy.get('.dropdown-input'),
        getDefaultValue: () => cy.get('[value="Reservation"]'),
        getEventOfWhatDropdown: () => cy.get('[data-idx="1"]'),
        getReservationOfWhatDropdown: () => cy.get('[data-idx="1"]'),
        getReserveOrEventDropdown: () => ('#dropdown-menu'),
        getWhereMultiLocation: () => cy.get('#input-home_geosearch_geosearch'),
        getLocationInput: () => cy.get('#input-home_geosearch'),
        getSearchLocationResultDropdown: () => cy.get('#geosearch-results-menu'),
        getCancelBtnWherePopUp: () => cy.get('.buttons-row .button-primary[style="text-overflow: initial;"]').eq(0),
        getCrossLocationBtn: () => cy.get('.remove-icon'),
        getAssetCategory: () => cy.get('home_assetCategory'),
        getCurrentDate: () => cy.get('#home_when'),
        getWhenPopUp: () => cy.get('.when-popup'),
        getSingleMultiDayTab: () => cy.get('.when-popup'),
        getWhatTypeAsset: () => cy.get('[placeholder="What"]'),
        getListAssetTypes: () => cy.get('#dropdown-menu .drop-down-option'),
        getSearchByListBtn: () => cy.get('#searchByListBtn'),
        getSearchByCalendar: () => cy.get('#searchByCalendarBtn'),
        getSearchByFloorPlatBtn: () => cy.get('#searchByFloorPlanBtn'),
        getListAvailableAssets: () => cy.get('.search-result-list'),
        getBookBntForFirstAvailableAsset: () => cy.get('.search-result-item').eq(0).find('.button-primary'),

    };

    reserveForm = {
        getReserveForm: ()  => cy.get('.reservation-form'),
        getSubmitBtn: () => cy.get('.button-primary[type="submit"]'),
        getAddAssetBtn: () => cy.get('.buttons-separator .button-primary[type="button"]'),
        getReservationNameInput: () => cy.get('#name'),
        getPrivateCheckbox: () => cy.get('.bigCheckbox[type="checkbox"]#res-private'),
        getChangeOwnerBnt: () => cy.get('#owner-section-change-owner-button'),
        getMsTeamsCheckbox: () => cy.get('[for="meeting-type-1"]').eq(1),
        getInviteesBtn: () => cy.get('.display-inv-grid-icon'),
        getNewChangeOwnerPopUp: () => cy.get('.popup-content-wrapper'),
        getNewChangeOwnerPopUpText: () => cy.get('.owner-section-header'),
        getSearchForPearsonInputChangeOwner: () => cy.get('.simplified-user-search-widget-search'),

    }
    selectEventOfWhatDropdown() {
        this.elements.getWhatDropdown()
            .trigger('mouseover')
            .click();
        this.elements.getEventOfWhatDropdown()
            .trigger('mouseover')
            .click();
    };
    typeLocation(location) {
        this.elements.getLocationInput()
            .trigger('mouseover')
            .type(location);
    };
    selectLocationFromDropdown(resLocation) {
        this.elements.getSearchLocationResultDropdown()
            .find('.drop-down-option')
            .contains(resLocation).should('be.visible')
            .click({ force: true });
    };

    findLocation(locationName, resLocation) {
        this.typeLocation(locationName, { force: true });
        this.selectLocationFromDropdown(resLocation);
    };

    clickCancelBtnWherePopUp() {
        this.elements.getCancelBtnWherePopUp().click({ force: true });
    };
    clickCrossLocationBtn() {
        this.elements.getCrossLocationBtn()
            .wait(800)
            .click({force:true});
    };

    deleteLocation(locationType, resLoc) {
        this.findLocation(locationType, resLoc);
        this.clickCrossLocationBtn();
    };

    clickWhatField() {
        this.elements.getWhatTypeAsset()
            .trigger('mouseover')
            .click();
    };

    checkElementOfAssetTypes(el, index) {
        this.clickWhatField();
        this.elements.getListAssetTypes().eq(index)
            .trigger('mouseover')
            .click();
        this.elements.getWhatTypeAsset()
            .invoke('val')
            .should('eq', el);
        cy.wait(1000);
    };

    clickSearchByListBtn() {
        this.elements.getSearchByListBtn()
            .should('be.enabled')
            .click({force:true});
    };

    clickBookBtnForAvlBtn() {
        this.elements.getBookBntForFirstAvailableAsset()
            .should('be.visible')
            .click({force:true});
    };

    typeReservationName(reservationName) {
        this.reserveForm.getReservationNameInput()
            .should('be.visible')
            .click()
            .wait(500)
            .type(reservationName, {force:true});

    };

    clickChangeOwnerBtn() {
        this.reserveForm.getChangeOwnerBnt()
            .should('be.visible')
            .click({force:true});
    };

    checkPrivateCheckbox() {
        this.reserveForm.getPrivateCheckbox().check({force:true}).should('be.checked');
    };

    uncheckPrivateCheckbox() {
        this.checkPrivateCheckbox()
        this.reserveForm.getPrivateCheckbox().uncheck({force:true}).should('not.be.checked');
    };

    clickInviteesBtn() {
        this.reserveForm .getInviteesBtn().should('be.visible').click({force:true});

    };
    checkMsTeams() {
        this.reserveForm.getMsTeamsCheckbox().check({force:true});

    };

    uncheckMsTeams() {
        this.reserveForm.getMsTeamsCheckbox().check({force:true}).should('be.checked');
        this.reserveForm.getMsTeamsCheckbox().uncheck({force:true});

    };

    typeNewChangeOwner(newOwner) {
        this.clickChangeOwnerBtn();
        this.reserveForm.getNewChangeOwnerPopUp().type(newOwner);
    };
    clickSubmitBtn() {
        this.reserveForm.getSubmitBtn().should('be.enabled').click({force:true})
    };

};

export default HomePage;