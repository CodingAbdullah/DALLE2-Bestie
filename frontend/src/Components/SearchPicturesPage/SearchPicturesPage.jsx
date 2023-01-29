import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router';
import { logout } from '../../redux/reducer/authReducer';
import axios from 'axios';
import Alert from '../Alert/Alert';

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
        <div className="home-page">
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    <form onSubmit={ formHandler }>
                        <h2>Search Pictures</h2>
                        <p>AI Art </p>
                        { saveAlert === '' ? null : <Alert type={ saveAlert }/> }
                        <label style={{ marginTop: '1rem' }}>Enter a sentence below describing the picture you are looking for</label>
                        <input style={{ marginLeft: '25%', width: '50%' }} type="text" className='form-control' onChange={e => updateImageRequest(e.target.value)} /><br />
                        <select style={{ marginLeft: '25%', width: '50%' }} onChange={e => updateSizeValue(e.target.value)} className="form-select" aria-label="Default select example">
                            <option>Select size</option>
                            <option selected value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                        <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary'>Search</button><br />
                        { url === 'loading...' ? <h4 style={{ marginTop: '3rem' }}>Loading...</h4> : null }
                        { 
                            url === '' || url === 'loading...' ? null : 
                                <>
                                    <h3 style={{ marginTop: '5rem', marginBottom: '1rem' }}>Your Image: { setImageRequest.charAt(0).toUpperCase() + setImageRequest.substring(1).toLowerCase() }</h3>
                                    <img alt="" 
                                         src={`${url}`} 
                                         id="image" 
                                         height={ sizeValue === 'small' ? "200" : ( sizeValue === 'medium' ? "350" : "500" )} /> 
                                    <br />
                                    {
                                        saveAlert === '' ? 
                                            <button style={{ marginTop: '4rem'}} class="btn btn-success" onClick={() => saveHandler()}>Save Picture to Profile</button>
                                        :
                                            <button style={{ marginTop: '4rem'}} class="btn btn-success" disabled>Save Picture to Profile</button>
                                    }
                                </>         
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchPicturesPage;