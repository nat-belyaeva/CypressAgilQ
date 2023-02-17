class MyReservationsAndRequestsTab {

  //tabs
  getActiveReservationTab = () => cy.get('.active-sub-tab')

  //reservations

  getListOfReservations = () => cy.get('.reservation-tile-list')

}