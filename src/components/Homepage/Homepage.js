import React from 'react'
import './Homepage.css'
import Poster from '../Poster/Poster'

const Homepage = ({ movies, isLoading, error }) => {
  const posterCards = movies.map(movie => {
    return (
      <Poster
        key={movie.id}
        id={movie.id}
        title={movie.title}
        poster_path={movie.poster_path}
        average_rating={movie.average_rating}
      />
    )
  })

  return (
    <main>
      {isLoading && <h2 className="loading">Loading movies...</h2>}
      {error && <h2 className="error-message">{error}</h2>}
      <section className="posters-container">
        {movies && posterCards}
      </section>
    </main>
  )
}

export default Homepage
