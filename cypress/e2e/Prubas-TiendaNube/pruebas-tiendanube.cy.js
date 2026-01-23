describe("Suite de pruebas Lavigne Auto Partes", () => {
 })

    beforeEach(() => {
      cy.visit('https://lavigneautopartes.mitiendanube.com/')

 })


    it("validar pagina de inicio", () => {

      cy.get('.js-search-container > [name="q"]').should("be.visible")
      cy.get('.logo-img').should("be.visible")
      cy.get('.span4.hidden-phone > :nth-child(2) > #ls_cart_widget > #ajax-cart > .js-toggle-cart').should("be.visible")
      cy.get('.p-left-quarter').should("be.visible") 
      cy.get('#auth > .border-right').should("be.visible")
      cy.get('.js-home-sections-container').contains("Casa de Autopartes Multimarca")
      cy.get('.container > .row-fluid > :nth-child(3)').contains("lavigne.autopartes@gmail.com")

})


    it("crear usuario en Lavigne Auto Partes exitoso", () => {
      cy.get('#auth > .border-right').click()
      cy.get(':nth-child(2) > [name="name"]').click().type("Juan Perez")
      cy.get(':nth-child(3) > [name="email"]').click().type("mateoburatti044@gmail.com")
      cy.get('[name="phone"]').click().type("+54 1137664896")
      cy.get('[name="password"]').click().type("Juan1234")
      cy.get('[name="password_confirmation"]').click().type("Juan1234")
      cy.get('.js-recaptcha-button').click()
      cy.get('.js-account-validation-pending').contains("Te enviamos un email para validar tu cuenta.")
      cy.get("#container > div.js-main-content.main-content > div.js-body-position.container > div > div.container > div > div > div.js-account-validation-success.alert.alert-success.m-top-double > p").contains("¡Cuenta validada! Ya puedes iniciar sesión.")
 })

       it("iniciar sesion usuario creado", () => {
         cy.get('.p-left-quarter').click()
         cy.get('#login-form > :nth-child(1) > [name="email"]').click().type("mateoburatti044@gmail.com")
         cy.get('[name="password"]').click().type("Juan1234")
         cy.get('.row-fluid > .btn').click()
 
    })


       it("validar busqueda de productos", () => {
        cy.get('.js-search-container > [name="q"]').click().type("capot")
        cy.get('.js-search-container > .btn').click()
        cy.get('[data-store="product-item-118494865"] > .js-item-product').click()

     })


       it("Realizar compra exitosa", () => {
        cy.get('.js-search-container > [name="q"]').click().type("capot")
        cy.get('.js-search-container > .btn').click()
        cy.get('[data-store="product-item-118494865"] > .js-item-product').click()
        cy.get('.product-buy-container > .js-prod-submit-form').click()
        cy.get('[name="go_to_checkout"]').click()
        cy.get('[data-testid="email"]').click().type("mateoburatti044@gmail.com")
        cy.get('[data-testid="shippingAddress_zipcode"]').click().type("7609")
        cy.get('[data-testid="btnSubmitZipcode"]').click()
        cy.get('[data-testid="billing_country"]').select("AR")
        cy.get('[data-testid="billing_first_name"]').click().type("Juan")
        cy.get('[data-testid="billing_last_name"]').click().type("Perez")
        cy.get('[data-testid="billing_address"]').click().type("Calle falsa 123")
        cy.get('[data-testid="billing_number"]').click().type(1137664896)
        cy.get('[data-testid="billing_city"]').click().type("Mar del Plata")
        cy.get('[data-testid="billing_zipcode"]').click().type("7609")
        cy.get('[data-testid="billing_state"]').select("Buenos Aires")
        cy.get('form > .text-uppercase').click()
        cy.get('.panel-header').should("be.visible")
    



 })