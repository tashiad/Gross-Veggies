import React, { Component } from 'react'
import './App.css'
import Homepage from '../Homepage/Homepage'
import MovieDetails from '../MovieDetails/MovieDetails'
import {Route, Switch} from 'react-router-dom'

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
        error: '',
        loading: false
      }))
      .catch(error => this.setState({ error: 'Unable to reach movie database. Please refresh the page or try again later.' }))
  }

  // openDetails = (id) => {
  //   fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json()
  //       } else {
  //         throw new Error('There be an Ogre')
  //       }
  //     })
  //     .then(data => this.setState({
  //       currentMovie: data.movie
  //     }))
  //     .catch(error => this.setState({ error: 'Unable to find the movie you were looking for. Please try another movie.' }))
  // }

  clearCurrentMovie = () => {
    this.setState({currentMovie: ''})}

  render() {
    return(
      <>
        <header>
          <iframe src="https://giphy.com/embed/vhmqZP2vm1Nfy" width="50" height="50" frameBorder="0" className="giphy-embed" title="dancing-tomato"></iframe>
          <h1>Rancid<span className="tomatillos">Tomatillos</span></h1>
        </header>

        <div className='errors'>
          {this.state.loading && !this.state.error &&
            <h2 className="loading">Loading...</h2>}

          {this.state.error &&
            <h2 className="error-message">{this.state.error}</h2>}
        </div>

              
        
        {/* {!this.state.currentMovie &&
          <Homepage
            movies={this.state.movies}
            openDetails ={this.openDetails}
          />
        } */}

      <Switch>
        <Route 
          path='/movies/:movieId'
          render={({match}) => {

            const {movieId} = match.params

            console.log(movieId)
            return (<MovieDetails movieId={movieId}/>)
          }}
        />
        <Route path="/" render={() =>
          <Homepage
            movies={this.state.movies}
          />}
        />
      </Switch>
        {/* {this.state.currentMovie &&
          <MovieDetails
            currentMovie={this.state.currentMovie}
            clearCurrentMovie={this.clearCurrentMovie}
          />
        } */}
      </>
    )
  }
}

export default App
