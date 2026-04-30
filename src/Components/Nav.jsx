import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const backdropClass = menuOpen
    ? "menu__backdrop menu--open"
    : "menu__backdrop";

  return (
    <header className="header" id="logo">
      <div className="logo">
        <Link to="/">
          <svg
            width="60"
            height="60"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FF4444" />
                <stop offset="70%" stopColor="#CC0000" />
                <stop offset="100%" stopColor="#990000" />
              </radialGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="url(#glow)"
              stroke="#333"
              strokeWidth="8"
            />
            <ellipse
              cx="100"
              cy="60"
              rx="70"
              ry="40"
              fill="#FFF"
              opacity="0.4"
            />
            <path
              d="M 100 100 Q 100 10 100 10 A 92 92 0 0 1 100 92 Z"
              fill="#EE1515"
            />
            <path
              d="M 100 100 Q 100 190 100 190 A 92 92 0 0 1 100 108 Z"
              fill="#F0F0F0"
            />
            <rect x="12" y="92" width="176" height="16" fill="#333" rx="8" />
            <circle
              cx="100"
              cy="100"
              r="28"
              fill="#FFF"
              stroke="#000"
              strokeWidth="4"
            />
            <circle cx="100" cy="100" r="16" fill="#222" />
            <circle cx="100" cy="100" r="8" fill="#FFF" opacity="0.8" />
          </svg>
        </Link>
        <div className="nav__links">
          <Link to="/" className="nav__link">
            Home
          </Link>
          <Link to="/PokemonList" className="nav__link">
            Pokemon
          </Link>
          <Link to="/contact" className="nav__link">
            Contact
          </Link>
        </div>
        <button className="btn__menu" onClick={() => setMenuOpen(true)}>
          <FontAwesomeIcon icon="bars" />
        </button>
        <div className={backdropClass}>
          <button
            className="btn__menu btn__menu--close"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon="times" />
          </button>
          <div className="menu__links">
            <Link to="/" className="menu__link">
              Home
            </Link>
            <Link to="/PokemonList" className="menu__link">
              Pokemon
            </Link>
            <Link to="/contact" className="menu__link">
              Contact
            </Link>
          </div>
        </div>
      </div>
      <h1 className="title">Kanto Pokédex</h1>
      <p className="header__para">Displaying the first 151 Pokémon</p>
    </header>
  );
};

export default Nav;