import React from 'react';
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

// import React, { useState } from 'react';
// import authHelpers from '../pages/api/authHelpers'; // Assuming your module is in a file named authHelpers.js

// function SpotifyLogin() {
//   const [loggedIn, setLoggedIn] = useState(false);

//   // Function to handle login button click
//   const handleLogin = () => {
//     authHelpers.getAuth(); // Initiates Spotify authentication process
//   };

//   // Function to handle logout button click
//   const handleLogout = () => {
//     authHelpers.logout(); // Logs the user out
//     setLoggedIn(false); // Update state to reflect logged out state
//   };

//   // Function to check if user is logged in
//   const checkLoginStatus = () => {
//     if (authHelpers.checkCookie()) {
//       setLoggedIn(true);
//     } else {
//       setLoggedIn(false);
//     }
//   };

//   // Call checkLoginStatus when component mounts to check initial login status
//   useEffect(() => {
//     checkLoginStatus();
//   }, []);

//   return (
//     <div>
//       {loggedIn ? (
//         <div>
//           <p>You are logged in with Spotify!</p>
//           <button onClick={handleLogout}>Logout</button>
//           {/* Now you can run your KNN algorithm with user's info */}
//         </div>
//       ) : (
//         <div>
//           <p>You are not logged in.</p>
//           <button onClick={handleLogin}>Login with Spotify</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SpotifyLogin;
