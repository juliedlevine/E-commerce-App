/*jshint esversion: 6 */
const express = require('express');
global.Promise = require('bluebird');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')({promiseLib: Promise});
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./config');
const stripePackage = require('stripe');
const stripe = stripePackage(config.stripeSecret);

const db = pgp(config.db);

const app = express();
app.use(bodyParser.json());
// serve all the public
app.use(express.static('public'));
app.use(cors());

// Get array of all product objects
app.get('/api/products', (req, resp, next) => {
    db.any(`select * from products order by id`)
        .then(products => resp.json(products))
        .catch(next);
});

// Get object for one specific product based on it's ID
app.get('/api/product/:id', (req, resp, next) => {
    let id = req.params.id;
    db.one(`select * from products where id = $1`, id)
        .then(product => resp.json(product))
        .catch(next);
})

// User sign up
app.post('/api/user/signup', (req, resp, next) => {
    let user = req.body;
    bcrypt.hash(user.password, 10)
        .then(encrypted => {
            return db.one(`insert into users values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`, [user.first_name, user.last_name, user.address_1, user.address_2, user.city, user.state, user.zip, user.email, encrypted])
        })
        .then(loginDetails => {
            let token = uuid.v4();
            return [loginDetails, db.one(`insert into tokens values (default, $1, $2) returning token`, [loginDetails.id, token])]
        })
        .spread((loginDetails, token) => {
            let newData = {
                first_name: loginDetails.first_name,
                id: loginDetails.id,
                token: token
            }
            resp.json(newData);
        })
        .catch((error) => {
            if (error.message === 'duplicate key value violates unique constraint "users_email_key"') {
                resp.status(409);
                resp.json({message: "User with that email already exists"});
            } else {
                throw error;
            }
        })
        .catch(next);
})

// User log in
app.post('/api/user/login', (req, resp, next) => {
    let email = req.body.email;
    let password = req.body.password;
    db.one(`select * from users where email = $1`, email)
        .then(loginDetails => {
            return [loginDetails, bcrypt.compare(password, loginDetails.password)];
        })
        .spread((loginDetails, matched) => {
            if (matched) {
                let token = uuid.v4();
                return [loginDetails, token]
            } else {
                throw {message: "No data returned from the query."}
            }
        })
        .spread((loginDetails, token) => {
            db.none(`insert into tokens values (default, $1, $2)`, [loginDetails.id, token])
                .then(()=> {
                    let data = {
                        first_name: loginDetails.first_name,
                        id: loginDetails.id,
                        token: token
                    }
                    resp.json(data);
                })
        })
        .catch((error) => {
            if (error.message === 'No data returned from the query.') {
                resp.status(401);
                resp.json({message: "Login error"});
            } else {
                throw error;
            }
        })
        .catch(next);
})

// Add item to user's shopping shopping cart
app.post('/api/shopping_cart', (req, resp, next) => {
    let product_id = req.body.product_id;
    let token = req.body.token;
    db.one(`select user_id from tokens join users on tokens.user_id = users.id and tokens.token = $1`, token)
        .then((results) => {
            return db.one(`insert into shopping_cart values (default, $1, $2) returning user_id`, [parseInt(results.user_id), product_id])
        })
        .then((results) => {
            return db.any(`select * from products inner join shopping_cart on shopping_cart.product_id = products.id where shopping_cart.user_id = $1`, results.user_id)
        })
        .then(shopping_cart => {
            resp.json(shopping_cart);
        })
        .catch((error) => {
            if (error.message === 'No data returned from the query.' || error.message === "there is no parameter $1") {
                resp.status(401);
                resp.json({message: "Please Login or Sign Up."});
            } else {
                throw error;
            }
        })
        .catch(next);

})

// Get all items in a user's shopping cart
app.post('/api/shopping_cart_items', (req, resp, next) => {
    let token = req.body.token;
    db.one(`select user_id from tokens join users on tokens.user_id = users.id and tokens.token = $1`, token)
        .then((results) => {
            return db.any(`select * from products inner join shopping_cart on shopping_cart.product_id = products.id where shopping_cart.user_id = $1`, results.user_id)
        })
        .then((shopping_cart) => {
            if (shopping_cart.length === 0) {
                resp.json({message: "No items in user's shopping cart."});
            } else {
                resp.json(shopping_cart);
            }
        })
        .catch((error) => {
            if (error.message === 'No data returned from the query.') {
                resp.status(401);
                resp.json({message: "User not authenticated"});
            } else {
                throw error;
            }
        })
        .catch(next);
})

// Delete item from user's shopping cart
app.post('/api/delete_shopping_cart', (req, resp, next) => {
    let token = req.body.token;
    let product_id = req.body.item.product_id;
    let shopping_cart_id = req.body.item.id;
    db.one(`select user_id from tokens join users on tokens.user_id = users.id and tokens.token = $1`, token)
        .then((results) => {
            return db.one(`delete from shopping_cart where user_id = $1 and product_id = $2 and id = $3 returning user_id`, [results.user_id, product_id, shopping_cart_id])
        })
        .then((results) => {
            return db.any(`select * from products inner join shopping_cart on shopping_cart.product_id = products.id where shopping_cart.user_id = $1`, results.user_id)
        })
        .then(shopping_cart => {
            resp.json(shopping_cart);
        })
        .catch((error) => {
            if (error.message === 'No data returned from the query.') {
                resp.status(401);
                resp.json({message: "User not authenticated"});
            } else {
                throw error;
            }
        })
        .catch(next);
})

// Checkout
app.post('/api/checkout', (req, resp, next) => {
    let token = req.body.token;
    db.one(`select user_id from tokens join users on tokens.user_id = users.id and tokens.token = $1`, token)
        .then(results => {
            return [results, db.any(`select product_id from products inner join shopping_cart on shopping_cart.product_id = products.id where shopping_cart.user_id = $1`, results.user_id)]
        })
        .spread((results, items) => {
            if (items.length === 0) {
                resp.json({message: "No items in user's shopping cart."});
            } else {
                return [results, items, db.one(`insert into purchases values (default, $1) returning id`, parseInt(results.user_id))]
            }
        })
        .spread((results, items, purchase) => {
            items.forEach(item => {
                db.none(`insert into products_purchases values (default, $1, $2)`, [purchase.id, item.product_id])
            })
            return results;
        })
        .then(results => {
            return db.none(`delete from shopping_cart where user_id = $1`, results.user_id)
        })
        .then(()=> {
            resp.json({message: "purchase successful"});
        })
        .catch((error) => {
            if (error.message === 'No data returned from the query.') {
                resp.status(401);
                resp.json({message: "User not authenticated"});
            } else {
                throw error;
            }
        })
        .catch(next)
})

// Click Submit payment button
app.post('/api/pay', (req, resp, next) => {
    let stripeToken = req.body.stripeToken;
    let email = req.body.email;
    let amount = req.body.amount;
    stripe.customers.create({
            email: email
        })
        .then(customer => {
            return stripe.customers.createSource(customer.id, {
                source: stripeToken
            });
        })
        .then(source => {
            return stripe.charges.create({
                amount: amount,
                currency: 'usd',
                customer: source.customer,
                description: 'Test Charge'
            });
        })
        .then(charge => {
            console.log(charge);
        })
        .catch(err => {
            console.log(err.message);
        })
    resp.json({message: "purchase successful"});
})


// Error handling
app.use((err, req, resp, next) => {
    resp.status(500);
    resp.json({
        error: err.message,
        stack: err.stack.split('\n')
    });
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
})
