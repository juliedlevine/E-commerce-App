import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, hashHistory, IndexRoute } from 'react-router';
import Cookies from 'js-cookie';
import './index.css';
import AppLayout from './AppLayout';
import Home from './pages/Home';
import Details from './pages/Details';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import reducer from './pages/Home.reducer';

const store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    Redux.applyMiddleware(ReduxThunk)
);

let name = Cookies.get('name');
let token = Cookies.get('token');
store.dispatch({
    type: 'read-cookie',
    first_name: name,
    token: token
})

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppLayout}>
                <IndexRoute component={Home} />
                <Route path="/shop/:id" component={Details} />
                <Route path="/signup" component={SignUp} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
    </ReactRedux.Provider>,
  document.getElementById('root')
);
