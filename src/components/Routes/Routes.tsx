import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../Home/Home';
import { Featured } from '../Featured/Featured';
import { Interviews } from '../Interviews/Interviews';

const Routes = () => (
    <Switch>
        <Route exact={true} path='/interviews' component={Interviews}/>
        <Route exact={true} path='/featured' component={Featured}/>
        <Route exact={false} path='/' component={Home}/>
    </Switch>
);

export { Routes };
