import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './pages/home';
import './index.scss';
import { LoginScreen } from './pages/login';
import { NewTask } from './pages/newTask';
import { ApolloProvider } from '@apollo/client';
import { SignupScreen } from './pages/signup';
import { apolloClient } from './services/ApolloClient';
import { ContextProvider } from './context';
import { NewProject } from './pages/newProject';
import { Error } from './pages/error';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { IonApp } from '@ionic/react';
import { V2 } from './v2';

ReactDOM.render(
  <IonApp>
    <ApolloProvider client={apolloClient}>
      <Router>
        {/* <ContextProvider> */}
        <React.StrictMode>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/signup' component={SignupScreen} />
            <Route
              path='/newTask/:projectName/:projectId'
              component={NewTask}
            />
            <Route path='/newProject' component={NewProject} />
            <Route path='/error' component={Error} />
            <Route path='/v2' component={V2} />
          </Switch>
        </React.StrictMode>
        {/* </ContextProvider> */}
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
