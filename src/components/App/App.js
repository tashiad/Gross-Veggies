import React, { Component } from 'react'
import './App.css'
import Homepage from '../Homepage/Homepage'
import movieData from '../../movieData'
import MovieDetails from '../MovieDetails/MovieDetails'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: movieData.movies,
      currentMovie: ''
    }
  }

  openDetails = (id) => {
    const foundMovie = this.state.movies.find(movie => movie.id === id)
    this.setState({
      movies: movieData.movies,
      currentMovie: foundMovie
    })
    console.log(foundMovie, this.state.currentMovie)
  }

  render() {
    return(
      <>
        <header>
          <h1>Rancid Tomatillos</h1>
        </header>

        {!this.state.currentMovie && <Homepage 
        movies={this.state.movies}
        openDetails ={this.openDetails}
        />}
        {<MovieDetails
        currentMovie={this.state.currentMovie}
        openDetails ={this.openDetails}
        />}
        
      </>
    )
  }
}

export default App
