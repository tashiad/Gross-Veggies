export const fetchMovies = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
  .then((response) => {
    if(!response.ok) {
      throw Error(`Unable to find movies. Please refresh the page or try again later.`)
    }
    return response.json()
  })
}

export const fetchSingleMovie = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${+id}`)
  .then((response) => {
    if(!response.ok) {
      throw Error('Unable to find movie. Please refresh the page or try again later.')
    }
    return response.json()
  })
}


export const fetchVideos = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${+id}/videos`)
  .then((response) => {
    if(!response.ok) {
      throw Error('Unable to find movie trailer. Please refresh the page or try again later.')
    }
    return response.json()
  })
}
