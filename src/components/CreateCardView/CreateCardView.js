import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class CreateCardView extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('user');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
        content = (
          <div>
            <h1
              id="welcome"
            >
              Create a WizCard here, { this.props.user.userName }!
            </h1>
            {/* <p>Your ID is: {this.props.user.id}</p> */}
          </div>
        );
      }

    return (
      <div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreateCardView);