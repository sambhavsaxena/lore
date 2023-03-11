import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav
            className='navbar navbar-expand-lg navbar-light'
            style={{ backgroundColor: '#75c74e' }}
        >
            <div className='container-fluid'>
                <Link to='/'>
                    <span className='site-title'>
                        <strong>LORE</strong>
                    </span>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
