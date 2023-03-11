import React from 'react';

function Footer() {
    return (
        <div className='footer'>
            <p>
                By using this site, you agree to accept the{' '}
                <a
                    href='https://yts.mx/terms'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    terms of use
                </a>
                .
            </p>
            <p>
                LORE &copy; {new Date().getFullYear()} | By{' '}
                <a href='https://github.com/sambhavsaxena'>
                    <strong>Sambhav Saxena</strong>
                </a>
            </p>
        </div>
    );
}

export default Footer;
