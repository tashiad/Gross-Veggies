import React, { Component } from 'react'
import './App.css'
import Homepage from '../Homepage/Homepage'
import MovieDetails from '../MovieDetails/MovieDetails'
import { Route } from 'react-router-dom'
import { fetchMovies } from '../../apiCalls'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      isLoading: false,
      error: ''
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetchMovies()
    .then(allMovies => this.setState({ movies: allMovies.movies }))
    .catch(error => this.setState({ error: error.message }))
    .finally(() => this.setState({ isLoading: false }))
  }

  render() {
    const { movies, isLoading, error } = this.state

    return(
      <>
        <header>
          <div className="logo">
            <iframe src="https://giphy.com/embed/vhmqZP2vm1Nfy" width="50" height="50" frameBorder="0" className="giphy-embed" title="dancing-tomato"></iframe>
            <h1>Rancid<span className="tomatillos">Tomatillos</span></h1>
          </div>
          <h2>Movie ratings and more.</h2>
        </header>

        {isLoading && <h2 className="loading">Loading...</h2>}
        {error && <h2 className="error-message">{error}</h2>}

        <Route exact path="/" render={() => <Homepage movies={movies} />}/>

        <Route
          path="/movie/:id"
          render={({ match }) => <MovieDetails id={match.params.id}/>}
        />
      </>
    )
  }
}

export default App
