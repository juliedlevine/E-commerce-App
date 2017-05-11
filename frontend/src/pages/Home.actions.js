import $ from 'jquery';
import { hashHistory } from 'react-router'

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

// Show all items in user's shopping cart
export function getCart(token) {
    let asyncAction = function(dispatch) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:4000/api/shopping_cart_items',
            contentType: 'application/json',
            data: JSON.stringify({
                token: token
            })
        })
        .then(data => dispatch({
            type: 'get-cart',
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
        .then(data => {
            dispatch({
                type: 'get-details',
                payload: data
            })
        })
        .catch(resp => {
            let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong'
            alert(error + '. Please try again.');
        })
    }
    return asyncAction;
}

// Show log in form when Log in is clicked in the nav bar
export function toggleLogin() {
    return {
        type: 'toggle-login'
    }
}

// User clicks log out button in the nav bar
export function logout() {
    return {
        type: 'logout'
    }
}

// User typing in any input field
export function typing(event, field) {
    return {
        type: field,
        value: event.target.value
    }
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

// Submit new user sign up
export function submitSignUp(first, last, address1, address2, city, state, zip, email, password) {
    let asyncAction = function(dispatch) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:4000/api/user/signup',
            contentType: 'application/json',
            data: JSON.stringify({
                first_name: first,
                last_name: last,
                address_1: address1,
                address_2: address2,
                city: city,
                state: state,
                zip: zip,
                email: email,
                password: password
            })
        })
        .then(data => {
            hashHistory.push('/');
            dispatch({
                type: 'login-successful',
                payload: data
            })
        })
        .catch(resp => {
            let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong'
            alert(error + '. Please try again.');
        })
    }
    return asyncAction;
}

// Add item to user's cart
export function addToCart(id, token) {
    let asyncAction = function(dispatch) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:4000/api/shopping_cart',
            contentType: 'application/json',
            data: JSON.stringify({
                product_id: id,
                token: token

            })
        })
        .then(newCart => {
            dispatch({
                type: 'update-cart',
                payload: newCart
            })
        })
        .catch(resp => {
            let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong'
            alert(error);
        })
    }
    return asyncAction;
}

// Delete item from user's cart
export function deleteFromCart(item, token) {
    let asyncAction = function(dispatch) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:4000/api/delete_shopping_cart',
            contentType: 'application/json',
            data: JSON.stringify({
                item: item,
                token: token
            })
        })
        .then(newCart => {
            dispatch({
                type: 'update-cart',
                payload: newCart
            })
        })
        .catch(resp => {
            let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong'
            alert(error);
        })
    }
    return asyncAction;
}

// Checkout
export function checkout(token) {
    let asyncAction = function(dispatch) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:4000/api/checkout',
            contentType: 'application/json',
            data: JSON.stringify({
                token: token
            })
        })
        .then(response => {
            hashHistory.push('/thanks');
            dispatch({
                type: 'purchase-successful'
            })
        })
        .catch(resp => {
            let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong'
            alert(error);
        })
    }
    return asyncAction;
}
