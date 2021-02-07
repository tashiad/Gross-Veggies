import React from 'react'
import './MovieDetails.css'

const MovieDetails = ({currentMovie, clearCurrentMovie}) => {
  const formattedGenres = currentMovie.genres.map((genre, index) => {
    return (<span key={index} className="movie-genre">{genre}</span>)
  })

  const date = new Date(currentMovie.release_date)
  const fullMonth = date.toLocaleString('default', { month: 'long' })
  const formattedDate = `${fullMonth} ${date.getDay()}, ${date.getFullYear()}`

  const runtimeHours = Math.floor(currentMovie.runtime / 60)
  const runtimeMinutes = currentMovie.runtime % 60
  const formattedRuntime = runtimeHours === 1 ?
    `${runtimeHours} hour, ${runtimeMinutes} mins` :
    `${runtimeHours} hours, ${runtimeMinutes} mins`

  return (
    <>
      <section className="movie-banner">
        <img className="movie-backdrop" src={currentMovie.backdrop_path} alt={`backdrop for ${currentMovie.title}`}/>
        <h2 className="movie-title">{currentMovie.title}</h2>
      </section>
      <button className="back-button" onClick={clearCurrentMovie}>⬅ Back</button>
      <section className="full-movie-details">
        <div className="movie-info-container">
          <img className="movie-details-poster"src={currentMovie.poster_path} alt={`poster for ${currentMovie.title}`}/>
          <div className="movie-info">
            {!currentMovie.tagline ? null : <p className="movie-tagline">"{currentMovie.tagline}"</p>}
            {!currentMovie.average_rating ? null : <p className="movie-rating"><span className="tomato">🍅</span>{currentMovie.average_rating.toFixed(1)} / 10 gross veggies</p>}
            {!currentMovie.genres ? null : <div className="movie-genres-container">{formattedGenres}</div>}
            {!currentMovie.release_date ? null : <p><span className="movie-details-label">Release Date: </span>{formattedDate}</p>}
            {!currentMovie.runtime ? null : <p><span className="movie-details-label">Runtime: </span>{formattedRuntime}</p>}
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
    </>
  )
}

export default MovieDetails
