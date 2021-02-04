import React from 'react'
import './Poster.css'

const Poster = ({ id, title, poster_path, average_rating, openDetails }) => {
  return (
    <article className="poster" onClick={() => openDetails(id)}>
      <h2 className="poster-title">{title}</h2>
      <img src={poster_path} alt={`${title} poster`} className="poster-img"/>
      <p className="poster-rating">{`🍅 ${average_rating.toFixed(2)}/10`}</p>
    </article>
  )
}

export default Poster
