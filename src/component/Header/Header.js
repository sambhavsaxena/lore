import React from 'react';

function Header() {
    return (
        <div className='header container'>
            <h1>LORE</h1>
            <h6>
                A subordinate end-point for the{' '}
                <a href='https://yts.mx/' target={'blank'}>
                    YTS
                </a>{' '}
                servers for an ad-free download experience.
            </h6>
        </div>
    );
}

export default Header;
