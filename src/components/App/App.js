import React, { Component } from 'react'
import './App.css'
import Homepage from '../Homepage/Homepage'
import MovieDetails from '../MovieDetails/MovieDetails'
import {Switch, Route} from 'react-router-dom'

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
      .catch(error => this.setState({ error: 'Unable to reach movie database. Please refresh the page or try again later.' }))
  }

  openDetails = (id) => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('There be an Ogre')
        }
      })
      .then(data => this.setState({
        currentMovie: data.movie
      }))
      .then(console.log(this.state.currentMovie))
      .catch(error => this.setState({ error: 'Unable to find the movie you were looking for. Please try another movie.' }))
  }

  clearCurrentMovie = () => {
    this.setState({currentMovie: ''})}

  render() {
    return(

      <Switch>
        <Route
          exact
          path='/:movieId'
          render= {({match}) => {
            const { id } = parseInt(match.params);
            // const movieToRender = this.openDetails(id)
            
            // const clearCurrentMovieMethod = this.clearCurrentMovie
            return (<MovieDetails
              currentMovie={this.currentMovie}
              clearCurrentMovie={this.clearCurrentMovie}
            />)
          }
          }
        />
        <Route path='/' exact  render={() => <Homepage movies={this.state.movies}
        openDetails ={this.openDetails}/>}
        />
      </Switch>
      
      
     


      // <>
      //   <header>
      //     <h1>Rancid Tomatillos</h1>
      //   </header>

      //   <div className='errors'>
      //     {this.state.loading && !this.state.error &&
      //       <h2 className="loading">Loading...</h2>}

      //     {this.state.error &&
      //       <h2 className="error-message">{this.state.error}</h2>}
      //   </div>

      //   {!this.state.currentMovie &&
      //     <Homepage
      //       movies={this.state.movies}
      //       openDetails ={this.openDetails}
      //     />
      //   }

      //   {this.state.currentMovie &&
          // <MovieDetails
          //   currentMovie={this.state.currentMovie}
          //   clearCurrentMovie={this.clearCurrentMovie}
          // />
      //   }
      // </>
    )
  }
}

export default App
