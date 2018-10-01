import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';
import { globals } from '../../globals';
import { Button } from 'react-bootstrap';


const mapStateToProps = state => ({
  user: state.user,
  cardToAdd: state.cardToAdd,
});

class CreateCardView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardImage: ''
    }

  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.config = {
      cloud_name: globals.env.CLOUDINARY_NAME,
      api_key: globals.env.CLOUDINARY_KEY,
      api_secret: globals.env.CLOUDINARY_SECRET,
      upload_preset: "ry3fnckm"
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('user');
    }
  }

  openCloudinary = (event) => {
    event.preventDefault();
    window.cloudinary.openUploadWidget(this.config, (error, result) => {
      if (result) {
        let cloudinaryUrl = result[0].url
        this.setState({
          // store url to local state BEFORE dispatching an action
          ...this.state,
          image: cloudinaryUrl
        })
        this.props.dispatch({
          type: 'ADD_CARD_IMAGE',
          payload: this.state.image
        })
        console.log(this.state.image);
      }
    })
  }

  handleMessageChange = (event) => {
    this.props.dispatch({
      type: 'ADD_CARD_MESSAGE',
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
            id="create"
          >
            Create a WizCard
            </h1>
          <form onSubmit={this.handleFormSubmit}>
            <input className="oracle_inputs" type="text" placeholder="message" value={this.props.cardToAdd.cardToAdd.message} name="message" onChange={this.handleMessageChange} />
            <Button className="uploadButton" bsStyle="info" onClick={this.openCloudinary}>Upload an image</Button>
            <br />
            <Button className="oracle_submit" bsStyle="info" >
              Submit
            </Button>
          </form>
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