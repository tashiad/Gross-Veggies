
describe('Homepage', () => {

  beforeEach(() => cy.visit('http://localhost:3000'))

  it('Should be able to visit the webpage', () => {
    cy.visit('http://localhost:3000')
  });

  it('Should have an h1 that says Rancid Tomatillos', () => {
    cy.get('h1')
    .contains('Rancid Tomatillos')
  });

  it('Should render a poster', () => {
    cy.get('article')
    .get('h2') 
    .contains('Mulan')
  });
});