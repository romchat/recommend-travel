import React, { useState } from 'react';
import { Popup } from '../Popup/Popup';

import './header.css'
import { Row, Col, Container } from 'react-bootstrap';

export const Header = (props) => {
    const [toggle, setToggle] = useState('');
    return (
        <>
            <Popup toggle={toggle} setToggle={setToggle.bind(this)} loginDetail={props.loginDetail} setLogin={props.setLogin.bind(this)} />
            <div className={`header header-${props.themeColor}`}>
                <Container fluid style={{padding:"0"}}>
                    <Row style={{margin:"0"}}>
                        {props.loginDetail.username === ''?
                            <Col style={{padding:"0"}}>
                                <div className='right-nav-section'>
                                    <button className={`sign-in-up-${props.themeColor}`} onClick={()=>{setToggle('login');}}>ลงชื่อเข้าใช้</button> 
                                    / 
                                    <button className={`sign-in-up-${props.themeColor}`} onClick={()=>{setToggle('register');}}>ลงทะเบียน</button>
                                </div>
                            </Col>
                        :
                            <Col style={{padding:"0"}}>
                                <div className='right-nav-section'>
                                    <button className={`sign-in-up-${props.themeColor}`}>ยินดีต้อนรับ คุณ {props.loginDetail.username}</button> 
                                    / 
                                    <button className={`sign-in-up-${props.themeColor}`} onClick={()=>{props.setLogin({...props.loginDetail,username: ''})}}>ลงชื่อออกจากระบบ</button>
                                </div>
                            </Col>
                        }
                        <Col style={{padding:"0"}}>
                            <div className='left-nav-section'>
                                <div className='btn-cover' onClick={()=>{props.setTheme('red-black')}}>
                                    <div className='btn-red'></div><div className='btn-black'></div>
                                </div> |
                                <div className='btn-cover' onClick={()=>{props.setTheme('sky-white')}}>
                                    <div className='btn-sky'></div><div className='btn-white'></div>
                                </div> |
                                <div className='btn-cover' onClick={()=>{props.setTheme('black-gold')}}>
                                    <div className='btn-black'></div><div className='btn-gold'></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}