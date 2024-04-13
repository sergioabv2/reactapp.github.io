import React, { useState } from "react";

import { auth, provider } from './firebase'

import "./style.css";

const App = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isUserLoggedIn, setUserAuthStatus] = useState(false);
  
  return (
    <div className="login-wrapper">
      {isUserLoggedIn && (
        <div className="welcome-wrapper">
          <span
            className="profile-picture"
            style={{backgroundImage: `url(${userDetails.photoURL})`}}
          />
          <h6 className="welcome-text">Welcome, {userDetails.name}!</h6>
        </div>
      )}
      <button
        className="btn"
        type="button"
        onClick={() => {
          if (isUserLoggedIn) {
            setUserDetails({});
            setUserAuthStatus(false);
          } else {
            auth
              .signInWithPopup(provider)
              .then(res => {
                const { displayName, email, photoURL } = res.user;
                const userInfo = {
                  photoURL,
                  email,
                  name: displayName
                };
                setUserDetails(userInfo);
                setUserAuthStatus(true);

                return res;
              })
              .catch(err => err);
          }
        }}
      >
        {isUserLoggedIn ? "Logout" : "Google Login"}
      </button>
    </div>
  );
}

export default App;
