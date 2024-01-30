import React, { useState } from 'react';
import {useLocation} from 'react-router-dom'
import axios from 'axios';
import localStorageService from './Services/localStorage.service';
import useInactivity from './Hooks/useInactivity';

function App() {
  const location = useLocation();
  const [token, setToken] = useState('');

  const getToken = () => {
    axios.get('http://localhost:3000/get-token')
      .then(response => {
        const { token } = response.data;
        setToken(token);
        localStorageService.saveToken(token);
      })
      .catch(error => console.error('Error fetching token:', error));
  };
  
  const handleLogOut = () => {
    axios.post('http://localhost:3000/logout', { token })
      .then(() => {
        setToken('');
        localStorageService.removeToken();
      })
      .catch(error => console.error('Error while logging out:', error));
  };

  const {updateLastActivity} = useInactivity(token, setToken, handleLogOut);

  React.useEffect(() => {
    updateLastActivity();

    // Listen to any api calls
    //const axiosInterceptor = axios.interceptors.request.use(config => {
    //  updateLastActivity();
    //  return config;
    //}, error => {
    //  return Promise.reject(error);
    //});
//
    return () => {
      //axios.interceptors.request.eject(axiosInterceptor);
    };
  }, [location]);

  return (
    <div>
      <header>
        <button onClick={getToken}>Get Token</button>
        <button onClick={updateLastActivity()}>User active</button>
        {token && (
          <>
            <p>Token: {token}</p>
            <button onClick={handleLogOut}>Logout</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
