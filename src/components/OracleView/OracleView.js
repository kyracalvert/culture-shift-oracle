import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

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
        <p>
          Oracle
          </p>
      </div>
    );
    return (
      <div>
        {content}
         {/* PUT SHARED CONTENT HERE */}
        <div>
         <input placeholder="Your Name" onChange={this.handleNameChange} /> 
         </div>
         <div>   
           {/* onChange that resets state */}
         <input placeholder="Your query" onChange={this.handleWordChange}/>
         </div>
         {/* <div>   
         <input placeholder="Word 2"/>
         </div>
         <div>   
         <input placeholder="Word 3"/>
         </div> */}

         <div>
            <input 
              onClick={this.getQuote}
              type="submit"
              name="submit"
              value="Submit"
            />
          </div>
          <div >
            {greeting}
            </div>
          <div className="crop-image">
            <p>{this.state.img_path} </p>
          </div>
      </div> 
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(OracleView);
