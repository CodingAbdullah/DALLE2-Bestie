import axios from 'axios';

const login = async (user) => {
    const body = JSON.stringify({
        email: user.email,
        password: user.password
    });
    
    const options = {
        method: 'POST',
        body,
        headers : {
            'content-type' : 'application/json'
        }
    };

    await axios.post("http://localhost:5000/login", options); 
}

const authService = {
    login
};

export default authService;