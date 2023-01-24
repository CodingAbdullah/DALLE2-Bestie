import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router';

const HomePage = () => {
    const [imageRequest, updateImageRequest] = useState('');
    const navigate = useNavigate();
    const selector = useSelector(state => state.isLoggedIn);

    useEffect(() => {
        if (!selector) {
            navigate("/");
        }
    }, [])

    const formHandler = () => {

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
                        <select style={{ marginLeft: '25%', width: '50%' }} className="form-select" aria-label="Default select example">
                            <option selected>Select size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                        <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary'>Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomePage;