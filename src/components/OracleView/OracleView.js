import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const mapStateToProps = state => ({
  user: state.user,
});

class OracleView extends Component {
  constructor(props) {
    super(props);
    this.state = { img_path: '', name: '', word: '', show: false, place: '' };
    this.timeIncrementMs = 50;
    this.showSpinnerIfReturnGreaterThanMs = 200;
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    // this.getQuote();
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleWordChange = (event) => {
    this.setState({
      word: event.target.value
    })
  }

  getQuote = () => {
    this.setState({
      show: true
    })
    console.log('getQuote');
    axios({
      method: 'GET',
      url: `/api/quotes/${this.state.word}`
      // TO DO: pass category as route param.
    }).then((results) => {
      console.log('HERE', results.data);
      const img_path = results.data.contents.quote;
      this.setState({ img_path: img_path })
      axios({
        method: 'GET',
        url: '/api/addplace/randomplace'
      }).then((results) => {
        this.setState({
          place: results.data[0]
        })
        console.log(this.state.place)
      })
    }).catch((error) => {
      console.log('HERE', error)
    })
  }


  render() {
    let content = null;
    let greeting;
    if (this.state.show) {
      greeting = <h3> Thanks for your query, {this.state.name}! Inkling will throw your oracle below after a brief thinking period.</h3>
    }

    content = (
      <div>
        <h1>
          Oracle
          </h1>
      </div>
    );

    // if (this.state.isLoading &&
    //     this.state.msElapsed > this.showSpinnerIfReturnGreaterThanMs) {
    //     return <h1>Test</h1>;
    // } else if (this.state.isLoading &&
    //     this.state.msElapsed <= this.showSpinnerIfReturnGreaterThanMs) {
    //     return (null);
    // }
    return (
      <div>
        {content}
        {/* PUT SHARED CONTENT HERE */}
        <div>
          <input className="oracle_inputs" placeholder="Your Name" onChange={this.handleNameChange} />

          {/* onChange that resets state */}
          <input className="oracle_inputs" placeholder="Your query" onChange={this.handleWordChange} />

          <Button className="oracle_submit" bsStyle="info" onClick={this.getQuote}>
            Submit
            </Button>
        </div>
        <div >
          {greeting}
        </div>
        <card className="crop-image">
          <h3 className="your_oracle">In response to your query:</h3>
            <p>{this.state.img_path}</p>
        </card>
        <card className="random-place">
          <h3 className="your_oracle">Add this to your bucket list:</h3>
          <p>{this.state.place.place}</p>
          <p>{this.state.place.description}</p>
          <img className="travel_img" src={this.state.place.img_path} />
        </card>



      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(OracleView);
