import {Outlet, Link } from "react-router-dom";
import React from 'react';

/**
 * The menu section component - link to the home page or information page.
 */
class Menu extends React.Component {

    render() {
        return (
            <div>
                <nav className="nav nav-pills nav-fill bg-light">
                    <Link className="nav-item nav-link" to="/">home page</Link>
                    <Link className="nav-item nav-link" to="/informationPage">information page</Link>
                </nav>
                <Outlet/>
            </div>
        )
    }
}

export default Menu;