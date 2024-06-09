import React, { useState } from 'react';

const AuthButton = () => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const handleAuthClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_id: clientId, client_secret: clientSecret }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching the auth URL:', errorData.error);
        return;
      }

      const data = await response.json();
      const authUrl = data.auth_url;
      window.open(authUrl, '_blank', 'width=600,height=600');
    } catch (error) {
      console.error('Error fetching auth URL:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Client ID"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Client Secret"
        value={clientSecret}
        onChange={(e) => setClientSecret(e.target.value)}
      />
      <button onClick={handleAuthClick}>Authenticate with Spotify</button>
    </div>
  );
};

export default AuthButton;
