import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router';
import { logout } from '../../redux/reducer/authReducer';
import axios from 'axios';
import Alert from '../Alert/Alert';
import { styles } from '../../css/SearchPicturesPageCSS';

const SearchPicturesPage = () => {
    const [imageRequest, updateImageRequest] = useState('');
    const [setImageRequest, updateSetImageRequest] = useState('');
    const [sizeValue, updateSizeValue] = useState('small'); // Size choosen by default
    const userSelector = useSelector(state => state.auth.user);
    const [url, updateURL] = useState('');
    const [saveAlert, updateSaveAlert] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userSelector === null) {
            navigate("/");
        }
    }, [userSelector, navigate])

    const formHandler = (e) => {
        e.preventDefault() // Prevent form from premature refresh

        updateSaveAlert(''); // Remove alert upon a new search
        updateURL('loading...'); // Remove image upon new request
        updateSetImageRequest(imageRequest); // Display new picture name of requested search
        
        const options = {
            method: 'POST',
            body: JSON.stringify({ question: imageRequest, size: sizeValue }),
            headers: {
                'content-type' : 'application/json',
                'Authorization' : 'Bearer ' + userSelector.token
            }
        }

        // Make use of Open API generate image resource through the backend, passing in credentials and image request
        axios.post("http://localhost:5000/create-picture", options)
        .then(response => {
            updateURL(response.data.url[0].url);
        })
        .catch(() => {
            dispatch(logout()); // Logout the user immediately if token is invalid or nonexistant and redirect
            navigate("/");
        });
    }

    const saveHandler = () => {
        const options = {
            method: 'POST',
            body: JSON.stringify({ email: userSelector.user.email, search: imageRequest, url, size: sizeValue }),
            headers: {
                'content-type' : 'application/json',
                'Authorization' : 'Bearer ' + userSelector.token
            }
        };
        updateURL(''); // Update to empty URL
        
        axios.post("http://localhost:5000/insert-picture", options)
        .then((response) => {
            if (response.status === 201){
                updateSaveAlert('picture-save-success');
            }
            else if (response.status === 200) {
                updateSaveAlert('picture-save-alert');
            }
        })
        .catch(() => {
            dispatch(logout()); // Logout the user immediately if token is invalid or nonexistant and redirect
            navigate("/");
        });
    }

    return (
        <div className='search-pictures-page'>
            <div style={styles['search-page-jumbotron']} className="container">
                { saveAlert === '' ? null : <Alert type={ saveAlert } /> }
                <div className="row p-6">
                    <div className="bg-dark col-sm-12 col-md-12 col-lg-6">
                        <div className='d-flex-col text-white px-3 py-5'>
                            <form onSubmit={ formHandler }>
                                <h2 style={styles['search-page-heading']}>Search Pictures</h2>
                                <label style={styles['prompt-label']}>Enter a sentence below describing the picture you are looking for</label>
                                <input style={styles['prompt-input']} type="text" className='form-control' onChange={e => updateImageRequest(e.target.value)} /><br />
                                <select style={styles['size-value-selection']} onChange={e => updateSizeValue(e.target.value)} className="form-select" aria-label="Default select example">
                                    <option>Select size</option>
                                    <option selected value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                                <button style={styles['search-button']} className='btn btn-primary'>Search</button><br />
                                { url === 'loading...' ? <h4 style={styles['loading-label']}>Loading...</h4> : null }
                                { 
                                    url === '' || url === 'loading...' ? null : 
                                        <>
                                            <h3 style={styles['image-request-header']}>Your Image: { setImageRequest.charAt(0).toUpperCase() + setImageRequest.substring(1).toLowerCase() }</h3>
                                            <img alt="" 
                                                src={`${url}`} 
                                                id="image" 
                                                height={ sizeValue === 'small' ? "200" : ( sizeValue === 'medium' ? "350" : "500" )} /> 
                                            <br />
                                            {
                                                saveAlert === '' ? 
                                                    <button style={styles['save-profile-button']} className="btn btn-success" onClick={() => saveHandler()}>Save Picture to Profile</button>
                                                :
                                                    <button style={styles['save-profile-button']} className="btn btn-success" disabled>Save Picture to Profile</button>
                                            }
                                        </>         
                                }
                            </form>
                        </div>
                    </div>
                    <div className="bg-dark col-sm-12 col-md-12 text-white col-lg-6 py-5">
                        <img className="mr-5" src={require("../../assets/images/search.png")} alt="No Text" height="350" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPicturesPage;