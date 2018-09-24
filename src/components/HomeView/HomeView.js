import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';
import Header from '../Header/Header';

import LoginPage from '../../components/LoginPage/LoginPage';

import { USER_ACTIONS } from '../../redux/actions/userActions';


const mapStateToProps = state => ({
  user: state.user,
});

class HomeView extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  // componentDidUpdate() {
  //   if (!this.props.user.isLoading && this.props.user.userName === null) {
  //     this.props.history.push('home');
  //   }
  // }


  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          {/* <p>Your ID is: {this.props.user.id}</p> */}
        </div>
      );
    }
    else {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome!
          </h1>
          {/* <p>Your ID is: {this.props.user.id}</p> */}
        </div>
      );
    }

    return (
      <div>
        { content }
        {/* PUT SHARED CONTENT HERE */}
        <h2 className="your_card_text">Today's WizCard:</h2>
        <Link to="/cardarchive"><img src="https://via.placeholder.com/350x150"></img></Link>
        <br/>
        <Link className="consult_button" to="/oracle">Consult the Oracle</Link>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(HomeView);

