import React from 'react'
import './MovieDetail.css'

const MovieDetails = ({movie}) {
  return (
      <>
      <section className='banner'>
        <h2>{movie.title}</h2>
        <img src={movie.backdrop_path}/>
      </section>
      <button>Back To The Main Page</button>
      <section className='full-movie-details'>
        <img src={movie.poster_path} alt={`poster for ${movie.title}`}/>
        <div className='movie-info'>
          <p>Dramedy</p>
          <p>{movie.average_rating}</p>
          <p>Funner than a barrrel of monke</p>
          <p>{movie.release_date}</p>
          <p>2 Hours</p>
          <p>Budget: $1,000,000</p>
          <p>Revenue: $100,000,000</p>
        </div>
        <p className='movie-overview'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularis</p>
      </section>
      </>
  )
}
export default MovieDetails