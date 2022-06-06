import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const [showDropDown, setShowDropDown] = useState(false)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div
      // onMouseOut={() => setShowMenu(false)}
      className="profile-container">
        <button
        onMouseOver={() => setShowMenu(true)}

         onClick={openMenu}>
        {/* <button onMouseOver={() => setShowDropdown(true)} onClick={openMenu}> */}
          {/* <i className="fas fa-user-circle" /> */}
          <i className="fa-solid fa-circle-user"></i>
        </button>
        {showMenu && (
          <ul
          // onMouseOut={() => setShowMenu(false)}
           className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button className="logout-btn" onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
        {/* {showDropDown && (
          // <div className="drop-down-content">hello</div>
        )} */}
      </div>
    </>
  );
}

export default ProfileButton;
