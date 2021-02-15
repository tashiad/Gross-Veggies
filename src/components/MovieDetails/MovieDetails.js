import React, { Component } from 'react'
import './MovieDetails.css'
import { Link } from 'react-router-dom'
import Trailer from '../Trailer/Trailer'
import { fetchSingleMovie, fetchVideos } from '../../apiCalls'

class MovieDetails extends Component {
  constructor() {
    super()
    this.state = {
      currentMovie: {},
      trailer: [],
      isLoading: false,
      error: ''
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetchSingleMovie(this.props.id)
      .then(currentMovie => this.setState({ currentMovie: currentMovie.movie }))
      .then(() => fetchVideos(this.props.id))
      .then(trailer => this.setState({ trailer: trailer.videos }))
      .catch(error => this.setState({ currentMovie: '', error: `${error.name}: ${error.message}` }))
      .finally(() => this.setState({ isLoading: false }))
  }

  getVideo = () => {
    const foundTrailer = this.state.trailer.find(v => v.type === "Trailer")

    if (foundTrailer.site === 'YouTube') {
      return (
        <>
          <div className="trailer">
            <h3 className="trailer-label">Trailer</h3>
            <Trailer url={`https://www.${foundTrailer.site.toLowerCase()}.com/watch?v=${foundTrailer.key}`} />
          </div>
        </>
      )
    } else {
      return null
    }
  }

  formatGenres = movieGenres => {
    return movieGenres.map((genre, index) => {
      return <span key={index} className="movie-genre">{genre}</span>
    })
  }

  formatDate = movieDate => {
    const date = new Date(movieDate)
    const fullMonth = date.toLocaleString('default', { month: 'long' })
    const formattedDate = `${fullMonth} ${date.getDay()}, ${date.getFullYear()}`
    return formattedDate
  }

  formatRuntime = movieRuntime => {
    const runtimeHours = Math.floor(movieRuntime / 60)
    const runtimeMinutes = movieRuntime % 60
    const formattedRuntime = runtimeHours === 1 ?
      `${runtimeHours} hour, ${runtimeMinutes} mins` :
      `${runtimeHours} hours, ${runtimeMinutes} mins`
    return formattedRuntime
  }

  formatCurrency = movieMoney => {
    return movieMoney.toLocaleString("en-US", { style: "currency", currency: "USD" })
  }

  render() {
    const { currentMovie, trailer, error, isLoading } = this.state

    return (
      <>
        {isLoading && <h2 className="loading">Loading movie...</h2>}
        {error && <h2 className="error-message">{error}</h2>}

        {currentMovie &&
          <>
            <section className="movie-banner">
              <img
                className="movie-backdrop"
                src={currentMovie.backdrop_path}
                alt={`backdrop for ${currentMovie.title}`}
              />
              <h2 className="movie-title">{currentMovie.title}</h2>
            </section>
            <Link to="/">
              <button className="back-button"> ⬅ Back < /button>
            </Link>
            <section className="full-movie-details">
              <div className="movie-info-container">
                <img
                  className="movie-details-poster"
                  src={currentMovie.poster_path}
                  alt={`poster for ${currentMovie.title}`}
                />
                <div className="movie-info">
                  {!currentMovie.tagline ? null : <p className="movie-tagline">"{currentMovie.tagline}"</p>}
                  {!currentMovie.average_rating ? null : <p className="movie-rating"><span className="tomato">🍅</span>{currentMovie.average_rating.toFixed(1)}/10 gross veggies</p>}
                  {!currentMovie.genres ? null : <div className="movie-genres-container">{this.formatGenres(currentMovie.genres)}</div>}
                  {!currentMovie.release_date ? null : <p><span className="movie-details-label">Release Date: </span>{this.formatDate(currentMovie.release_date)}</p>}
                  {!currentMovie.runtime ? null : <p><span className="movie-details-label">Runtime: </span>{this.formatRuntime(currentMovie.runtime)}</p>}
                  {!currentMovie.budget ? null : <p><span className="movie-details-label">Budget: </span>{this.formatCurrency(currentMovie.budget)}</p>}
                  {!currentMovie.revenue ? null : <p><span className="movie-details-label">Revenue: </span>{this.formatCurrency(currentMovie.revenue)}</p>}
                </div>
              </div>
              {!currentMovie.overview ? null :
                <div className="movie-overview">
                  <h3 className="overview-label">Overview</h3>
                  <p className="overview-text">{currentMovie.overview}</p>
                </div>
              }
            </section>
            {trailer.length && this.getVideo()}
          </>
        }
      </>
    )
  }
}

export default MovieDetails
