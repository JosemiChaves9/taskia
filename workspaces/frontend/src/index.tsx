import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './pages/home';
import './index.scss';
import { LoginScreen } from './pages/login';
import { NewTask } from './pages/newTask';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/newTask' component={NewTask} />
        {/* <Route path='/test' component={Test} /> */}
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
