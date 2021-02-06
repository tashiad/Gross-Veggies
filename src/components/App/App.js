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
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('There be Monsters')
        }
      })
      .then(data => this.setState({
        movies: data.movies,
        currentMovie: '',
        error: '',
        loading: false
      }))
      .catch(error => this.setState({ error: 'Sorry the database of movies could not be reached, please try refreshing the page and if that does not work try again later' }))
  }

  openDetails = (id) => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('There be An Ogre')
        }
      })
      .then(data => this.setState({
        currentMovie: data.movie
      }))
      .catch(error => this.setState({ error: 'We could not find the movie you were looking for, please try another film' }))
  }

  clearCurrentMovie = () => {
    this.setState({currentMovie: ''})}


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
            <h2 className="error-message">{this.state.error}</h2>}
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
