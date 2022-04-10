import React, { useState } from 'react';
import { Alert, Button, CloseButton } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { app } from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';


const Login = ({ authcheck, setAuthcheck }) => {

  // navigate hook
  const navigate = useNavigate();

  // get firebase Auth
  const auth = getAuth(app);

  // login state
  const [login, setLogin] = useState({
    email     : '',
    password  : ''
  });

  // alert state
  const [alert, setAlert] = useState({
    msg : '',
    type : '',
    status : false
  });

  // Alert manage
  const handleAlertClose = () => {
    setAlert({
      status : false
    });
  }


  // form submit 
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if( login.email === '' || login.password === '' ){

      setAlert({
        msg : 'All Feilds Are Required !',
        type : 'danger',
        status : true
      });

    }else{

      signInWithEmailAndPassword(auth, login.email, login.password)
      .then(useCredential => {

        sessionStorage.setItem('auth', JSON.stringify(true));
        setAuthcheck(true);
        navigate('/profile');

      })
      .catch(error => {

        setAlert({
          msg : 'LogIn Faild !',
          type : 'danger',
          status : true
        });

      });

    }


  }


  

  return (
    <>

        <div className="mt-5 shadow"></div>
        <div className="login-block">
            <h1>User Login</h1>
            {
              alert.status && <Alert className='d-flex justify-content-between' variant={ alert.type }> { alert.msg } <CloseButton onClick={ handleAlertClose }></CloseButton> </Alert>
            }
            <form onSubmit={ handleFormSubmit }>
              <input type="text" value={ login.email } onChange={ (e) => setLogin({ ...login, email : e.target.value }) } placeholder="Email" id="username" />

              <input type="password" value={ login.password } onChange={ (e) => setLogin({ ...login, password : e.target.value }) } placeholder="Password" id="password" />

              <Button id="submit-btn" type='submit' className='btn-info'>LogIn</Button>
            </form>
            
            <hr />
            <Link to='/register' style={{ textDecoration: 'none', color : 'black' }}>Create an Account</Link>
        </div>


            
    </>
  )
};

export default Login;