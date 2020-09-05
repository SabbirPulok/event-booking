import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './component/Navigation/MainNavigation';
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/auth" exact></Redirect>
            <Route path="/auth" component={AuthPage}>
            </Route>
            <Route path="/events">
              <EventsPage></EventsPage>
            </Route>
            <Route path="/bookings">
              <BookingsPage></BookingsPage>
            </Route>
          </Switch>
        </main>
      </>
    </BrowserRouter>
    </div>
  );
}


export default App;
