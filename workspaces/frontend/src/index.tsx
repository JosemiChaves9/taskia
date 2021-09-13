import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './pages/home';
import './index.scss';
import { LoginScreen } from './pages/login';
import { ApolloProvider } from '@apollo/client';
import { SignupScreen } from './pages/signup';
import { apolloClient } from './services/ApolloClient';
import { ContextProvider } from './context';
import { Error } from './pages/error';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { IonApp } from '@ionic/react';
import { LoadingScreen } from './pages/LoadingScreen/LoadingScreen';

ReactDOM.render(
  <IonApp>
    <ApolloProvider client={apolloClient}>
      <Router>
        <ContextProvider>
          <React.StrictMode>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/signup' component={SignupScreen} />
              <Route path='/error' component={Error} />
              <Route path='/loading' component={LoadingScreen} />
            </Switch>
          </React.StrictMode>
        </ContextProvider>
      </Router>
    </ApolloProvider>
  </IonApp>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register();
