import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import { Auth0Provider } from '@auth0/auth0-react';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

import { Provider } from 'react-redux';

import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './store/store';

// const domain = 'dev-s7zqessv713ho4qj.us.auth0.com';
// const clientId = 'T96uzk14GqXs2zlIiXakow3x3cv8Katj';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="633011311231-s6ekboigrrl38v7rsaehiuns6itetsnp.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
