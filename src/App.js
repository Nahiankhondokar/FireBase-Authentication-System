import Login from './Components/Authentication/Login';
import Profile from './Components/Authentication/Profile';
import Register from './Components/Authentication/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <>
      <BrowserRouter>

      <Routes>
        <Route path='/' element={ <Login></Login> } />
        <Route path='/register' element={ <Register></Register> } />
        <Route path='/profile' element={ <Profile></Profile> } />
      </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
