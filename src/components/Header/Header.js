import React from 'react';
import Nav from '../Nav/Nav';
import NavTwo from '../Nav/NavTwo';
import { connect } from 'react-redux';



const mapStateToProps = state => ({
  user: state.user
})

const Header = ({ title, user }) => (
  <div className="center_head">
  {/* {JSON.stringify(user)} */}
    <div>
      <h1 className="lead">{ title }</h1>
    </div>
    {user.userName ? (
      <NavTwo />
    ) : (
      <Nav />
    )}
  </div>
);

export default connect (mapStateToProps) (Header);
