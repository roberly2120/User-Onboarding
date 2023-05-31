describe("Form App",  () => {
    beforeEach(() => {
    
    cy.visit("http://localhost:3000")
    })

    it("sanity check", () => {
        expect(1 + 1).to.equal(2);
    })


    const nameInput = () => cy.get("input[name=name]");
    const emailInput = () => cy.get("input[name=email]");
    const passwordInput = () => cy.get("input[name=password]");
    const roleSelect = () => cy.get("select[name=role]");
    const termsInput = () => cy.get("input[name=terms]");
    const submitBtn = () => cy.get("button[id='submit']");

    it("the right input elements are showing", () => {
        nameInput().should("exist");
        emailInput().should("exist");
        passwordInput().should("exist");
        roleSelect().should("exist");
        termsInput().should("exist");
        submitBtn().should("exist");
    })

    it("user can use all inputs and submit them", () => {
        nameInput().type("Ryan Oberly");
        emailInput().type("rover2120@yahoo.com");
        roleSelect().select("Management");
        passwordInput().type("catsname1234");
        termsInput().check();
        submitBtn().click();
        cy.contains("Ryan Oberly").should("exist");
    })

    it("user can type a name into name input", () => {
        nameInput().type("Someone Else");
        nameInput().should("have.value", "Someone Else");
        nameInput().clear();
    })
    it("user can type an email into email input", () => {
        emailInput().type("email@email.com")
        emailInput().should("have.value", "email@email.com");
        emailInput().clear();
    })
    it("user can type a password into password input", () => {
        passwordInput().type("1234567");
        passwordInput().should("have.value", "1234567");
        passwordInput().clear();
    })
    it("user can check and uncheck checkbox for terms and conditions", () => {
        termsInput().should("not.be.checked");
        termsInput().check();
        termsInput().should("be.checked");
        termsInput().uncheck();
        termsInput().should("not.be.checked");
    })
    it("username form validation functions properly", () => {
        nameInput().type("a");
        nameInput().clear();
        cy.contains("Username is a required field!").should("exist");
            
        
    })

})