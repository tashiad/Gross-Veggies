import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header>
      <div className="logo">
        <iframe
          src="https://giphy.com/embed/vhmqZP2vm1Nfy"
          width="50"
          height="50"
          frameBorder="0"
          className="giphy-embed"
          title="dancing-tomato">
        </iframe>
        <h1>Gross<span className="tomatillos">Veggies</span></h1>
      </div>
      <h2>Movie ratings and more.</h2>
    </header>
  )
}

export default Header
