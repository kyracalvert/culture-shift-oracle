import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component { 
  render() { 
    return (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            Home
          </Link>
        </li>
        <li>
          <Link to="/oracle">
            Oracle
          </Link>
        </li>
        <li>
          <Link to="/login">
            Login
          </Link>
        </li>
      </ul>
    </div>
    
    <h1>Inkling's <img className="spiritCircle" alt="Inkling's Oracle Logo" src="images/spiritCircleStars.png" />Oracle</h1>
   
  </div>
)};
}

export default Nav;
