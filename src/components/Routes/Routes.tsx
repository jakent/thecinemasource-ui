import React from 'react';
import { Route, Switch } from 'react-router';
import Home from 'src/components/Home/Home';
import { Featured } from 'src/components/Featured/Featured';
import { Interviews } from 'src/components/Interviews/Interviews';
import PostComponent from 'src/components/Post/Post';

const Routes = () => (
    <Switch>
        <Route exact={true} path='/interviews' component={Interviews}/>
        <Route exact={true} path='/featured' component={Featured}/>
        <Route exact={true} path='/post/:id' component={PostComponent}/>
        <Route exact={false} path='/' component={Home}/>
    </Switch>
);

export { Routes };
