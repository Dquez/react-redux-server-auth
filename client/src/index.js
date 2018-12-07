import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Feature from './components/Feature';

const store = createStore(
    reducers,
    // initial state
    {
        auth: { authenticated: localStorage.getItem('token') }
    },
    applyMiddleware(reduxThunk)
)
ReactDOM.render(
    <Provider store={store  }>
        <Router>
            <App>
                <Route path='/' exact component={Welcome} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/feature' exact component={Feature} />
                <Route path='/signout' exact component={Signout} />
            </App>
        </Router>
    </Provider>
    ,
    document.querySelector('#root'));