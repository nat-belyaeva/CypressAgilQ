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
        getWhenWidget: () => cy.get('home_when'),
        getWhenPopUp: () => cy.get('.when-popup'),
        getSingleMultiDayTab: () => cy.get('.when-popup'),
        getWhatTypeAsset: () => cy.get('[placeholder="What"]'),
        getListAssetTypes: () => cy.get('#dropdown-menu .drop-down-option'),
        getSearchByListBtn: () => cy.get('#searchByListBtn'),
        getSearchByCalendar:() => cy.get('#searchByCalendarBtn'),
        getSearchByFloorPlatBtn: () => cy.get('#searchByFloorPlanBtn'),

    };
    selectEventOfWhatDropdown() {
        this.elements.getWhatDropdown().trigger('mouseover').click();
        //this.elements.getReserveOrEventDropdown();
        this.elements.getEventOfWhatDropdown().trigger('mouseover').click();
    };
    typeLocation(location) {
        this.elements.getLocationInput().trigger('mouseover').type(location);
    };
    selectLocationFromDropdown(resLocation) {
        this.elements.getSearchLocationResultDropdown().find('.drop-down-option').contains(resLocation).click();
    };

    findLocation(locationName, resLocation) {
        this.typeLocation(locationName, {force:true});
        this.selectLocationFromDropdown(resLocation);

    };
    clickCancelBtnWherePopUp() {
        this.elements.getCancelBtnWherePopUp().click({force:true});
    };
    clickCrossLocationBtn() {
        this.elements.getCrossLocationBtn().trigger('mouseover').click({force:true});
    };

    deleteLocation(locationType,resLoc) {
        this.findLocation(locationType, resLoc);
        this.clickCrossLocationBtn();
    };

    clickWhatField() {
        this.elements.getWhatTypeAsset().trigger('mouseover').click();
    };

    checkElementOfAssetTypes(el, index) {
        this.clickWhatField();
        this.elements.getListAssetTypes().eq(index).trigger('mouseover').click();
        this.elements.getWhatTypeAsset().invoke('val').should('eq', el);
        cy.wait(1000);
    };


};
export default HomePage;