import $ from 'jquery';

// Show products on home page
export function getProducts() {
    let asyncAction = function(dispatch) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:4000/api/products',
        })
        .then(data => dispatch({
            type: 'get-products',
            payload: data
        }))
        .catch(resp => {
            let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong'
            alert(error + '. Please try again.');
        })
    }
    return asyncAction;
}

// Show details of individual product when the image is clicked
export function getDetails(id) {
    let asyncAction = function(dispatch) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:4000/api/product/' + id,
        })
        .then(data => dispatch({
            type: 'get-details',
            payload: data
        }))
        .catch(resp => {
            let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong'
            alert(error + '. Please try again.');
        })
    }
    return asyncAction;
}

// Show log in details when Log in is clicked in the nav bar
export function toggleLogin() {
    return {
        type: 'toggle-login'
    }
}

// User typing in email field
export function emailTyping(event) {
    return {
        type: 'email-typing',
        email: event.target.value
    };
}


// User typing in password field
export function passwordTyping(event) {
    return {
        type: 'password-typing',
        password: event.target.value
    };
}

// Submit login
export function submitLogin(email, password) {
    let asyncAction = function(dispatch) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:4000/api/user/login',
            contentType: 'application/json',
            data: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(data => dispatch({
            type: 'login-successful',
            payload: data
        }))
        .catch(resp => {
            let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong'
            alert(error + '. Please try again.');
        })
    }
    return asyncAction;
}
