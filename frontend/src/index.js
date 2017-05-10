import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, hashHistory, IndexRoute } from 'react-router';
import './index.css';
import AppLayout from './AppLayout';
import Home from './pages/Home';
import Details from './pages/Details';
// import SignUp from './pages/SignUp';
import reducer from './pages/Home.reducer';

const store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    Redux.applyMiddleware(ReduxThunk)
);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppLayout}>
                <IndexRoute component={Home} />
                <Route path="/shop/:id" component={Details} />
            </Route>
        </Router>
    </ReactRedux.Provider>,
  document.getElementById('root')
);
