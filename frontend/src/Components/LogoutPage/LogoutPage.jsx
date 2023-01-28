import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/reducer/authReducer';

const LogoutPage = () => {
    const selector = useSelector(state => state.auth.user); // Use redux selector hook to see if user is in fact logged in
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selector === null) { // Check if user is already logged out
            navigate("/")
        }
        else {
            // Dispath redux logout action to clear state and token
            dispatch(logout());
        }   
    }, [selector, navigate, dispatch]);

    return (
        <div className='logout-page'>
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    <h2>Logged Out</h2>
                    <p>Hope you enjoyed your stay and have a productive rest of your day!</p>
                    <button style={{ marginTop: '2rem' }} class="btn btn-success" onClick={ () => navigate("/") }>Home</button>
                </div>
            </div>
        </div>
    )
}

export default LogoutPage;