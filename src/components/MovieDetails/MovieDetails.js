import React from 'react'
import './MovieDetails.css'

const MovieDetails = ({currentMovie, clearCurrentMovie}) => {
  const formattedGenres = currentMovie.genres.map((genre, index) => {
    return (<span key={index} className="genre">{genre}</span>)
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
      <section className='banner'>
        <h2>{currentMovie.title}</h2>
        <img className='backdrop' src={currentMovie.backdrop_path} alt={`backdrop for ${currentMovie.title}`}/>
      </section>
      <button className="back-to-main" onClick={clearCurrentMovie}>Back To The Main Page</button>
      <section className='full-movie-details'>
        <img className='details-poster'src={currentMovie.poster_path} alt={`poster for ${currentMovie.title}`}/>
        <div className='movie-info'>
          {currentMovie.genres && <p><span className="label">Genre: </span>{formattedGenres}</p>}
          {currentMovie.average_rating && <p><span className="tomato">🍅</span>{currentMovie.average_rating}/10 gross veggies</p>}
          {currentMovie.tagline && <p className="tagline">{currentMovie.tagline}</p>}
          {currentMovie.release_date && <p><span className="label">Release Date: </span>{formattedDate}</p>}
          {currentMovie.runtime && <p><span className="label">Runtime: </span>{formattedRuntime}</p>}
          {currentMovie.budget && <p><span className="label">Budget: </span>{currentMovie.budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>}
          {currentMovie.revenue && <p><span className="label">Revenue: </span>{currentMovie.revenue.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>}
        </div>
        {currentMovie.overview && <p className='movie-overview'>{currentMovie.overview}</p>}
      </section>
    </>
  )
}

export default MovieDetails
