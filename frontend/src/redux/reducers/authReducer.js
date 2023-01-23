let initialState = {
    token : null,
    isLoggedIn: false,
    email : ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                token: action.payload.token,
                isLoggedIn: true,
                email : action.payload.email
            }
        case "LOGOUT":
            return {
                ...state,
                token : null,
                isLoggedIn: false,
                email : ''
            }
        default:
            return {
                ...state,
                token: null,
                isLoggedIn: false,
                email: ''
            }
    }
}

export default authReducer;