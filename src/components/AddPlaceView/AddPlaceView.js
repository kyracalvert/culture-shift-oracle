import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';
import {globals} from '../../globals';

const mapStateToProps = state => ({
    user: state.user,
    placeToAdd: state.placeToAdd,
});

class AddPlaceView extends Component {
    constructor(props) {
        super(props);

        this.state={ 
            image: ''
        }

    }
    componentDidMount() {
        // this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
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
                type: 'ADD_PLACE_IMAGE',
                payload: this.state.image
            })
            console.log(this.state.image);
          }
        })
    }

    handlePlaceChange = (event) => {
        this.props.dispatch({
            type: 'ADD_PLACE_NAME',
            payload: event.target.value
        })
    }

    handleDescriptionChange = (event) => {
        this.props.dispatch({
            type: 'ADD_PLACE_DESCRIPTION',
            payload: event.target.value
        })
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.placeToAdd);
        axios({
            method: 'POST',
            url: '/api/addplace',
            data: this.props.placeToAdd,
        }).then((response) => {
            console.log(response);
            alert('Destination added!');
            this.props.dispatch({
                type: 'RESET_STATE',
            })
        }).catch((error) => {
            console.log(error);
            alert('Unable to add destination.');
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
                        Add a destination here, {this.props.user.userName}!
            </h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input type="text" placeholder="place" value={this.props.placeToAdd.placeToAdd.place} name="place" onChange={this.handlePlaceChange} />
                        <input type="text" placeholder="description" value={this.props.placeToAdd.placeToAdd.description} name="description" onChange={this.handleDescriptionChange} />
                        {/* <input type="text" placeholder="image path" value={this.props.placeToAdd.placeToAdd.img_path} name="img_path" onChange={this.handleImageChange} /> */}
                        <button onClick={this.openCloudinary}>Upload an image</button>
                        <input  type="submit" value="submit" />

                    </form>
                    <p>{JSON.stringify(this.props.placeToAdd)}</p>
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
export default connect(mapStateToProps)(AddPlaceView);
