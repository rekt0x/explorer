// @flow

import React from 'react';

import Routes from 'src/routes';
import Header from 'src/views/components/header/header';
import Footer from 'src/views/components/footer/footer';

function Main({location}) {
    return (
        <div className="app-container">
            <Header location={location}/>
            <main>
                <Routes />
            </main>
            <Footer />
        </div>
    );
}

export default Main;
