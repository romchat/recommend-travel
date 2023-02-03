import React from 'react';

import './footer.css'

export const Footer = (props) => {
    return (
        <div className={`footer-${props.themeColor}`}>
            <img className='footer-icon' src={'image/strawberry.png'} />
            <span className='footer-text'>ไร่สตรอเบอรี่ไผ่สีทอง</span>
        </div>
    );
}