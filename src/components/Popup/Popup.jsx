import React, { useState } from 'react';
import { faCircleCheck, faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';

import './popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Row, Col, Form, Button } from 'react-bootstrap';

export const Popup = (props) =>{
    const [status, setStatus] = useState({type:'',message:'',showStatus: false, object: {}});
    return (
        <>
            {props.toggle !== '' ?
                <div className='popup'>
                    {props.toggle === 'register' ? <Register setToggle={props.setToggle.bind(this)} setStatus={setStatus.bind(this)} status={status} /> : null}
                    {props.toggle === 'login' ? <Login setToggle={props.setToggle.bind(this)} setStatus={setStatus.bind(this)} status={status} /> : null}
                    {status.showStatus ? <Success status={status} setToggle={props.setToggle.bind(this)} setStatus={setStatus.bind(this)}  loginDetail={props.loginDetail} setLogin={props.setLogin.bind(this)} />: null}
                </div>
            :null}
        </>
    );
}

export const Register = (props) => {
    let invalidKey = ['Backspace','Escape','Tab','CapsLock','Shift','Control','Unidentified','Alt','Enter','Backspace'];

    const [validated, setValidated] = useState(false);
    const [checkBankAcc, setBankAcc] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [errorMessage, setErrorMassge] = useState({tel: '', password:'', firstname: '', lastname: '', bankNumber: ''})

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        let haveError = false;

        if( 
            errorMessage.tel !== '' ||
            errorMessage.password !== '' || 
            errorMessage.firstname !== '' ||
            errorMessage.lastname !== '' ||
            errorMessage.bankNumber !== ''
        ){
            haveError = true;
        }

        event.preventDefault();
        event.stopPropagation();

        if(!haveError){
            if(form.checkValidity()){
                let object = {
                    tel: form.number.value,
                    password: form.password.value,
                    firstname: form.firstname.value,
                    lastname: form.lastname.value,
                    bankAcc: form.bankAcc.value,
                    bankNum: form.bankNum.value
                }
                props.setStatus({...props.status,type:'register',message:'การลงทะเบียนสำเร็จ',showStatus: true,object: object});
            }
            setValidated(true);
        }
    };

    return (
        <div className='popup-modal'>
            <div className='popup-header'>
                <div className='left'>Register</div>
                <div className='right'>
                    <FontAwesomeIcon icon={faTimes} onClick={()=>{props.setToggle('')}} style={{cursor:"pointer"}} />
                </div>
            </div>
            <hr/>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>หมายเลขโทรศัพท์</Form.Label>
                    <Form.Control 
                        required
                        type="text"
                        placeholder='หมายเลขโทรศัพท์'
                        style={{marginBottom:"5px"}}
                        maxLength={10}
                        id="number"
                        onKeyUp={(e)=>{
                            if(validated){
                                setValidated(false);
                            }
                            let regex = /^([0-9]*)$/; //regex for type only number
                            let regex2 = /^(06|08|09)/; //regex for first 2 char is 06 08 09
                            let idNumber = document.getElementById('number');
                            if(e.key === ' '){ e.preventDefault(); }
                            if(invalidKey.indexOf(e.key) === -1 && (errorMessage.tel === '' || errorMessage.tel === 'หมายเลขโทรศัพท์ต้องขึ้นต้นด้วย 06, 08, 09 เท่านั้น')  && !regex.test(e.key)){
                                idNumber.classList.remove('is-valid');
                                idNumber.classList.add('is-invalid');
                                setErrorMassge({...errorMessage,tel: 'กรอกได้เฉพาะตัวเลข 0-9 และห้ามกรอกอักษรพิเศษ'});
                            }else if(regex.test(e.key)){
                                if(!regex2.test(idNumber.value) && (errorMessage.tel === '' || errorMessage.tel === 'กรอกได้เฉพาะตัวเลข 0-9 และห้ามกรอกอักษรพิเศษ')){
                                    idNumber.classList.remove('is-valid');
                                    idNumber.classList.add('is-invalid');
                                    setErrorMassge({...errorMessage,tel: 'หมายเลขโทรศัพท์ต้องขึ้นต้นด้วย 06, 08, 09 เท่านั้น'});
                                    
                                }else if(errorMessage.tel !== '' && regex2.test(idNumber.value)){
                                    idNumber.classList.remove('is-invalid');
                                    idNumber.classList.add('is-valid');
                                    setErrorMassge({...errorMessage,tel: ''});
                                }
                            }
                        }}                 
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage.tel === '' ? 'กรุณากรอกค่าในช่องนี้' : errorMessage.tel}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <div className='hide-btn-cover' style={{marginBottom:"5px"}}>
                        <Form.Control 
                            required
                            type={showPassword ? 'password' : 'text'}
                            placeholder='รหัสผ่าน'
                            id="password"
                            onKeyUp={(e)=>{
                                if(validated){
                                    setValidated(false);
                                }
                                let regex = /^([0-9A-Za-z]*)$/; //regex for type only 0-9 A-Z a-z
                                let regex2 = /^([A-Z][0-9A-Za-z]*)$/; //regex for type only 0-9 A-Z a-z that start with A-Z
                                let idPassword = document.getElementById('password');
                                if(e.key === ' '){ e.preventDefault(); }
                                if(invalidKey.indexOf(e.key) === -1 && !regex.test(e.key) && (errorMessage.password === '' || errorMessage.password === 'กรุณากรอกค่าในช่องนี้')){
                                    idPassword.classList.remove('is-valid');
                                    idPassword.classList.add('is-invalid');
                                    setErrorMassge({...errorMessage, password: 'ห้ามพิมพ์ภาษาไทย และห้ามกรอกอักษรพิเศษ'});
                                }else if(regex.test(e.key)){
                                    if(!regex2.test(idPassword.value)){
                                        idPassword.classList.remove('is-valid');
                                        idPassword.classList.add('is-invalid');
                                        setErrorMassge({...errorMessage, password: 'ตัวอักษรตัวแรกต้องเป็นตัวพิมพ์ใหญ่เท่านั้น'});
                                    }else if(errorMessage.password !== ''){
                                        idPassword.classList.remove('is-invalid');
                                        idPassword.classList.add('is-valid');
                                        setErrorMassge({...errorMessage, password: ''}); 
                                    }
                                }
                            }}
                        />
                        {showPassword ?
                            <span title="คลิกเพื่อดูรหัสผ่าน" className='hide-btn-password' onClick={()=>{setShowPassword(!showPassword)}}><FontAwesomeIcon icon={faEye} /></span>
                            :
                            <span title="คลิกเพื่อซ่อนรหัสผ่าน" className='hide-btn-password' onClick={()=>{setShowPassword(!showPassword)}}><FontAwesomeIcon icon={faEyeSlash} /></span>
                        }
                        <Form.Control.Feedback type="invalid">{errorMessage.password === '' ? 'กรุณากรอกค่าในช่องนี้' : errorMessage.password}</Form.Control.Feedback>
                    </div>
                </Form.Group>
                <Row style={{marginBottom:"5px"}}>
                    <Form.Group as={Col} md="6">
                        <Form.Label>ชื่อ</Form.Label>
                        <Form.Control 
                            required
                            type="text"
                            placeholder='ชื่อ'
                            id="firstname"
                            onKeyDown={(e)=>{
                                let idFirstname = document.getElementById('firstname');
                                let idLastname = document.getElementById('lastname');
                                if(validated){
                                    setValidated(false);
                                }
                                let regex = /^([a-zA-Z]*)$/ //regex for english language
                                let regex2 = /ู^([\u0E00-\u0E7F]*)$/ //regex for thai language
                                let regex3 = /^([0-9]*)$/ //regex for type number
                                if(e.key === ' '){ e.preventDefault(); }
                                if(invalidKey.indexOf(e.key) === -1){
                                    if(!regex3.test(idFirstname.value) && !regex3.test(idLastname.value)){
                                        if(
                                            (regex.test(idFirstname.value) && !regex.test(idLastname.value)) ||
                                            (regex2.test(idFirstname.value) && !regex2.test(idLastname.value))
                                        ){
                                            idFirstname.classList.remove('is-valid');
                                            idFirstname.classList.add('is-invalid');
                                            idLastname.classList.remove('is-valid');
                                            idLastname.classList.add('is-invalid');
                                            setErrorMassge({...errorMessage, firstname: 'กรุณากรอกชื่อ-นามสกุลเป็นภาษาเดียวกัน',lastname: 'กรุณากรอกชื่อ-นามสกุลเป็นภาษาเดียวกัน'}); 
                                        }else{
                                            idFirstname.classList.remove('is-invalid');
                                            idFirstname.classList.add('is-valid');
                                            idLastname.classList.remove('is-invalid');
                                            idLastname.classList.add('is-valid');
                                            setErrorMassge({...errorMessage, firstname: '',lastname: ''}); 
                                        }
                                    }else{
                                        if(regex3.test(idFirstname.value) && idFirstname.value !== ''){
                                            idFirstname.classList.remove('is-valid');
                                            idFirstname.classList.add('is-invalid');
                                            setErrorMassge({...errorMessage, firstname: 'ห้ามกรอกชื่อเป็นตัวเลข'}); 
                                        }else if(idFirstname.value !== ''){
                                            idFirstname.classList.remove('is-invalid');
                                            idFirstname.classList.add('is-valid');
                                            setErrorMassge({...errorMessage,firstname: ''}); 
                                        }
                                        if(regex3.test(idLastname.value) && idLastname.value !== ''){
                                            idLastname.classList.remove('is-valid');
                                            idLastname.classList.add('is-invalid');
                                            setErrorMassge({...errorMessage, lastname: 'ห้ามกรอกนามสกุลเป็นตัวเลข'}); 
                                        }else if(idLastname.value !== ''){
                                            idLastname.classList.remove('is-invalid');
                                            idLastname.classList.add('is-valid');
                                            setErrorMassge({...errorMessage,lastname: ''}); 
                                        }
                                    }
                                }
                            }}
                        />
                        <Form.Control.Feedback type="invalid">{errorMessage.firstname === '' ? 'กรุณากรอกค่าในช่องนี้' : errorMessage.firstname}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>นามสกุล</Form.Label>
                        <Form.Control 
                            required
                            type="text"
                            placeholder='นามสกุล'
                            id='lastname'
                            onKeyDown={(e)=>{
                                let idFirstname = document.getElementById('firstname');
                                let idLastname = document.getElementById('lastname');
                                if(validated){
                                    setValidated(false);
                                }
                                let regex = /^([a-zA-Z]*)$/ //regex for english language
                                let regex2 = /ู^([\u0E00-\u0E7F]*)$/ //regex for thai language
                                let regex3 = /^([0-9]*)$/ //regex for type number
                                if(e.key === ' '){ e.preventDefault(); }
                                if(invalidKey.indexOf(e.key) === -1){
                                    if(!regex3.test(idFirstname.value) && !regex3.test(idLastname.value)){
                                        if(
                                            (regex.test(idFirstname.value) && !regex.test(idLastname.value)) ||
                                            (regex2.test(idFirstname.value) && !regex2.test(idLastname.value))
                                        ){
                                            idFirstname.classList.remove('is-valid');
                                            idFirstname.classList.add('is-invalid');
                                            idLastname.classList.remove('is-valid');
                                            idLastname.classList.add('is-invalid');
                                            setErrorMassge({...errorMessage, firstname: 'กรุณากรอกชื่อ-นามสกุลเป็นภาษาเดียวกัน',lastname: 'กรุณากรอกชื่อ-นามสกุลเป็นภาษาเดียวกัน'}); 
                                        }else{
                                            idFirstname.classList.remove('is-invalid');
                                            idFirstname.classList.add('is-valid');
                                            idLastname.classList.remove('is-invalid');
                                            idLastname.classList.add('is-valid');
                                            setErrorMassge({...errorMessage, firstname: '',lastname: ''}); 
                                        }
                                    }else{
                                        if(regex3.test(idFirstname.value) && idFirstname.value !== ''){
                                            idFirstname.classList.remove('is-valid');
                                            idFirstname.classList.add('is-invalid');
                                            setErrorMassge({...errorMessage, firstname: 'ห้ามกรอกชื่อเป็นตัวเลข'}); 
                                        }else if(idFirstname.value !== ''){
                                            idFirstname.classList.remove('is-invalid');
                                            idFirstname.classList.add('is-valid');
                                            setErrorMassge({...errorMessage,firstname: ''}); 
                                        }
                                        if(regex3.test(idLastname.value) && idLastname.value !== ''){
                                            idLastname.classList.remove('is-valid');
                                            idLastname.classList.add('is-invalid');
                                            setErrorMassge({...errorMessage, lastname: 'ห้ามกรอกนามสกุลเป็นตัวเลข'}); 
                                        }else if(idLastname.value !== ''){
                                            idLastname.classList.remove('is-invalid');
                                            idLastname.classList.add('is-valid');
                                            setErrorMassge({...errorMessage,lastname: ''}); 
                                        }
                                    }
                                }
                            }}
                        />
                        <Form.Control.Feedback type="invalid">{errorMessage.lastname === '' ? 'กรุณากรอกค่าในช่องนี้' : errorMessage.lastname}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                    <Form.Label>บัญชีธนาคาร</Form.Label>
                    <Form.Select style={{marginBottom:"5px"}}
                        id="bankAcc" 
                        onChange={(e)=>{
                            if(validated){
                                setValidated(false);
                            }
                            if(e.target.value === ''){
                                let banknumID = document.getElementById('bankNum');
                                banknumID.value = '';
                                banknumID.classList.remove('is-invalid');
                                banknumID.classList.remove('is-valid');
                                setErrorMassge({...errorMessage, bankNumber: ''}); 
                            }
                            setBankAcc(e.target.value)
                        }}
                    >
                        <option value="">เลือกบัญชีธนาคาร</option>
                        <option value="กรุงเทพ">กรุงเทพ</option>
                        <option value="กสิกร">กสิกร</option>
                        <option value="ไทยพาณิชย์">ไทยพาณิชย์</option>
                    </Form.Select>
                <Form.Group>
                    <Form.Control 
                        type="text"
                        maxLength={10}
                        disabled={checkBankAcc === ''}
                        style={{marginBottom:"5px"}}
                        required={checkBankAcc !== ''}
                        id="bankNum"
                        onKeyUp={(e)=>{
                            let banknumID = document.getElementById('bankNum');
                            let regex = /^([0-9]*)$/; //regex for type only number
                            if(e.key === ' '){ e.preventDefault(); }
                            if(invalidKey.indexOf(e.key) === -1 && !regex.test(e.key) && (errorMessage.bankNumber === '' || errorMessage.bankNumber === 'กรุณากรอกค่าในช่องนี้')){
                                banknumID.classList.remove('is-valid');
                                banknumID.classList.add('is-invalid');
                                setErrorMassge({...errorMessage, bankNumber: 'กรอกได้เฉพาะตัวเลขเท่านั้น'});
                            }else if(regex.test(e.key) && errorMessage.bankNumber !== ''){
                                banknumID.classList.remove('is-invalid');
                                banknumID.classList.add('is-valid');
                                setErrorMassge({...errorMessage, bankNumber: ''});
                            }
                        }}
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage.bankNumber === '' && checkBankAcc !== '' ? 'กรุณากรอกเลขบัญชีธนาคาร' : errorMessage.bankNumber}</Form.Control.Feedback>
                </Form.Group>
                <div style={{textAlign:"center",marginTop:"10px"}}>
                    <Button type="submit">Submit</Button> <Button variant="secondary" onClick={()=>{props.setToggle('')}}>Close</Button>
                </div>
            </Form>
        </div>
    );
}

export const Login = (props) => {
    let invalidKey = ['Backspace','Escape','Tab','CapsLock','Shift','Control','Unidentified','Alt','Enter','Backspace'];

    const [validated, setValidated] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [errorMessage, setErrorMassge] = useState({tel: '', password:''})

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        let haveError = false

        if( 
            errorMessage.tel !== '' ||
            errorMessage.password !== '' 
        ){
            haveError = true;
        }

        event.preventDefault();
        event.stopPropagation();

        if(!haveError){
            setValidated(true);
            props.setStatus({...props.status,type:'login',message:'ลงชื่อเข้าใช้งานสำเร็จ',showStatus: true,object: {tel: form.number.value}});
        }
    };

    return (
        <div className='popup-modal'>
            <div className='popup-header'>
                <div className='left'>Login</div>
                <div className='right'>
                    <FontAwesomeIcon icon={faTimes} onClick={()=>{props.setToggle('')}} style={{cursor:"pointer"}} />
                </div>
            </div>
            <hr/>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>หมายเลขโทรศัพท์</Form.Label>
                    <Form.Control 
                        required
                        type="text"
                        placeholder='หมายเลขโทรศัพท์'
                        style={{marginBottom:"5px"}}
                        maxLength={10}
                        id="number"
                        onKeyUp={(e)=>{
                            let regex = /^([0-9]*)$/; //regex for type only number
                            let regex2 = /^(06|08|09)/; //regex for first 2 char is 06 08 09
                            let idNumber = document.getElementById('number');
                            if(invalidKey.indexOf(e.key) === -1 && (errorMessage.tel === '' || errorMessage.tel === 'กรุณากรอกค่าในช่องนี้')  && !regex.test(e.key)){
                                idNumber.classList.remove('is-valid');
                                idNumber.classList.add('is-invalid');
                                setErrorMassge({...errorMessage,tel: 'กรอกได้เฉพาะตัวเลข 0-9 และห้ามกรอกอักษรพิเศษ'});
                            }else if(regex.test(e.key)){
                                if(!regex2.test(idNumber.value) && (errorMessage.tel === '' || errorMessage.tel === 'กรุณากรอกค่าในช่องนี้')){
                                    idNumber.classList.remove('is-valid');
                                    idNumber.classList.add('is-invalid');
                                    setErrorMassge({...errorMessage,tel: 'หมายเลขโทรศัพท์ต้องขึ้นต้นด้วย 06, 08, 09 เท่านั้น'});
                                    
                                }else if(errorMessage.tel !== '' && regex2.test(idNumber.value)){
                                    idNumber.classList.remove('is-invalid');
                                    idNumber.classList.add('is-valid');
                                    setErrorMassge({...errorMessage,tel: ''});
                                }
                            }
                        }}                 
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage.tel}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <div className='hide-btn-cover' style={{marginBottom:"5px"}}>
                        <Form.Control 
                            required
                            type={showPassword ? 'password' : 'text'}
                            placeholder='รหัสผ่าน'
                            id="password"
                            onKeyUp={(e)=>{
                                if(validated){
                                    setValidated(false);
                                }
                                let regex = /^([0-9A-Za-z]*)$/; //regex for type only 0-9 A-Z a-z
                                let regex2 = /^([A-Z][0-9A-Za-z]*)$/; //regex for type only 0-9 A-Z a-z that start with A-Z
                                let idPassword = document.getElementById('password');
                                if(e.key === ' '){ e.preventDefault(); }
                                if(invalidKey.indexOf(e.key) === -1 && !regex.test(e.key) && (errorMessage.password === '' || errorMessage.password === 'กรุณากรอกค่าในช่องนี้')){
                                    idPassword.classList.remove('is-valid');
                                    idPassword.classList.add('is-invalid');
                                    setErrorMassge({...errorMessage, password: 'ห้ามพิมพ์ภาษาไทย และห้ามกรอกอักษรพิเศษ'});
                                }else if(regex.test(e.key)){
                                    if(!regex2.test(idPassword.value)){
                                        idPassword.classList.remove('is-valid');
                                        idPassword.classList.add('is-invalid');
                                        setErrorMassge({...errorMessage, password: 'ตัวอักษรตัวแรกต้องเป็นตัวพิมพ์ใหญ่เท่านั้น'});
                                    }else if(errorMessage.password !== ''){
                                        idPassword.classList.remove('is-invalid');
                                        idPassword.classList.add('is-valid');
                                        setErrorMassge({...errorMessage, password: ''}); 
                                    }
                                }
                            }}
                        />
                        {showPassword ?
                            <span title="คลิกเพื่อดูรหัสผ่าน" className='hide-btn-password' onClick={()=>{setShowPassword(!showPassword)}}><FontAwesomeIcon icon={faEye} /></span>
                            :
                            <span title="คลิกเพื่อซ่อนรหัสผ่าน" className='hide-btn-password' onClick={()=>{setShowPassword(!showPassword)}}><FontAwesomeIcon icon={faEyeSlash} /></span>
                        }
                        <Form.Control.Feedback type="invalid">{errorMessage.password === '' ? 'กรุณากรอกค่าในช่องนี้' : errorMessage.password}</Form.Control.Feedback>
                    </div>
                </Form.Group>
                <div style={{textAlign:"center",marginTop:"10px"}}>
                    <Button type="submit">Submit</Button> <Button variant="secondary" onClick={()=>{props.setToggle('')}}>Close</Button>
                </div>
            </Form>
        </div>
    );
}

export const Success = (props) =>{
    return(
        <div className='popup' style={{color:"green"}}>
            <div className='popup-modal' style={{textAlign:"center"}}>
                <FontAwesomeIcon icon={faCircleCheck} color="green" style={{fontSize:"48px"}} /> <br/>
                <div style={{fontSize:"24px", fontWeight:600}}>{props.status.message}</div>
                {props.status.type==='register'?
                    <div style={{textAlign:"left", margin:"0px 30px"}}>
                        <hr/>
                        <div>หมายเลขโทรศัพท์: {props.status.object.tel}</div>
                        <div>ชื่อ-สกุล: {props.status.object.firstname} {props.status.object.lastname}</div>
                        <div>บัญชีธนาคาร: {props.status.object.bankAcc}</div>
                        <div>หมายเลขบัญชีธนาคาร: {props.status.object.bankNum}</div>
                        <hr/>
                    </div>
                :null}
                <Button variant='secondary' style={{marginTop:"10px"}} 
                    onClick={()=>{
                        props.setToggle(''); 
                        props.setLogin({...props.loginDetail, username: props.status.object.tel});
                        props.setStatus({type:'',message:'',showStatus: false, object: {}});
                    }}>
                        Close
                </Button>
            </div>
        </div>   
    );
}