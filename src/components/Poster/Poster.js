import React, { Component } from 'react'
import './Poster.css'

const Poster = ({ id, title, poster_path, average_rating }) => {
  return (
    <article>
      <h2>{title}</h2>
      <img src={poster_path} alt={`${title} poster`}>
      <p>{average_rating.toFixed(2)}</p>
    </article>
  )
}

export default Poster
