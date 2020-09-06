import React from 'react';
import {NavLink} from 'react-router-dom';
import './ManiNavigation.css';
import AuthContext  from '../Context/authContext';

const MainNavigation = (props) => (
    <AuthContext.Consumer>
    {   context => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <h1>RedHand Event Management</h1>
                    </div>
                    <nav className="main-navigation__item">
                        <ul>
                        {
                            !context.token && (
                                <li>
                                <NavLink to="/auth">Login</NavLink>
                                </li>
                            )
                        }
                            <li>
                                <NavLink to="/events">Events</NavLink>
                            </li>
                            {
                                context.token && (
                                    <React.Fragment>
                                        <li>
                                            <NavLink to="/bookings">Bookings</NavLink>
                                        </li>
                                        <li>
                                            <button onClick={context.logout}>Logout</button>
                                        </li>
                                    </React.Fragment>
                               )
                            }
                        </ul>
                    </nav>
                </header>
    
            );
        }
    }
    </AuthContext.Consumer>
);

export default MainNavigation;