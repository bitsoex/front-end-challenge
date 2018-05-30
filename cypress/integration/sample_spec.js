/* global cy */

describe('Example Test', function () {
  it('go to home page', function () {
    cy.visit('http://localhost:2345')

    cy.url()
      .should('include', '/exchange')
  })
})
