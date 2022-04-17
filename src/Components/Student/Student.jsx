import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, CloseButton, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection, getFirestore, onSnapshot } from 'firebase/firestore';
import './student.css';
import { app } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';



const Student = ({ setAuthcheck }) => {

    // get Storage connection
    const storage = getStorage(app);

    // Student File preview System
    let rmv_btn = document.querySelector('#rmv_btn');
    const [preview, setPreview] = useState('');
    const handlerFileManage = (e) => {
        
        let file_name = e.target.files[0];
        let img_url = URL.createObjectURL(file_name); 
        setPreview(img_url);
        rmv_btn.style.display = "block";
        rmv_btn.style.margin = "10px";
        setFile(file_name);

    }

    // img remove
    const handleRmvImg = (e) => {
        setPreview('');
        rmv_btn.style.display = "none";

    }
  
    // File Upload Manage
    const [file, setFile] = useState('');


    // form data
    const [studentinput, setStudentinput] = useState({
        name : '',
        gender : '',
        photo : ''
    });


    
    // Get firebase databse
    const db = getFirestore(app);

    //navigate
    const navigate = useNavigate();


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

        // image uploading system
        let file_name = new Date().getTime() + file.name;
        const imgRef = ref(storage, 'students/' + file_name); 
        const uploadedFile = uploadBytesResumable(imgRef, file);

        uploadedFile.on("state_change", (snapshot) => {

        }, (error) => {

        }, () => {

            getDownloadURL(uploadedFile.snapshot.ref).then( filePath => {

                // Data Store
                addDoc(collection(db, "users"), {

                    name : studentinput.name,
                    gender : studentinput.gender,
                    photo : filePath

                });

            });

        });

        
        

      // empty feilds
      setStudentinput({
        name : '',
        gender : '',
        photo : ''
      });

      setPreview('');
      rmv_btn.style.display = "none";

    }


    e.target.reset();


  }

  // Get all data state
  const [students, setStudents] = useState([]);





  // get all data form firebase store
  useEffect(() => {

    onSnapshot(collection(db, "users"), (data) => {

        let data_list = [];
        data.docs.forEach(items => {
            data_list.push(items.data());
        });

        setStudents(data_list);

    });

  }, [db]);



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
                                    <input type="file" className='form-control' onChange={ (e) => handlerFileManage(e) }/>
                                    <img style={{ maxWidth : '100%' }} src={ preview } alt="" />
                                    <Button id='rmv_btn' className='btn btn-sm btn-primay' style={{ display : 'none' }} onClick={ (e) => handleRmvImg(e) }>Remove</Button>
                                </Form.Group>
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
                            <div className="btns">
                                <Link to="/profile" className="btn-primary" style={{ color : 'white', borderRadius : '5px', border : 'none', textDecoration : 'none', padding : '10px' }}>Profile</Link> &nbsp;
                                <button onClick={ handleLogOut } className="btn-info" style={{ color : 'black', borderRadius : '5px', border : 'none', padding : '10px' }}>LogOut</button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Photo</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {
                                        students.map((data, index) => 
                                        
                                        <tr>
                                            <td>{ index + 1 }</td>
                                            <td>{ data.name }</td>
                                            <td>{ data.gender }</td>
                                            <td>
                                                <img style={{ widht : '30px', height : '30px' }} src={ data.photo } alt="" />
                                            </td>
                                            <td>
                                            <Button onClick='' variant='info' className="btn-sm">View </Button>&nbsp;

                                            <Button variant='warning' className="btn-sm">Edit</Button>&nbsp;

                                            <Button onClick='' variant='danger' className="btn-sm">Delete</Button>
                                            </td>
                                        </tr>
                                        
                                        )
                                    }
                                  
                                   
                                
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