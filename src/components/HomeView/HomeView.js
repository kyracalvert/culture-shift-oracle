import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';


// import Nav from '../../components/Nav/Nav';
// import Header from '../Header/Header';

// import LoginPage from '../../components/LoginPage/LoginPage';


class HomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCard: true,
      randomCard: ''
    }
  }

  // image shows when the page renders. when image is 
  // clicked, message displays.
  toggleCardDisplay = () => {
    console.log('in toggleCardDisplay');
    this.setState({
      showCard: !this.state.showCard,
    })
  }

  componentDidMount() {
    this.getCard();

  }

  getCard = () => {
    console.log('in getCard')
    axios({
      method: 'GET',
      url: '/api/addcard/random',
    }).then((response) => {
      console.log(response.data);
      this.setState({
        randomCard: response.data[0],
      })
    }).catch((error) => {
      console.log(`error: ${error}`);
    })
  }
  // componentDidUpdate() {
  //   if (!this.props.user.isLoading && this.props.user.userName === null) {
  //     this.props.history.push('home');
  //   }
  // }


  render() {
    let content = null;
    let currentRandomCard = null;
    let cardMessage = null;

    if (this.state.randomCard.img_path) {
      currentRandomCard = (<img className="your_card_image" src={this.state.randomCard.img_path} alt="Today's Wisdom Card" />)
    }
    if (this.state.showCard) {
      cardMessage = (
        <span>{ currentRandomCard }</span>
      )
    } else {
      cardMessage = (
        <span>{this.state.randomCard.message}</span>
      )
    }
    return (
      <div>
        {content}
        {/* PUT SHARED CONTENT HERE */}
        <h2 className="your_card_text">Today's WizCard:</h2>
        <div onClick={this.toggleCardDisplay} className="card_view">
          {cardMessage}
        </div>
        {JSON.stringify(this.state.randomCard)}

        <Link class="btn btn-info btn-lg btn-huge" to="/oracle">Consult the Oracle</Link>
      </div>
    );
  }
}



// this allows us to use <App /> in index.js
export default connect()(HomeView);

