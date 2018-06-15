/* global cy describe it */

describe('Example Test', function () {
  it('go to home page', function () {
    cy.visit('http://localhost:4000')

    cy.url()
      .should('include', '/exchange')
  })
})
