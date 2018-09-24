import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../Header/Header';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class OracleView extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  // componentDidUpdate() {
  //   if (!this.props.user.isLoading && this.props.user.userName === null) {
  //     this.props.history.push('home');
  //   }
  // }

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
         <input placeholder="Word 1"/>
         </div>
         <div>   
         <input placeholder="Word 2"/>
         </div>
         <div>   
         <input placeholder="Word 3"/>
         </div>
         <div>
            <input
              type="submit"
              name="submit"
              value="Submit"
            />
          </div>
      </div> 
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(OracleView);
