import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

//changed from functional to class component
class NavTwo extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 
      USER_ACTIONS.FETCH_USER });
  }
  logout = () => {
    this.props.dispatch(triggerLogout());
  }
  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p
            id="welcome"
          >
            Welcome, {this.props.user.userName}!
          </p>
          {/* <p>Your ID is: {this.props.user.id}</p> */}
        </div>
      );
    }
    else {
      content = (
        <div>
          <p
            id="welcome"
          >
            Welcome!
          </p>
          {/* <p>Your ID is: {this.props.user.id}</p> */}
        </div>
      );
    }
    return (
      <div className="navbar">
      {content}
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
              <Link to="/createcard">
                Create WizCard
          </Link>
            </li>
            <li>
              <button className="logout" class="btn-xs btn-primary"
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

export default connect(mapStateToProps)(NavTwo); // currying