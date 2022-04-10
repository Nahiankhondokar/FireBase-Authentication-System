import React, { useState } from 'react';
import { Alert, Button, Card, CloseButton, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import './student.css';
import { app } from '../../firebase';


const Student = ({ setAuthcheck }) => {

    // Get firebase databse
    const db = getFirestore(app);

    //navigate
    const navigate = useNavigate();

    // form data
    const [studentinput, setStudentinput] = useState({
        name : '',
        gender : '',
        photo : ''
    });

console.log(studentinput);
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

    // logout
    const handleLogOut = (e) => {
        e.preventDefault();

        sessionStorage.removeItem('auth');
        setAuthcheck(false);
        navigate('/');
    }


    // form submit 
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if( studentinput.name === '' || studentinput.gender === '' ){

      setAlert({
        msg : 'All Feilds Are Required !',
        type : 'danger',
        status : true
      });

    }else{
        
      await addDoc(collection(db, "users"), {

        name : studentinput.name,
        gender : studentinput.gender,
        photo : studentinput.photo

      });

      setStudentinput({
        name : '',
        gender : '',
        photo : ''
      });

    }


  }



  return (
    <>

        <Container>
            <Row className='justify-content-center my-5'>
                <Col md={ 4 }  className='mr-3'>
                    <Card>
                        <Card.Header>
                            <h2>Create User </h2>
                        </Card.Header>
                            {
                                alert.status && <Alert className='d-flex justify-content-between' variant={ alert.type }> { alert.msg } <CloseButton onClick={ handleAlertClose }></CloseButton> </Alert>
                            }
                        <Card.Body>
                            <Form onSubmit={ handleFormSubmit }>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={ studentinput.name } onChange={ e => setStudentinput({ ...studentinput, name : e.target.value }) }></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className='w-100'>Gender</Form.Label>
                                    <input name='gender' type="radio" value='Male' id='Male' onClick={ e => setStudentinput({ ...studentinput, gender : e.target.value }) } /> <label htmlFor="Male">Male</label> &nbsp;

                                    <input name='gender' type="radio" value='Female' id='Female' onClick={ e => setStudentinput({ ...studentinput, gender : e.target.value }) }/> <label htmlFor="Female">Female</label>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control value={ studentinput.photo } onChange={ e => setStudentinput({ ...studentinput, photo : e.target.value }) }></Form.Control>
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Button variant='info' type='submit'>Submit</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={ 7 } style={{ marginLeft : '10px' }}>
                    <Card className="w-100">
                        <Card.Header className="d-flex justify-content-between">
                            <h3>All User</h3>
                            <button onClick={ handleLogOut } className="btn-info" style={{ color : 'black', borderRadius : '10px', border : 'none', width : '100px' }}>LogOut</button>
                        </Card.Header>
                        <Card.Body>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Skill</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr>
                                        <td>1</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                        <Button onClick='' variant='info' className="btn-sm">View </Button>&nbsp;

                                        <Button variant='warning' className="btn-sm">Edit</Button>&nbsp;

                                        <Button onClick='' variant='danger' className="btn-sm">Delete</Button>
                                        </td>
                                    </tr>
                                   
                                
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  )
};

export default Student;