import React from 'react'
import './MovieDetails.css'

const MovieDetails = ({currentMovie}) => {
  return (
      <>
      <section className='banner'>
        <h2>{currentMovie.title}</h2>
        <img src={currentMovie.backdrop_path}/>
      </section>
      <button>Back To The Main Page</button>
      <section className='full-movie-details'>
        <img src={currentMovie.poster_path} alt={`poster for ${currentMovie.title}`}/>
        <div className='movie-info'>
          <p>Dramedy</p>
          <p>{currentMovie.average_rating}</p>
          <p>Funner than a barrrel of monke</p>
          <p>{currentMovie.release_date}</p>
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