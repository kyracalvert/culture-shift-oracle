import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const mapStateToProps = state => ({
  user: state.user,
});

class OracleView extends Component {
  constructor (props) {
    super(props);
    this.state = {img_path: '', name: '', word: '', show: false};
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
      console.log('HERE',results.data);
      const img_path = results.data.contents.quote;
      this.setState({img_path: img_path})
    }).catch((error) => {
      console.log('HERE',error)
    })
  }
  render() {
    let content = null;
    let greeting;
    if (this.state.show){
      greeting = <h3> Thanks for your query, {this.state.name}! Your Oracle reading will appear below:</h3>
    }

    content = (
      <div>
        <h3>
          Oracle
          </h3>
      </div>
    );
    return (
      <div>
        {content}
         {/* PUT SHARED CONTENT HERE */}
        <div>
         <input className="oracle_inputs" placeholder="Your Name" onChange={this.handleNameChange} /> 
       
           {/* onChange that resets state */}
         <input className="oracle_inputs" placeholder="Your query" onChange={this.handleWordChange}/>
 
         <Button className="oracle_submit" bsStyle="info"  onClick={this.getQuote}>
              Submit
            </Button>
          </div>
          <div >
            {greeting}
            </div>
          <card className="crop-image">
            <p>{this.state.img_path} </p>
          </card>
      </div> 
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(OracleView);
