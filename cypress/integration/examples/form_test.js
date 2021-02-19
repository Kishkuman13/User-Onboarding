describe('User Onboarding Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  const nameInput = () => cy.get('input[name=name]')
  const emailInput = () => cy.get('input[name=email]')
  const passwordInput = () => cy.get('input[name=password]')
  const tosCheckbox = () => cy.get('input[name=tos]')
  const submitBtn = () => cy.get('button')

  describe('Input Tests', () => {
    it('Name Input Test', () => {
      nameInput()
        .should('exist')
        .type('Billy')
        .should('have.value', 'Billy')
    })
    it('Email Input Test', () => {
      emailInput()
        .should('exist')
        .type('billy@email.com')
        .should('have.value', 'billy@email.com')
    })
    it('Password Input Test', () => {
      passwordInput()
        .should('exist')
        .type('1234abcd')
        .should('have.value', '1234abcd')
    })
    it('Terms of Service Checkbox Test', () => {
      tosCheckbox()
        .should('exist')
        .click()
        .should('have.value', 'on')
    })
  })
  describe('Submit Form Data', () => {
    it('Fill out form and enter data', () => {
      nameInput().type('John Doe')
      emailInput().type('jd@email.com')
      passwordInput().type('johndoe123')
      tosCheckbox().click()
      submitBtn().click()
      cy.contains('John Doe').should('exist')
      cy.contains('jd@email.com').should('exist')
      cy.contains('johndoe123').should('exist')
    })
    it('Form Validation Errors', () => {
      nameInput().type('John Doe').clear()
      emailInput().type('jd@email.com').clear()
      passwordInput().type('johndoe')
      tosCheckbox().click().click()
      cy.contains('Name required').should('exist')
      cy.contains('Email required').should('exist')
      cy.contains('Password must be at least 8 characters').should('exist')
      cy.contains('Accept Terms of Service').should('exist')
    })
  })
})