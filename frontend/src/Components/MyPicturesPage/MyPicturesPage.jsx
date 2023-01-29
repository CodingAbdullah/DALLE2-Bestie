import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/reducer/authReducer';
import PictureItem from '../PictureItem/PictureItem';
import axios from 'axios';

const MyPicturesPage = () => {
    const userSelector = useSelector(state => state.auth.user);

    const dispatch = useDispatch(); 
    const navigate = useNavigate();   
    
    const [userPictures, updateUserPictures] = useState({
        information: null
    });

    useEffect(() => {
        if ( userSelector === null ) {
            dispatch(logout()); // User is not allowed to search this page, clear any data
            navigate("/"); // Redirect to home page
        }
        else {
            let options = {
                method: 'POST',
                body: JSON.stringify({ user: userSelector.user.email }),
                headers : {
                    'content-type' : 'application/json',
                    'Authorization' : 'Bearer ' + userSelector.token
                }
        }

        axios.post("http://localhost:5000/fetch-pictures", options)
        .then(response => {
            console.log(response.data);
            updateUserPictures((prevState) => {
                return {
                    ...prevState,
                    information: response.data
                }
            });
        })
        .catch(() => {
            dispatch(logout()); // Logout the user immediately if token is invalid or nonexistant and redirect
            navigate("/");
        });
        }
    }, []);

    if (userPictures.information === null) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div className='my-pictures-page'>
                <h1 style={{ marginTop: '2rem' }}>Your Picture Searches</h1>
                <div class='table-container container p-5'>
                    <div class="row">
                        {
                            userPictures.information.docs.map(pic => {
                                return (
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <PictureItem picture={pic} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MyPicturesPage;