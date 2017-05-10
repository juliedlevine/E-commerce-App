const INITIAL_STATE = {
    products: [],
    details: {},
    showLogin: false,
    email: '',
    password: '',
    token: '',
    first_name: ''
};

function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'get-products') {
        return Object.assign({}, state, {
            products: action.payload
        })
    } else if (action.type === 'get-details') {
        return Object.assign({}, state, {
            details: action.payload
        })
    } else if (action.type === 'toggle-login') {
        return Object.assign({}, state, {
            showLogin: !state.showLogin
        })
    } else if (action.type === 'email-typing') {
        return Object.assign({}, state, {
            email: action.email
        })
    } else if (action.type === 'password-typing') {
        return Object.assign({}, state, {
            password: action.password
        })
    } else if (action.type === 'login-successful') {
        return Object.assign({}, state, {
            token: action.payload.token,
            first_name: action.payload.first_name,
            showLogin: false
        })
    } else {
        return state
    }
}

export default reducer;
