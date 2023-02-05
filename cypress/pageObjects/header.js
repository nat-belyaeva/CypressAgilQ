class Header {

        getUserProfileBtn = () => cy.get('.user-button');
        getLogo = () => cy.get('.logo');
        getMyReservationAndRequestLink = () => cy.get('.toolbar-myreservations-link a[href="/myreservations"]');


        //actions

    clickUserProfileBtn() {
        this.getUserProfileBtn
            .wait(500)
            .click({force:true});
    }


    }
export default Header;