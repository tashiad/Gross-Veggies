import React, { Component } from 'react'
import './Homepage.css'
import '../Poster/Poster'

const Homepage = ({ movies }) => {
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
      {posterCards}
    </main>
  )
}

export default Homepage
