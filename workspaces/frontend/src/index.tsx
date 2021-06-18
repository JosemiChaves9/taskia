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
import { Test } from './pages/testPages';
import { ContextProvider } from './components/context';
import { NewProject } from './pages/newProject';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ContextProvider>
      <React.StrictMode>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/signup' component={SignupScreen} />
            <Route path='/newTask' component={NewTask} />
            <Route path='/newProject' component={NewProject} />

            <Route path='/test' component={Test} />
          </Switch>
        </Router>
      </React.StrictMode>
    </ContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
