import React, { Component } from 'react'
import './App.css'
import Homepage from '../Homepage/Homepage'
import MovieDetails from '../MovieDetails/MovieDetails'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      currentMovie: '',
      error: '',
      loading: true
    }
  }

  componentDidMount() {
    // refactor: if id then movie detail if not then all posters
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => response.json())
      .then(data => this.setState({
        movies: data.movies,
        currentMovie: '',
        error: '',
        loading: false
      }))
      .catch(error => this.setState({ error }))
  }

  clearCurrentMovie = () => {
    this.setState({
      ...this.state.movies,
      currentMovie: ''})
  }

  openDetails = (id) => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
      .then(response => response.json())
      .then(data => this.setState({
        ...this.state.movies,
        currentMovie: data.movie
      }))
      .catch(error => this.setState({ error }))
  }

  render() {
    return(
      <>
        <header>
          <h1>Rancid Tomatillos</h1>
        </header>

        <div className='errors'>
          {this.state.loading && !this.state.error &&
            <h2 className="loading">Loading...</h2>}

          {this.state.error &&
            <h2 className="error-message">Something went wrong! Couldn't find any movies 🧐</h2>}
        </div>

        {!this.state.currentMovie &&
          <Homepage
            movies={this.state.movies}
            openDetails ={this.openDetails}
          />
        }

        {this.state.currentMovie &&
          <MovieDetails
            currentMovie={this.state.currentMovie}
            clearCurrentMovie={this.clearCurrentMovie}
          />
        }
      </>
    )
  }
}

export default App
