import React from 'react'
import './MovieDetails.css'

const MovieDetails = ({currentMovie, clearCurrentMovie}) => {
  return (
    <>
      <section className='banner'>
        <h2>{currentMovie.title}</h2>
        <img className='backdrop' src={currentMovie.backdrop_path} alt={`backdrop for ${currentMovie.title}`}/>
      </section>
      <button onClick={clearCurrentMovie}>Back To The Main Page</button>
      <section className='full-movie-details'>
        <img className='details-poster'src={currentMovie.poster_path} alt={`poster for ${currentMovie.title}`}/>
        <div className='movie-info'>
          <p>{currentMovie.genres}</p>
          <p>{currentMovie.average_rating}</p>
          <p>{currentMovie.tagline}</p>
          <p>{currentMovie.release_date}</p>
          <p>{currentMovie.runtime}</p>
          <p>{currentMovie.budget}</p>
          <p>{currentMovie.revenue}</p>
        </div>
        <p className='movie-overview'>{currentMovie.overview}</p>
      </section>
    </>
  )
}

export default MovieDetails
