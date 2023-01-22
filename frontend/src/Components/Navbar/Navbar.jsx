import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (            
        <nav class="navbar navbar-expand-lg bg-dark">
            <div class="container-fluid">
                <a style={{ color: 'white', fontWeight: 'bold' }} class="navbar-brand" href="/">AI Art</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a style={{ color: 'white' }} class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a style={{ color: 'white' }} class="nav-link" href="/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a style={{ color: 'white' }} class="nav-link" href="/signup">Signup</a>
                        </li>
                        <li class="nav-item">
                            <a style={{ color: 'grey' }} class="nav-link disabled" href="/my-pictures">My Pictures</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>  
    );
}

export default Navbar;