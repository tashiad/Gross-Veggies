import React from 'react'
import './Poster.css'
import { Link } from 'react-router-dom'

const Poster = ({ id, title, poster_path, average_rating, openDetails }) => {
  return (
    <Link to={`/movies/${id}`}>
      <article className="poster" onClick={() => openDetails(id)}>
        <h2 className="poster-title">{title}</h2>
        <img src={poster_path} alt={`${title} poster`} className="poster-img"/>
        <p className="poster-rating">{`🍅 \u00A0
         ${average_rating.toFixed(2)}/10`}</p>
      </article>
    </Link>
  )
}

export default Poster
