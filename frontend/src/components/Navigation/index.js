import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import CreatePostModal from '../CreatePostModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        {/* <NavLink to="/login">Log In</NavLink> */}
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li className='nav-list'>
        {/* <img src="../../../public/favicon.ico" alt="" /> */}
        <NavLink exact to="/">Home</NavLink>
        {sessionUser ? <CreatePostModal /> : null}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
