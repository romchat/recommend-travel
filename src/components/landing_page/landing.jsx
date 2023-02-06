import React, { useState } from 'react';
import { Header } from '../header/header';
import { Highlight, Content } from '../content/content';
import { Footer } from '../footer/footer';

import './landing.css'

export const Landing = () => {

    const [themeColor, setTheme] = useState('red-black');
    const [loginDetail, setLogin] = useState({username : ''});

    return (
        <div className={`theme-${themeColor} landing`}>
            <Header themeColor={themeColor} setTheme={setTheme.bind(this)} loginDetail={loginDetail} setLogin={setLogin.bind(this)} />
            <Highlight />
            <Content />
            <Footer themeColor={themeColor} />
        </div>
    );
}