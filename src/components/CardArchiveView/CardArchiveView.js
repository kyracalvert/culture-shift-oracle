import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  cardDisplayReducer: state.cardDisplayReducer,
});

class CardArchiveView extends Component {
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

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Here is the WizCard Archive, {this.props.user.userName}!
            </h1>
            <card>
               {this.props.cardDisplayReducer.map((card, i) =>{ 
                return (
                  <li className="card_view" key={i}>
                  <img alt="" src={card.img_path} /> 
                  <br/>
                  {card.message}
                  </li>
                )
              })} 
            </card> 
            <Link className="draw_random" to="/randomcard">Draw Random</Link>
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