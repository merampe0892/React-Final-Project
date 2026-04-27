import React from 'react'
import poke from './poke.png';
import Search from './ui/Search';

const Landing = () => {   
  return (
    <div>
        <div className="intro">
            <h1 className="title">
              Welcome to the World of Pokemon!
            </h1>
            <h3 className="header__para">
                Where you can find your favorite Pokemon, create your very own team and see some their stats in real time. 
            </h3>
        </div>
        <Search />

        <figure className="poke__img--wrapper">
            <img className="landing__logo" src={poke} alt="" />
        </figure>
    </div>
  );
}

export default Landing