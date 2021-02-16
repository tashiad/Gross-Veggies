import React, { Component } from 'react'
import './App.css'
import Header from '../Header/Header'
import Form from '../Form/Form'
import Homepage from '../Homepage/Homepage'
import MovieDetails from '../MovieDetails/MovieDetails'
import { Route } from 'react-router-dom'
import { fetchMovies } from '../../apiCalls'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      filteredMovies: [],
      isLoading: false,
      error: ''
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetchMovies()
    .then(allMovies => this.setState({ movies: allMovies.movies }))
    .catch(error => this.setState({ error: `${error.name}: ${error.message}` }))
    .finally(() => this.setState({ isLoading: false }))
  }

  filterMovies = (searchCriteria) => {
    let movieList

    if(!isNaN(searchCriteria)) {
      movieList = this.state.movies.filter(movie => {
        if (movie.average_rating > parseInt(searchCriteria)) {
          return movie
        }
      })
    } else if (typeof(searchCriteria) === 'string') {
      movieList = this.state.movies.filter(movie => movie.title.toLowerCase().includes(searchCriteria))
    }

    this.setState({ filteredMovies: movieList })
  }

  render() {
    const { movies, isLoading, error, filteredMovies } = this.state

    return(
      <>
        <Header />

        <Route
          exact path="/"
          render={() =>
            <div className='form-and-posters'>
              <Form filterMovies={this.filterMovies}/>
              <Homepage
                filteredMovies={filteredMovies}
                movies={movies}
                isLoading={isLoading}
                error={error}
              />
            </div>
          }
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
