import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import ClaimPage from '../pages/ClaimPage.jsx';
import Footer from '../components/Footer.jsx';
import HomePage from '../pages/HomePage.jsx';
import UmcWallet from '../pages/UmcWallet.jsx';
import NotificationsPage from '../pages/NotificationsPage.jsx';
import Nav from '../components/Nav.jsx';
import UserHistoryPage from '../pages/UserHistoryPage.jsx';
import ResultsPage from '../pages/ResultsPage.jsx';

export const renderRoutes = () => (
    <Router history={createBrowserHistory()}>
        <div className="flexbox-wrapper">
            <Nav />
            <main className="container">
                <Route exact path="/" component={HomePage} />
                <Route path="/claims/:id" component={ClaimPage} />
                <Route exact path="/umc-wallet" component={UmcWallet} />
                <Route exact path="/notifications" component={NotificationsPage} />
                <Route exact path="/results" component={ResultsPage} />
                <Route exact path="/user-history/:id" component={UserHistoryPage} />
            </main>                                     
            <Footer />
        </div>
    </Router>
);