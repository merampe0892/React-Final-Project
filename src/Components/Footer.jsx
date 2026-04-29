import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__container">
            <div className="footer__section">
                <h3 className="footer__title">🎮 Kanto Pokédex</h3>
                <p className="footer__para">Discover all 151 original Pokémon from Generation 1!</p>
            </div>
            <div className="footer__section">
                <h4 className="footer__title">Quick Links</h4>
                <ul className="footer__links">
                <li><Link to= "/" className="footer__link" >Home</Link></li>
                <li><Link to="/PokemonList" className="footer__link" >My Team</Link></li>
                </ul>
            </div>
            <div className="footer__section">
                <h4>Powered by</h4>
                <a href="https://pokeapi.co/" target="_blank" rel="noopener">
                PokéAPI
                </a>
            </div>
        </div>
        <div className="footer__bottom">
        <p>&copy; 2026 Moises Ramirez.</p>
        </div>
    </footer>
  )
}

export default Footer