import axios from 'axios';

const authAction = (email, password) => {
    return async (dispatch) => {
        try {
            const body = JSON.stringify({
                email,
                password
            });
            
            const options = {
                method: 'POST',
                body,
                headers : {
                    'content-type' : 'application/json'
                }
            };

            const response = await axios.post("http://localhost:5000/login", options); 

            // If successful, dispatch login action
            dispatch("LOGIN", { payload: { token: response.data.token, email }})
        }
        catch (error) {
            // If not, dispatch login failure which goes to the default case
            dispatch("LOGIN_FAILURE", { payload: {}});
        }
    }
}

export default authAction;