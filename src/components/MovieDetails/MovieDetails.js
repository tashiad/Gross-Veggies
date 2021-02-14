import React, { Component } from 'react'
import ReactPlayer from "react-player/youtube"
import './MovieDetails.css'
import { Link } from 'react-router-dom'
import { fetchSingleMovie, fetchVideos } from '../../apiCalls'

class MovieDetails extends Component {
  constructor() {
    super()
    this.state = {
      currentMovie: {},
      videos: [],
      error: '',
      loading: true
    }
  }

  componentDidMount() {
    fetchSingleMovie(this.props.id)
    .then(currentMovie => this.setState({ currentMovie: currentMovie.movie }))
    .then(() => fetchVideos(this.props.id))
    .then(videos => this.setState({ videos: videos.videos }))
    .then(() => this.setState({ loading: false }))
    .catch(error => this.setState({ currentMovie: '', error: 'Unable to find the movie you were looking for. Please try another movie.' }))
  }

  getVideo = (type) => {
    const foundVideo = this.state.videos.find(v => v.type === type);
    return `https://www.${foundVideo.site.toLowerCase()}.com/watch?v=${foundVideo.key}`
  }

  formatGenres = (movie) => {
    return movie.map((genre, index) => {
      return <span key={index} className="movie-genre">{genre}</span>
    })
  }

  formatDate = (movie) => {
    const date = new Date(movie)
    const fullMonth = date.toLocaleString('default', { month: 'long' })
    const formattedDate = `${fullMonth} ${date.getDay()}, ${date.getFullYear()}`
    return formattedDate
  }

  formatRuntime = (movie) => {
    const runtimeHours = Math.floor(movie / 60)
    const runtimeMinutes = movie % 60
    const formattedRuntime = runtimeHours === 1 ?
    `${runtimeHours} hour, ${runtimeMinutes} mins` :
    `${runtimeHours} hours, ${runtimeMinutes} mins`
    return formattedRuntime
  }

  render() {
    const { currentMovie, videos, error, loading } = this.state

    if (currentMovie) {
      return (
          <>
            <section className="movie-banner">
              <img className="movie-backdrop" src={currentMovie.backdrop_path} alt={`backdrop for ${currentMovie.title}`}/>
              <h2 className="movie-title">{currentMovie.title}</h2>
            </section>
            <Link to="/">
              <button className="back-button">⬅ Back</button>
            </Link>
            <section className="full-movie-details">
              <div className="movie-info-container">
                <img className="movie-details-poster"src={currentMovie.poster_path} alt={`poster for ${currentMovie.title}`}/>
                <div className="movie-info">
                  {!currentMovie.tagline ? null : <p className="movie-tagline">"{currentMovie.tagline}"</p>}
                  {!currentMovie.average_rating ? null : <p className="movie-rating"><span className="tomato">🍅</span>{currentMovie.average_rating.toFixed(1)} / 10 gross veggies</p>}
                  {!currentMovie.genres ? null : <div className="movie-genres-container">{this.formatGenres(currentMovie.genres)}</div>}
                  {!currentMovie.release_date ? null : <p><span className="movie-details-label">Release Date: </span>{this.formatDate(currentMovie.release_date)}</p>}
                  {!currentMovie.runtime ? null : <p><span className="movie-details-label">Runtime: </span>{this.formatRuntime(currentMovie.runtime)}</p>}
                  {!currentMovie.budget ? null : <p><span className="movie-details-label">Budget: </span>{currentMovie.budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>}
                  {!currentMovie.revenue ? null : <p><span className="movie-details-label">Revenue: </span>{currentMovie.revenue.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>}
                </div>
              </div>
              {!currentMovie.overview ? null :
                <div className="movie-overview">
                  <h3 className="overview-label">Overview</h3>
                  <p className="overview-text">{currentMovie.overview}</p>
                </div>
              }
            </section>
            {videos.length && (
              <div className="video-wrapper">
                <ReactPlayer
                  controls={true}
                  url={this.getVideo("Trailer")}
                  wrapper="div"
                />
              </div>
            )}
          </>
      )
    } else if (error) {
      return <h2>{error}</h2>
    } else if (loading) {
      return <p>Loading...</p>
    }

  }
}

export default MovieDetails
