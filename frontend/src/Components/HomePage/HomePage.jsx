import React from 'react';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className='home-page'>
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    <h2>Home</h2>
                    <p>{"Welcome to your destination of automated fine art! ;)"}</p>
                    <p style={{ marginTop: '2rem' }}>Describe, in your own words, what type of art you are looking for, the size you desire, and this site will
                    have it automatically generated for you! Powered by the usual, React.js library and the creative ingenuity brought to life, <b><a target="_blank" rel="noreferrer" style={{ color: 'black' }} href="https://openai.com/dall-e-2/">DALL·E 2</a></b> is your friend and it will do most of the heavy lifting, this site is just a faciliator.</p>
                    <p>It would be cringe as a dev, to be taking <b>ALL</b> the credit for it :P</p>
                    <p>So what are you waitin' for? Search away!</p>
                    <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>
        </div>
    )

}

export default HomePage;