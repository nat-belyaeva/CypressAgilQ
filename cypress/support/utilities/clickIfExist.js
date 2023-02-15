export default function clickIfExist(element) {
    cy.get('body').then(el => {
        if(!el.find(element).length) {
            console.log('Splash page is not displayed')
        } else {
            cy.get(element)
                .should('be.visible')
                .wait(500)
                .click({force:true})
        }
    })

}