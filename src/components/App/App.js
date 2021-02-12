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
      error: '',
      loading: true
    }
  }

  componentDidMount() {
    fetchMovies()
    .then(allMovies => this.setState({ movies: allMovies.movies, loading: false }))
    .catch(error => this.setState({ error: 'Unable to reach movie database. Please refresh the page or try again later.' }))
  }

  render() {
    return(
      <>
        <header>
          <div className="logo">
            <iframe src="https://giphy.com/embed/vhmqZP2vm1Nfy" width="50" height="50" frameBorder="0" className="giphy-embed" title="dancing-tomato"></iframe>
            <h1>Rancid<span className="tomatillos">Tomatillos</span></h1>
          </div>
          <h2>Movie ratings and more.</h2>
        </header>

        <div className='errors'>
          {this.state.loading && !this.state.error &&
            <h2 className="loading">Loading...</h2>}

          {this.state.error &&
            <h2 className="error-message">{this.state.error}</h2>}
        </div>

        <Route
          exact path="/"
          render={() => <Homepage movies={this.state.movies} />}
        />

        <Route
          path="/movie/:id"
          render={({ match }) => <MovieDetails id={match.params.id}/>}
        />
      </>
    )
  }
}

export default App
