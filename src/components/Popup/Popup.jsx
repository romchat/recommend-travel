import React, { useEffect, useState} from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Row, Col } from 'react-bootstrap';

export const Popup = (props) =>{
    const [status, setStatus] = useState('');
    return (
        <>
            {props.toggle !== '' ?
                <div className='popup'>
                    {props.toggle === 'register' ? <Register setToggle={props.setToggle.bind(this)} /> : null}
                    {props.toggle === 'login' ? <Login setToggle={props.setToggle.bind(this)} /> : null}
                    {status === 'error' ? <Error /> : null}
                    {status === 'success' ? <Success />: null}
                </div>
            :null}
        </>
    );
}

export const Register = (props) => {

    return (
        <div className='popup-modal'>
            <div className='popup-header'>
                <div className='left'>Register</div>
                <div className='right'>
                    <FontAwesomeIcon icon={faTimes} onClick={()=>{props.setToggle('')}} style={{cursor:"pointer"}} />
                </div>
            </div>
            <hr/>
            <Row style={{margin:"0"}}>
                <Col style={{padding:"0"}}>
                    <div>Firstname</div>
                    <input type="text" />
                </Col>
                <Col style={{padding:"0"}}>
                    <div>Lastname</div>
                    <input type="text" />
                </Col>
            </Row>
            <div>Bank account</div>
        </div>
    );
}

export const Login = (props) => {
    
    return (
        <div className='popup-modal'>
            <div className='popup-header'>
                <div className='left'>Login</div>
                <div className='right'>
                    <FontAwesomeIcon icon={faTimes} onClick={()=>{props.setToggle('')}} style={{cursor:"pointer"}} />
                </div>
            </div>
            <hr/>
        </div>
    );
}

export const Error = () =>{
    return (
        <div className='popup-modal'>
            Error
        </div>
    );
}

export const Success = () =>{
    return(
        <div className='popup-modal'>
            Success
        </div>   
    );
}