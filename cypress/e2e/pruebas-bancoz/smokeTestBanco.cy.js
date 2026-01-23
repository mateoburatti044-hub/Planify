describe("Test suit - Conjunto de pruebas", () => {
    
 })

 beforeEach(() => {
  cy.visit('http://zero.webappsecurity.com/')
 })


 it("pagina de inicio validacion" , () => {
   cy.get(".active > img").should("be.visible")
   cy.get('.active > .custom > p').contains("Online Banking")

 })

 it("Prueba E2E - transferencia de fondos" , () => {
   cy.get('#signin_button').click()
   cy.get('[name="user_login"]').type("username")
   cy.get('[name="user_password"]').type("password")
   cy.get('[name="submit"]').click()
   cy.get('#transfer_funds_tab > a').click()
   cy.get('[name="fromAccountId"]').select("1")
   cy.get('[name="toAccountId"]').select("5")
   cy.get('[name="amount"]').type("300")
   cy.get('[name="description"]').type("Prueba de transaccion exitosa")
   cy.get('#btn_submit').click()
   cy.get('#btn_submit').click()
   cy.get('.alert').contains("You successfully submitted your transaction.")
   


 })

 it("Prueba de Validacion de datos del del mapa de dinero" , () => {
   cy.get('#signin_button').click()
   cy.get('[name="user_login"]').type("username")
   cy.get('[name="user_password"]').type("password")
   cy.get('[name="submit"]').click()
   cy.get('#money_map_tab > a').click()
   cy.get('#summaryReport_header_hd-textEl').contains("Summary")
   cy.get(':nth-child(2) > .x-grid-cell-gridcolumn-1029 > .x-grid-cell-inner').should("be.visible")
   cy.get('.x-grid-row-alt > .x-grid-cell-gridcolumn-1029 > .x-grid-cell-inner').should("be.visible")
   cy.get('.x-grid-cell-gridcolumn-1029 > .x-grid-cell-inner > b').should("be.visible")

 })