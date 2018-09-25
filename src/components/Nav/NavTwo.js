import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';

//changed from functional to class component
class NavTwo extends Component {
  logout = () => {
    this.props.dispatch(triggerLogout());
  }
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
            <li>
              <button
                onClick={this.logout}
              >
                Log Out
            </button>
            </li>
          </ul>
        </div>
        <h1>Inkling's <img className="spiritCircle" alt="Inkling's Oracle Logo" src="images/spiritCircleStars.png" />Oracle</h1>    
      </div>
    )
  }
}

export default connect()(NavTwo); // currying