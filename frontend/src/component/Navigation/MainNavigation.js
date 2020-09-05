import React from 'react';
import {NavLink} from 'react-router-dom';
import './ManiNavigation.css';

const MainNavigation = (props) => {
    return (
        <header className="main-navigation">
            <div className="main-navigation__logo">
                <h1>RedHand Event Management</h1>
            </div>
            <nav className="main-navigation__item">
                <ul>
                    <li>
                    <NavLink to="/auth">Log-in</NavLink>
                    </li>
                    <li>
                        <NavLink to="/events">Events</NavLink>
                    </li>
                    <li>
                        <NavLink to="/bookings">Bookings</NavLink>
                    </li>
                </ul>
            </nav>
        </header>

    );
};

export default MainNavigation;