import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router';
import { logout } from '../../redux/reducer/authReducer';
import axios from 'axios';

const SearchPicturesPage = () => {
    const [imageRequest, updateImageRequest] = useState('');
    const [sizeValue, updateSizeValue] = useState('small'); // Size choosen by default
    const userSelector = useSelector(state => state.auth.user);
    const [url, updateURL] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userSelector === null) {
            navigate("/");
        }
    }, [userSelector, navigate])

    const formHandler = (e) => {
        e.preventDefault() // Prevent form from premature refresh

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

    return (
        <div className="home-page">
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    <form onSubmit={ formHandler }>
                        <h2>Search Pictures</h2>
                        <p>AI Art </p>
                        <label style={{ marginTop: '1rem' }}>Enter a sentence below describing the picture you are looking for</label>
                        <input style={{ marginLeft: '25%', width: '50%' }} type="text" className='form-control' onChange={e => updateImageRequest(e.target.value)} /><br />
                        <select style={{ marginLeft: '25%', width: '50%' }} onChange={e => updateSizeValue(e.target.value)} className="form-select" aria-label="Default select example">
                            <option>Select size</option>
                            <option selected value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                        <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary'>Search</button><br />
                        { 
                            url === '' ? null : 
                                <>
                                    <h3 style={{ marginTop: '5rem', marginBottom: '1rem' }}>Your Image: { imageRequest.charAt(0).toUpperCase() + imageRequest.substring(1) }</h3>
                                    <img alt="" 
                                         src={`${url}`} 
                                         id="image" 
                                         height={ sizeValue === 'small' ? "200" : ( sizeValue === 'medium' ? "350" : "500" )} /> 
                                </>         
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchPicturesPage;