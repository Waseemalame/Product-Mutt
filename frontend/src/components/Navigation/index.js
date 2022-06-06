import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import CreatePostModal from '../CreatePostModal';
import './Navigation.css';
import AboutModal from '../AboutModal';

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
        <img className='product-hunt-logo' src="https://cdn-images-1.medium.com/fit/c/72/72/1*rrk0qqmHWx-jbaoC5MZlHA.png" alt="" />
        <NavLink className="home-link" exact to="/">Home</NavLink>
        <AboutModal />
        {sessionUser ? <CreatePostModal /> : null}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
