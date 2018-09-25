import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  cardToAdd: state.cardToAdd,
});

class CreateCardView extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('user');
    }
  }

  handleMessageChange = (event) => {
    this.props.dispatch({
      type: 'ADD_CARD_MESSAGE',
      payload: event.target.value
    })
  }


  handleImageChange = (event) => {
    this.props.dispatch({
      type: 'ADD_CARD_IMAGE',
      payload: event.target.value
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.cardToAdd);
    axios({
      method: 'POST',
      url: '/api/addcard',
      data: this.props.cardToAdd,
    }).then((response) => {
      console.log(response);
      alert('WizCard added!');
      this.props.dispatch({
        type: 'RESET_STATE',
      })
    }).catch((error) => {
      console.log(error);
      alert('Unable to add WizCard.');
    })
  }
  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Create a WizCard here, {this.props.user.userName}!
            </h1>
          <form onSubmit={this.handleFormSubmit}>
            <input type="text" placeholder="message" value={this.props.cardToAdd.cardToAdd.message} name="message" onChange={this.handleMessageChange} />
            <input type="text" placeholder="image path" value={this.props.cardToAdd.cardToAdd.img_path} name="img_path" onChange={this.handleImageChange} />
            <input type="submit" value="submit" />

          </form>
          <p>{JSON.stringify(this.props.cardToAdd)}</p>
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreateCardView);