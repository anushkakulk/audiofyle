
// import React from 'react';
import authHelpers from '../pages/api/authHelpers';

function Login(props) {
  const { token } = props;

  const handleLogin = () => {
    authHelpers.getAuth();
  };

  return (
    <div className="auth-container">
      {!token || token === "access_denied" ? (
        <div>
          <button onClick={handleLogin} className="auth-link">Login with Spotify</button>
          {token === "access_denied" && <h6>Something went wrong. Please try again.</h6>}
        </div>
      ) : null}
    </div>
  );
}

export default Login;
