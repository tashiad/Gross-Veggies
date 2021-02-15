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
      searchedTitles: [],
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


  searchByTitle = (title) => {

    console.log(title)
    const movieList = this.state.movies.filter(movie => movie.title === title )
    this.setState({
      searchedTitles: movieList
    })
    console.log(this.state)
    // this.SetState({
    //   searchedTitles: list
    // })
  }

  render() {
    const { movies, isLoading, error, searchedTitles } = this.state

    return(
      <>
        <Header />
       
        <Route
          exact path="/"
          render={() =>
            <>
              <Form searchByTitle={this.searchByTitle}/>
              <Homepage
                searchedTitles={searchedTitles}
                movies={movies}
                isLoading={isLoading}
                error={error}
              />
            </>
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
