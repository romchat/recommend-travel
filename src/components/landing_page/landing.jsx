import React, { useEffect, useState} from 'react';
import { Header } from '../header/header';
import { Highlight, Content, Comment } from '../content/content';
import { Footer } from '../footer/footer';

import './landing.css'

export const Landing = () => {

    const [themeColor, setTheme] = useState('red-black');

    return (
        <div className={`theme-${themeColor} landing`}>
            <Header themeColor={themeColor} setTheme={setTheme.bind(this)} />
            <Highlight />
            <Content />
            <Comment />
            <Footer themeColor={themeColor} />
        </div>
    );
}