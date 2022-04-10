import React, { Component } from 'react';
import { Button, CloseButton, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { app } from '../../firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import './Auth.css';

class Register extends Component {

  constructor(){
    super();

    this.state = {
      email : '',
      password : '',
      msg : '',
      type : '',
      status : false
      
    }

console.log(this.state);
  }



  render() {

    // getAuth
    const auth = getAuth(app);

    // Alert manage
    const handleAlertClose = () => {
      this.setState({
        status : false
      });
    }



    // form submit
    const handleFormSubmit = (e) => {
      e.preventDefault();

      // validation
      if( this.state.email === '' || this.state.password === '' ){

        this.setState({
          msg : 'All Feilds are required !',
          type : 'danger',
          status : true
        });

      }else{

        // data store
        createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then(userCredential => {

          this.setState({
            msg : 'Account Created Successfully',
            type : 'success',
            status : true
          });

          this.setState({
            email : '',
            password : ''
          });

        });
        
      }

    }


    return (
      <>

      <div className="mt-5 shadow"></div>
        <div className="login-block">
            <h1>User Registration</h1>

            {
              this.state.status && <Alert className='d-flex justify-content-between' variant={ this.state.type }> { this.state.msg } <CloseButton onClick={ handleAlertClose }></CloseButton> </Alert>
            }

            <form onSubmit={ handleFormSubmit } style={{ paddingBottom : '10px' }}>
              <input type="email" value={ this.state.email } onChange={ (e) => this.setState({ email : e.target.value }) } placeholder="Email" id="username" />

              <input type="password" value={ this.state.password } onChange={ (e) => this.setState({ password : e.target.value }) } placeholder="Password" id="password" />

              <Button id='submit-btn' type='submit' className='btn-info'>Submit</Button>
            </form>
            <hr />
            <Link to="/" style={{ textDecoration: 'none', color : 'black' }}>User Login</Link>
      </div>
      
      </>
    )
  }
}


export default Register;