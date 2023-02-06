import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { styles } from '../../css/HomePageCSS';

const HomePage = () => {
    const navigate = useNavigate();
    const userSelector = useSelector(state => state.auth.user);

    return (
        <div className='home-page'>
            <div style={ styles.container } className="container">
                <div className="row">
                    <div className="bg-dark col-sm-12 col-md-12 col-lg-12">
                        <div className='d-flex-col text-white bg-dark'>
                            {
                                userSelector === null || userSelector.firstName === undefined || userSelector.lastName === undefined ? 
                                    <h1 style={ styles['AI-ART-Title'] }>Welcome to AI Art!</h1>
                                :
                                    <h1 style={ styles['AI-ART-Title'] }>Welcome { userSelector.firstName + " " + userSelector.lastName }!</h1>
                            }
                                <p className="p-3" style={ styles['home-description-paragraph'] }>
                                    Describe, in your own words, what type of art you are looking for, the size you desire, and this site will
                                    have it automatically generated for you! Powered by the usual, React.js library and the creative ingenuity brought to life, <b><a target="_blank" rel="noreferrer" style={ styles['paragraph-link'] } href="https://openai.com/dall-e-2/">DALL·E 2</a></b> is your friend and it will do most of the heavy lifting, this site is just a faciliator.</p>
                                <p style={ styles['home-description-paragraph'] }>It would be cringe as a dev, to be taking <b>ALL</b> the credit for it. So what are you waitin' for? Search away!</p>
                                {
                                    userSelector === null ?
                                        <>
                                            <button style={ styles['button-login-search'] } className="btn btn-primary" onClick={ () => navigate("/login") }>Login</button>
                                        </>
                                        :
                                        <>
                                            <button style={ styles['button-login-search'] } className="btn btn-primary" onClick={ () => navigate("/search-pictures") }>Search</button>
                                        </>
                                }
                                <br />
                                <img className="p-5" src={ require("../../assets/images/clarinha-robot.gif") } alt="No text" height="350" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;