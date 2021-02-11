describe('Homepage', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Should have correct header and subheader', () => {
    cy
    .get('header').contains('h1', 'RancidTomatillos')
    .get('header').contains('h2', 'Movie ratings and more.')
  })

  it('Should show movie data on page load', () => {
    cy.fixture('mock-movie-data.json')
    .then((response) => {
      cy.intercept({
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
      }, {
        statusCode: 200,
        body: response
      })
    })
    .get('.poster-title').contains('Money Plane')
    .get('.poster-img').should('have.attr', 'src').should('include', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
    .get('.poster-rating').contains('6.1/10')
  })


  it('Should be able to click on a movie poster', () => {
    cy.get('.poster:first').click()

    cy.fixture('mock-movie-data.json')
    .then((response) => {
      cy.intercept({
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919',
      }, {
        statusCode: 200,
        body: response
      })
    })
    .url().should('include', '/movie/694919')
    .get('.movie-title').contains('Money Plane')
  })

  it('Should have a funtional back button from the movie details page', () => {
    cy.visit('http://localhost:3000/movie/694919')
    .get('.back-button').click()
    .get('header').contains('h2', 'Movie ratings and more.')
    // .url().should.('include','http://localhost:3000/')
  })  

})