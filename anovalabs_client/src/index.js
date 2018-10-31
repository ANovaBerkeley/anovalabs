import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Auth from './components/Auth'
import Lessons from './components/Lessons';

import { BrowserRouter,Route, Switch } from 'react-router-dom';


ReactDOM.render(
<BrowserRouter>
<div>
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/lessons' component={Lessons} />
        <Route exact path='/login' component={Auth} />

    </Switch>
    </div>
</BrowserRouter>

, document.getElementById('app'));