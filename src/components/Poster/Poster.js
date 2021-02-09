import React from 'react'
import './Poster.css'

const Poster = ({ movieId, title, poster_path, average_rating, openDetails }) => {
  return (
    <article className="poster" 
    // id={movieId}
     onClick={() => 
      openDetails(movieId)
    }
    >
      <h2 className="poster-title">{title}</h2>
      <img src={poster_path} alt={`${title} poster`} className="poster-img"/>
      <p className="poster-rating">{`🍅 \u00A0
       ${average_rating.toFixed(2)}/10`}</p>
    </article>
  )
}

export default Poster
