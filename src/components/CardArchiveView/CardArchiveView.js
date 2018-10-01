import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { throws } from 'assert';
import { Button } from 'react-bootstrap';


const mapStateToProps = state => ({
  user: state.user,
  cardDisplayReducer: state.cardDisplayReducer,
});

class CardArchiveView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPicture: true,
      currentCard: ''
    }
  }

  // image shows when the page renders. when image is clicked, message displays.
  toggleDisplay = (i) => {
    console.log('In toggleDisplay');
    this.setState({
      showPicture: !this.state.showPicture,
      currentCard: i
    })
  } // end toggle

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getCards();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('user');
    }
  }

  getCards = () => {
    axios({
      method: 'GET',
      url: '/api/addcard',
    }).then((response) => {
      this.props.dispatch({
        payload: response.data,
        type: 'DISPLAY_CARDS',
      })
    }).catch((error) => {
      console.log(`error: ${error}`);
    })
  }

  render() {
    let content = null;
    const showPicture = this.state.showPicture;

    let cardContent;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="wiz-h1"
          >
            Wisdom Card Archive
            </h1>
          <card>
            {this.props.cardDisplayReducer.map((card, i) => {
              if (showPicture && this.state.currentCard===i) {
                cardContent = (
                  <span>{card.message}</span>
                )
              } else {
                cardContent = (
                  <img className="card-image" alt="" src={card.img_path} />
                )
              }
              return (
                <li key={i}>
                <div onClick={()=>this.toggleDisplay(i)} className="card_archive">
                  {cardContent}
                  </div>
                </li>
              )
            })}
          </card>
          <br />
          <Link className="your_own" to="/createcard">Create Your Own</Link>
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
export default connect(mapStateToProps)(CardArchiveView);