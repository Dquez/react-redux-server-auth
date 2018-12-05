import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import App from './components/App';
import Welcome from './components/Welcome';

ReactDOM.render(
    <Router>
        <App>
            <Route path='/' exact component={Welcome} />
        </App>
    </Router>,
    document.querySelector('#root'));