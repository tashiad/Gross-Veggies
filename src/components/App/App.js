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


  searchByTitle = (searchCriteria) => {

   
    // const movieList = this.state.movies.filter(movie => movie.title.toLowerCase().includes(searchCriteria))

    // if(typeof searchCriteria === string)
    const movieList = this.state.movies.filter(movie => {
      console.log(parseInt(searchCriteria), movie.average_rating)
      console.log(typeof parseInt(searchCriteria), typeof movie.average_rating)
      const searchedRating = parseInt(searchCriteria) 
      if (movie.average_rating > searchedRating) {
        return movie
      }

    })


    // let movieList = []
    // this.state.movies.filter(movie => {
    //   console.log(parseInt(title), movie.average_rating)
    //   if(movie.average_ratings > parseInt(title)) {
    //    return movieList.push(movie)
    //   }
    //  return movieList
    // })
  
    console.log(movieList)
    
    this.setState({
      searchedTitles: movieList
    })
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
