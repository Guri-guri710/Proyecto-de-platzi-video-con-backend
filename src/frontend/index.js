import React from 'react';
import ReactDoM from 'react-dom';
import App from './routes/App';
import reducer from './reducers/index';
import { Provider }  from 'react-redux';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';





const history = createBrowserHistory();
const preloadedState = window.__PRELOADED_STATE__;
const store =  createStore(reducer,preloadedState)

delete window.__PRELOADED_STATE__;

ReactDoM.hydrate(
<Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
</Provider>
,document.getElementById('app'));