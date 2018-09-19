import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
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
          <Link to="/addplace">
            Add Destination
          </Link>
        </li>
        <li>
          <Link to="/cardarchive">
            WizCard Archive
          </Link>
        </li>
        <li>
          <Link to="/randomcard">
            Random Card
          </Link>
        </li>
        <li>
          <Link to="/createcard">
            Create WizCard
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
