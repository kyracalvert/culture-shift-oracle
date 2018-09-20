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
    <img className="spiritCircle" src="images/spiritCircleStars.png" />
   <h1>Culture Shift Oracle</h1>
  </div>
)};
}

export default Nav;
