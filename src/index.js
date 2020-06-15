import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import './index.css';
import config from './config';
import App from './App';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REACT_APP_REGION,
    userPoolId: config.cognito.REACT_APP_USER_POOL_ID,
    identityPoolId: config.cognito.REACT_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.REACT_APP_APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "MyApp",
        endpoint: config.apiGateway.REACT_APP_URL,
        region: config.apiGateway.REACT_APP_REGION
      },
    ]
  }
});


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
