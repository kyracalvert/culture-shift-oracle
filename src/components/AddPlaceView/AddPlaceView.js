import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    placeToAdd: state.placeToAdd,
});

class AddPlaceView extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('user');
        }
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

    handleImageChange = (event) => {
        this.props.dispatch({
            type: 'ADD_PLACE_IMAGE',
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
                        <input type="text" placeholder="name" value={this.props.placeToAdd.placeToAdd.name}  name="name" onChange={this.handlePlaceChange} />
                        <input type="text" placeholder="description" value={this.props.placeToAdd.placeToAdd.description} name="description" onChange={this.handleDescriptionChange} />
                        <input type="text" placeholder="image url" value={this.props.placeToAdd.placeToAdd.image_url} name="image_url" onChange={this.handleImageChange} />
                        <input type="submit" value="submit" /> 
                       
                    </form>
                    {/* <p>{JSON.stringify(this.props.placeToAdd)}</p> */}
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
