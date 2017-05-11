import Cookies from 'js-cookie';
const INITIAL_STATE = {
    products: [],
    details: {},
    showLogin: false,
    token: '',
    user_id: '',
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    password: '',
    password_confirm: '',
    passwords_match: true,
    shopping_cart: []
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
    } else if (action.type === 'read-cookie') {
        return Object.assign({}, state, {
            first_name: action.first_name,
            token: action.token
        })
    } else if (action.type === 'login-successful') {
        Cookies.set('token', action.payload.token);
        Cookies.set('name', action.payload.first_name);
        return Object.assign({}, state, {
            token: action.payload.token,
            first_name: action.payload.first_name,
            user_id: action.payload.id,
            showLogin: false
        })
    } else if (action.type === 'logout') {
        Cookies.remove('name');
        Cookies.remove('token');
        return Object.assign({}, state, {
            token: '',
            first_name: '',
            email: '',
            password: '',
            shopping_cart: []
        })
    } else if (action.type === 'first-name') {
        return Object.assign({}, state, {
            first_name: action.value
        })
    } else if (action.type === 'last-name') {
        return Object.assign({}, state, {
            last_name: action.value
        })
    } else if (action.type === 'address-1') {
        return Object.assign({}, state, {
            address_1: action.value
        })
    } else if (action.type === 'address-2') {
        return Object.assign({}, state, {
            address_2: action.value
        })
    } else if (action.type === 'city') {
        return Object.assign({}, state, {
            city: action.value
        })
    } else if (action.type === 'state') {
        return Object.assign({}, state, {
            state: action.value
        })
    } else if (action.type === 'zip') {
        return Object.assign({}, state, {
            zip: action.value
        })
    } else if (action.type === 'email') {
        return Object.assign({}, state, {
            email: action.value
        })
    } else if (action.type === 'password') {
        return Object.assign({}, state, {
            password: action.value
        })
    } else if (action.type === 'password-confirm') {
        let newPassword = action.value;
        let matched = false;
        if (state.password === newPassword) {
            matched = true;
        }
        return Object.assign({}, state, {
            password_confirm: action.value,
            passwords_match: matched
        })
    } else if (action.type === 'update-cart') {
        return Object.assign({}, state, {
            shopping_cart: action.payload
        })
    } else if (action.type === 'get-cart') {
        return Object.assign({}, state, {
            shopping_cart: action.payload
        })
    } else {
        return state
    }
}

export default reducer;
