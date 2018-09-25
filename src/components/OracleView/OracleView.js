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
    this.state = {img_path: '', word: ''};
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    // this.getQuote();
  }

  handleWordChange = (event) => {
    this.setState({
      word: event.target.value
    })
  }
 
  getQuote = () => {
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
         <input placeholder="Your Name" /> 
         </div>
         <div>   
           {/* onChange that resets state */}
         <input onChange={this.handleWordChange}/>
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
          <div className="crop-image">
            <p>{this.state.img_path} </p>
          </div>
      </div> 
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(OracleView);
