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

    return await axios.post("http://localhost:5000/login", options).data; 
}

const authService = {
    login
};

export default authService;