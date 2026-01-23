describe("Suite de pruebas orange hrmlive", () => {


 })
    beforeEach(() => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

 })

    it("Validar pagina de inicio", () => {
      cy.wait(10000); // Espera 10 segundos antes de buscar el elemento
      cy.get('.orangehrm-login-branding').should("be.visible")
      cy.get('[name="username"]').should("be.visible")
      cy.get('.orangehrm-copyright-wrapper > :nth-child(1)').contains("OrangeHRM")
      cy.get('.oxd-button').should("be.visible")
      
          
      
    })