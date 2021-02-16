import React from 'react'
import './Poster.css'
import { Link } from 'react-router-dom'

const Poster = ({ id, title, poster_path, average_rating }) => {
  return (
    <Link to={`/movie/${id}`} style={{ textDecoration: 'none' }}>
      <article className="poster" aria-label="movie-poster" >
        <div className="poster-title-wrapper">
          <h2 className="poster-title">{title}</h2>
        </div>
        <img src={poster_path} alt={`${title} poster`} className="poster-img"/>
        <p className="poster-rating">{`🍅 \u00A0
         ${average_rating.toFixed(1)}/10`}</p>
      </article>
    </Link>
  )
}

export default Poster
