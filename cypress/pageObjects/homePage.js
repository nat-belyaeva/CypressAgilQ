class HomePage {
    elements = {
        getWhatDropdown: () => cy.get('.type-field'),
        getReservationOfWhatDropdown: () => cy.get('#dropdown-menu [data-idx="0"]'),
        getEventOfWhatDropdown: () => cy.get('#dropdown-menu [data-idx="1"]'),
        getLocationInput: () => cy.get('#input-home_geosearch'),
        getSearchLocationResultDropdown: () => cy.get('#geosearch-results-menu'),
        getCrossLocationBtn: () => cy.get('.remove-icon'),
        getAssetCategory: () => cy.get('home_assetCategory'),
        getWhenWidget: () => cy.get('home_when'),
        getWhenPopUp: () => cy.get('.when-popup'),
        getSingleMultiDayTab: () => cy.get('.when-popup')


    }
}