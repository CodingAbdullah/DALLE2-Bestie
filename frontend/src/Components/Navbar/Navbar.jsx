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
            <li class="nav-item">
                <a style={styles['link-enabled']} class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item">
                <a style={styles['link-enabled']} class="nav-link" href="/signup">Signup</a>
            </li>
            <li class="nav-item">
                <a style={styles['link-disabled']} class="nav-link disabled" href="/search-pictures">Search Pictures</a>
            </li>
            <li class="nav-item">
                <a style={styles['link-disabled']} class="nav-link disabled" href="/my-pictures">My Pictures</a>
            </li>
        </> :
        <>                        
            <li class="nav-item">
                <a style={styles['link-enabled']} class="nav-link" href="/logout">Logout</a>
            </li>
            <li class="nav-item">
                <a style={styles['link-disabled']} class="nav-link disabled" disabled href="/signup">Signup</a>
            </li>
            <li class="nav-item">
                <a style={styles['link-enabled']} class="nav-link" href="/search-pictures">Search Pictures</a>
            </li>
            <li class="nav-item">
                <a style={styles['link-enabled']} class="nav-link" href="/my-pictures">My Pictures</a>
            </li>
        </>

    return (            
        <nav class="navbar navbar-expand-lg bg-dark">
            <div class="container-fluid">
                <a style={styles['AI-Art-link']} class="navbar-brand" href="/">AI Art</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a style={styles['link-enabled']} class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a style={styles['link-enabled']} class="nav-link" href="/about">About</a>
                        </li>
                        { conditionalRenderingOnUserStateSelector }
                    </ul>
                </div>
            </div>
        </nav>  
    );
}

export default Navbar;