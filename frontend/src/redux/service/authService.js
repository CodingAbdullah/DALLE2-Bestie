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

    const response = await axios.post("http://localhost:5000/login", options);

    if (response.data && response.data.message === "Email and password verified!") {
        let userInfo = response.data.user;
        let tokenInfo = response.data.token;

        // Set localStorage to contain user info and jwt token
        localStorage.setItem('user', JSON.stringify({ user: userInfo, token: tokenInfo }));
    }

    return response.data;
}

const authService = {
    login
};

export default authService;