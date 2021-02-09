import React from 'react'
import './Homepage.css'
import Poster from '../Poster/Poster'

const Homepage = ({ movies, openDetails }) => {
  const posterCards = movies.map(movie => {
    return (
      <Poster
        key={movie.id}
        movieId={movie.id}
        title={movie.title}
        poster_path={movie.poster_path}
        average_rating={movie.average_rating}
        openDetails={openDetails}
      />
    )
  })


  return (
    <main>
      <section className="posters-container">
        {posterCards}
      </section>
    </main>
  )
}

export default Homepage
