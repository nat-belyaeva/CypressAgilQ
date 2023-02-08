export default function checkCurrentDate(date) {
    let currentDate = new Date()

    let dateResult = `${currentDate.toLocaleString("en-US",
        { timeZone: "Europe/Moscow", month: 'short' })} ${currentDate.toLocaleString("en-US",
        { timeZone: "Europe/Moscow", day: '2-digit' })}, ${currentDate.getFullYear()}`;
    console.log(dateResult)

    let dateVerified = JSON.stringify(new Date(date));
    let dateFinalResult = JSON.stringify(new Date(dateResult));

   // cy.wrap(dateVerified).should('eq', dateFinalResult);
    return dateVerified === dateFinalResult;
}