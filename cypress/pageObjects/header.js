class Header {
    elements = {
        getUserProfileBtn: () => cy.get('.user-button'),
        getLogo: () => cy.get('.logo')
    };
    };
export default Header;