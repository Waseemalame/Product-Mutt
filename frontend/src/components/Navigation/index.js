import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import CreatePostModal from '../CreatePostModal';
import './Navigation.css';
import AboutModal from '../AboutModal';
import * as sessionActions from '../../store/session'
import { useHistory } from 'react-router-dom';
function Navigation({ isLoaded }){
  const [demoCredential, setDemoCredential] = useState('demo@user.io')
  const [demoPassword, setDemoPassword] = useState('password')
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const history = useHistory();
  const handleDefaultButton = (e) => {
    const credential = 'Demo-lition'
    const password = 'password'

   return dispatch(sessionActions.login({ credential, password }))
        .then(() => history.push('/api/posts'))
        .catch(
            async (res) => {
                const data = await res.json();
                // if (data && data.errors) setErrors(data.errors);
            }
        );
}

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <button
        onClick={handleDefaultButton}
         className='demo-user-login-btn'>Log in as Demo User</button>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li className='nav-list'>
        <img className='product-hunt-logo' src="https://cdn-images-1.medium.com/fit/c/72/72/1*rrk0qqmHWx-jbaoC5MZlHA.png" alt="" />
        <NavLink className="home-link" exact to="/">
          <p>Home</p>
        </NavLink>
        <AboutModal />

        {sessionUser ? <CreatePostModal /> : null}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
