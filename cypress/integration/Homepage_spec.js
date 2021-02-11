describe('Homepage', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Should have correct header and subheader', () => {
    cy
    .get('header').contains('h1', 'RancidTomatillos')
    .get('header').contains('h2', 'Movie ratings and more.')
  })

})