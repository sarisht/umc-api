import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import HomePage from '../imports/ui/pages/HomePage.jsx';
import { Footer } from '../imports/ui/components/Footer.jsx';
import Nav from '../imports/ui/components/Nav.jsx';

const browserHistory = createBrowserHistory();

const renderRoutes = () => (
    <Router history={browserHistory}>
        <div>
            <Nav />
            <main className="container">
                <Route exact path="/" component={HomePage} />
                {/*<Route exact path="/policies/add" component={PolicyAddPage} />
                <Route path="/claims/:id" component={ClaimPage} />
                <Route path="/claims/file" component={ClaimFilePage} />
                <Route path="/policies/:id" component={PolicyPage} />
                */}
            </main>
            <Footer />
        </div>
    </Router>
);

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('render-target'));
});