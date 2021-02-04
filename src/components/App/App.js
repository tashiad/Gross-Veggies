import React, { Component } from 'react'
import './App.css'
import '../Homepage/Homepage'
import movieData from '../movieData'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: movieData
    }
  }

  render() {
    return(
      <>
        <header>
          <h1>Rancid Tomatillos</h1>
        </header>
        <Homepage movies={this.state.movies}/>
      </>
    )
  }
}

export default App
