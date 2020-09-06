import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './component/Navigation/MainNavigation';
import AuthContext from './component/Context/authContext';
import './App.css';

class App extends Component {
  state = {
    token : null,
    userId : null 
  };

  login = (token, userId, tokenExpiration)=>{
    this.setState( {
      token : token,
      userId : userId
    });

  };
  logout = () => {
    this.setState({
      token : null,
      userId : null
    })
  };
  render(){
    return (
      <div className="App">
      <BrowserRouter>
        <>
          <AuthContext.Provider value= {
            {
              token : this.state.token,
              userId : this.state.userId,
              login : this.login,
              logout : this.logout
            }
          }>
            <MainNavigation />
            <main className="main-content">
              <Switch>
                { !this.state.token && <Redirect from="/bookings" to="/auth" exact></Redirect>}
                { this.state.token && <Redirect from="/" to="/events" exact></Redirect>}
                { this.state.token && <Redirect from="/auth" to="/events" exact></Redirect>}
                { !this.state.token && <Route path="/auth" component={AuthPage} />}
                <Route path="/events" component={EventsPage} />
                { this.state.token && <Route path="/bookings" component={BookingsPage} />}
                { !this.state.token && <Redirect to="/auth" exact></Redirect>}
              </Switch>
            </main>
          </AuthContext.Provider>
        </>
      </BrowserRouter>
      </div>
    );
  }
}


export default App;
