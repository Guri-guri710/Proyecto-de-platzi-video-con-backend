import React from 'react';
import { BrowserRouter ,Switch ,Route } from 'react-router-dom';
import Home from '../Containers/Home';
import Login from '../Containers/Login';
import Register from '../Containers/Register';
import  NotFound from '../Containers/NotFound';
import Layout from '../Containers/Layout';

const App = () => (
    <BrowserRouter>
    <Layout>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route component={NotFound} />
        </Switch>
    </Layout>
    </BrowserRouter>
);


export default App;