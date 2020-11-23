import React from 'react';
import ReactDoM from 'react-dom';
import App from './routes/App';
import reducer from './reducers/index';
import { Provider }  from 'react-redux';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import initialState from './initialState';




const history = createBrowserHistory();
const store =  createStore(reducer,initialState)

ReactDoM.render(
<Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
</Provider>
,document.getElementById('app'));