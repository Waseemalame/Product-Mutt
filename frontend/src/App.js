import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PostBrowser from "./components/PostBrowser";
import CreatePostForm from "./components/CreatePostForm";
import Popup from "./components/Popup";

function App() {
  const dispatch = useDispatch();
  const [buttonPopup, setButtonPopup] = useState(false)
  const [timedPopup, setTimedPopup] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  useEffect(() => {
    setTimeout(()=>{
      setTimedPopup(true)
    }, 3000)

  }, [])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <PostBrowser />
        </Switch>
      )}
      <button onClick={(e) => setButtonPopup(true)}>Open Popup</button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>My Popup</h3>
        <p>This is my button triggered popup</p>
      </Popup>
      <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
        <h3>My Timed Popup</h3>
        <p>This is my time-triggered button popup</p>
      </Popup>
    </>
  );
}

export default App;
