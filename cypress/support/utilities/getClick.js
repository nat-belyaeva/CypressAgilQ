export default function click (locatorClick, locatorWait) {
  cy.get(locatorClick).should('be.visible').click({ force: true })
  cy.wait(1000)
  cy.get('body').then(el => {
    if (el.find(locatorWait).length) {
      console.log('button is clicked')
    } else {
      console.log('button is not clicked')
      click(locatorClick, locatorWait)
    }
  })
}