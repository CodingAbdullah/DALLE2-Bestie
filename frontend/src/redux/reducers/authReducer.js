let initialState = {
    email : '',
    isLoggedIn: false,
    token : null
}

exports.authReducer = (initialState, action) => {
    switch (action.type) {
        case "LOGIN":

        break;
        case "LOGOUT":
 
        break;
        default:
            initialState.email = '';
            break;
    }
}