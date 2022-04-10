import { useEffect, useState } from 'react';
import Login from './Components/Authentication/Login';
import Profile from './Components/Authentication/Profile';
import Register from './Components/Authentication/Register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Student from './Components/Student/Student';



function App() {

  // route secure state
  const [authcheck, setAuthcheck] = useState(true);


  // Route sucurity checking Component
  const AuthSecurity = ({ children }) => {
      return authcheck ? children : <Navigate to='/' />
  }


  // session stroage
  useEffect(() => {

    let authData = JSON.parse(sessionStorage.getItem('auth'));
    setAuthcheck(authData);

  });



  return (
    <>

      <BrowserRouter>

      <Routes>
        <Route path='/' element={ <Login authcheck={ authcheck } setAuthcheck={ setAuthcheck }></Login> } />
        <Route path='/register' element={ <Register></Register> } />
        <Route path='/profile' element={ <AuthSecurity><Profile authcheck={ authcheck } setAuthcheck={ setAuthcheck } /></AuthSecurity> } />
        <Route path='/all_student' element={ <AuthSecurity><Student authcheck={ authcheck } setAuthcheck={ setAuthcheck } /></AuthSecurity> } />
      </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
