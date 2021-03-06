import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';



const Profile = ({ setAuthcheck }) => {

    //navigate
    const navigate = useNavigate();

    // logout
    const handleLogOut = (e) => {
        e.preventDefault();

        sessionStorage.removeItem('auth');
        setAuthcheck(false);
        navigate('/');
    }



  return (
    <>
    
    <div className="container d-flex justify-content-center align-items-center">
        <div className="card">
            <div className="upper"> 
            <img src="https://i.imgur.com/Qtrsrk5.jpg" alt='' className="img-fluid" /> 
            </div>
            <div className="user text-center">
                <div className="profile"> 
                <img src="https://i.imgur.com/JgYD2nQ.jpg" alt="" className="rounded-circle" width="80"/>
                </div>
            </div>
            <div className="mt-5 text-center">
                <h4 className="mb-0">Benjamin Tims</h4> <span className="text-muted d-block mb-2">User Profile</span> 

                <Link to='/all_student' className="btn btn-primary btn-sm follow">All User</Link>

                <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                    <div className="stats">
                        <h6 className="mb-0">Followers</h6> <span>8,797</span>
                    </div>
                    <div className="stats">
                        <h6 className="mb-0">Projects</h6> <span>142</span>
                    </div>
                    <div className="stats">
                        <h6 className="mb-0">Ranks</h6> <span>129</span>
                    </div>
                </div>

                <hr />
            <button onClick={ handleLogOut } className="btn-info d-block w-100" style={{ color : 'black', borderRadius : '10px', border : 'none' }}>LogOut</button>

            </div>
            
        </div>
    </div>
    
    </>
  )
};

export default Profile;