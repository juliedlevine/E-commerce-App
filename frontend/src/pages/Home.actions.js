import $ from 'jquery';
import { hashHistory } from 'react-router'
const StripeCheckout = window.StripeCheckout;
const BASEURL = location.hostname === 'localhost' ? 'http://localhost:4000' : '';

// Show products on home page
export function getProducts() {
    let asyncAction = function(dispatch) {
        $.ajax({
            type: 'GET',
            url: BASEURL + '/api/products',
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
            url: BASEURL + '/api/shopping_cart_items',
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
            url: BASEURL + '/api/product/' + id,
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

// Check if all fields are filled in a form
export function emptyFields() {
    return {
        type: 'empty_fields'
    }
}

// Submit login
export function submitLogin(email, password) {
    let asyncAction = function(dispatch) {
        $.ajax({
            type: 'POST',
            url: BASEURL + '/api/user/login',
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
            url: BASEURL + '/api/user/signup',
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
            url: BASEURL + '/api/shopping_cart',
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
            url: BASEURL + '/api/delete_shopping_cart',
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

// Checkout - handling this in ChargeCard function now
// export function checkout(token) {
//     let asyncAction = function(dispatch) {
//         $.ajax({
//             type: 'POST',
//             url: BASEURL + '/api/checkout',
//             contentType: 'application/json',
//             data: JSON.stringify({
//                 token: token
//             })
//         })
//         .then(response => {
//             hashHistory.push('/thanks');
//             dispatch({
//                 type: 'purchase-successful'
//             })
//         })
//         .catch(resp => {
//             let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong'
//             alert(error);
//         })
//     }
//     return asyncAction;
// }

// Submit payment button click
export function chargeCard(amount, cookieToken, email) {
    let asyncAction = function(dispatch) {
        let handler = StripeCheckout.configure({
            key: 'pk_test_mHlocB4xkrc0EgJxchCMRjFs',
            image: '/envelope.png',
            locale: 'auto',
            token: function callback(token) {
                var stripeToken = token.id;
                console.log('Public stripe token recieved if payment info verified: ', stripeToken);
                // If verified, send stripe token to backend
                $.ajax({
                    type: 'POST',
                    url: BASEURL + '/api/pay',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        stripeToken: stripeToken,
                        email: email,
                        amount: amount
                    })
                })
                // After payment is processed in the back end send another request to update the database and set state
                .then(response => {
                    $.ajax({
                        type: 'POST',
                        url: BASEURL + '/api/checkout',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            token: cookieToken
                        })
                    })
                    .then(response => {
                        hashHistory.push('/thanks');
                        dispatch({
                            type: 'purchase-successful'
                        })
                    })
                })
            }
        });
        handler.open({
            name: 'Lucy Mail',
            amount: amount
        });
    }
    return asyncAction;
}
