import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/reducer/authReducer';
import PictureItem from '../PictureItem/PictureItem';
import axios from 'axios';
import Alert from '../Alert/Alert';
import { styles } from '../../css/MyPicturesPageCSS';

const MyPicturesPage = () => {
    const userSelector = useSelector(state => state.auth.user);
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const [emptyAlert, setEmptyAlert] = useState("");  
    
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
                body: JSON.stringify({ email: userSelector.user.email }),
                headers : {
                    'content-type' : 'application/json',
                    'Authorization' : 'Bearer ' + userSelector.token
                }
            }

            axios.post("http://localhost:5000/fetch-pictures", options)
            .then(response => {
                if (response.status === 201) {
                    updateUserPictures((prevState) => {
                        return {
                            ...prevState,
                            information: response.data
                        }
                    });
                }
                else {
                    setEmptyAlert("fetch-pictures-empty");
                }
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
    else if (emptyAlert === "fetch-pictures-empty") {
        return (
            <div className='my-pictures-page'>
                <Alert type={ emptyAlert} />
                <div className='bg-dark table-container container'>
                    <h1 style={ styles['h1-searches-label'] }>Your Saved Picture Searches</h1>
                    <p style={ styles.image_list_paragraph }>View your saved pictures</p>
                    <button style={styles['home-button']} className="btn btn-primary" onClick={ () => navigate("/") }>Go Home</button>
                </div>
            </div> 
        )  
    }
    else {
        return (
            <div className='my-pictures-page'>
                <div className='bg-dark table-container container'>
                    <h1 style={ styles['h1-searches-label'] }>Your Saved Picture Searches</h1>
                    <p style={ styles.image_list_paragraph }>View your saved pictures</p>
                    <div className="row">
                        {
                            userPictures.information.docs.map(pic => {
                                return (
                                    <div className="col-sm-12 col-md-6 col-lg-3 gx-1.5 gy-1.5 p-3">
                                        <PictureItem picture={pic} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button style={styles['home-button']} className="btn btn-primary" onClick={ () => navigate("/") }>Go Home</button>
                </div>
            </div>
        )
    }
}

export default MyPicturesPage;