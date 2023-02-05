import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { styles } from '../../css/NavbarCSS';

const Navbar = () => {
    const isLoggedInStateSelector = useSelector(state => state.auth.user);

    useEffect(() => {
        // Do nothing except refresh whenever user is logged
    }, [isLoggedInStateSelector]);

    const conditionalRenderingOnUserStateSelector = isLoggedInStateSelector === null ?
        <>                        
            <li className="nav-item">
                <a style={ styles['link-enabled'] } className="nav-link" href="/login">Login</a>
            </li>
            <li className="nav-item">
                <a style={ styles['link-enabled'] } className="nav-link" href="/signup">Signup</a>
            </li>
            <li className="nav-item">
                <a style={ styles['link-disabled'] } className="nav-link disabled" href="/search-pictures">Search Pictures</a>
            </li>
            <li className="nav-item">
                <a style={ styles['link-disabled'] } className="nav-link disabled" href="/my-pictures">My Pictures</a>
            </li>
        </> :
        <>                        
            <li className="nav-item">
                <a style={ styles['link-enabled'] } className="nav-link" href="/logout">Logout</a>
            </li>
            <li className="nav-item">
                <a style={ styles['link-disabled'] } className="nav-link disabled" disabled href="/signup">Signup</a>
            </li>
            <li className="nav-item">
                <a style={ styles['link-enabled'] } className="nav-link" href="/search-pictures">Search Pictures</a>
            </li>
            <li className="nav-item">
                <a style={ styles['link-enabled'] } className="nav-link" href="/my-pictures">My Pictures</a>
            </li>
        </>

    return (            
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a style={ styles['AI-Art-link'] } className="navbar-brand" href="/">DALL·E 2's Bestie</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a style={ styles['link-enabled'] } className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a style={ styles['link-enabled'] } className="nav-link" href="/about">About/OpenAI</a>
                        </li>
                        { conditionalRenderingOnUserStateSelector }
                    </ul>
                </div>
            </div>
        </nav>  
    );
}

export default Navbar;