import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Home.actions';
import { Link } from 'react-router';


class Confirm extends React.Component {

    checkForm() {
        if (this.props.first_name === '' || this.props.last_name === '' || this.props.address_1 === '' || this.props.city === '' || this.props.state === '' || this.props.zip === '' || this.props.email === '') {
            this.props.emptyFields();
        } else {
            this.props.chargeCard(this.getCartTotal() * 100, this.props.token, this.props.email)
        }
    }

    getCartTotal() {
        let total = 0;
        this.props.shopping_cart.map((item, index) => {
            total += item.price;
        })
        return total;
    }

    componentDidMount() {
        this.props.getCart(this.props.token);
    }

    render() {
        return (
            <div>
                <div className="shoppingCart">
                    <h3 className="cartHeading">Confirm Checkout</h3>
                    <table>
                        <tbody>
                            <tr className="tableHeaders">
                                <th></th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th className="deleteCol"></th>
                            </tr>
                        {this.props.shopping_cart.map((item, index) =>
                            <tr>
                                <td><img className="cartImage" alt="cart thumbnail" key={index} src={item.image_url}></img></td>
                                <td>{item.name}</td>
                                <td>1</td>
                                <td>${item.price}.00</td>
                                <td onClick={()=> this.props.deleteFromCart(item, this.props.token)}className="deleteCol">x</td>
                            </tr>
                        )}
                            <tr>
                                <td colSpan="3">Subtotal</td>
                                <td colSpan="2">${this.getCartTotal()}.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="addressForms">

                    <div className="signUp checkout">
                    <h4 className="formHeader">Customer Information</h4>
                    <div className="form-group">
                        <label>First Name</label>
                        <input onChange={(event)=> this.props.typing(event, 'first-name')}className="form-control" type="text"></input>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input onChange={(event)=> this.props.typing(event, 'last-name')} className="form-control" type="text"></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input onChange={(event)=> this.props.typing(event, 'email')}className="form-control" type="text"></input>
                    </div>

                    <br />
                    <h4 className="formHeader">Shipping Address</h4>
                        <div className="form-group">
                            <label>Address 1</label>
                            <input onChange={(event)=> this.props.typing(event, 'address-1')} className="form-control" type="text"></input>
                        </div>
                        <div className="form-group">
                            <label>Address 2</label>
                            <input onChange={(event)=> this.props.typing(event, 'address-2')} className="form-control" type="text"></input>
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input onChange={(event)=> this.props.typing(event, 'city')} className="form-control" type="text"></input>
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input onChange={(event)=> this.props.typing(event, 'state')} className="form-control" type="text"></input>
                        </div>
                        <div className="form-group">
                            <label>Zip Code</label>
                            <input onChange={(event)=> this.props.typing(event, 'zip')} className="form-control" type="text"></input>
                        </div>

                        {this.props.empty_fields ?
                            <p className="message">Please fill out all the fields</p> :
                            <p></p>
                        }

                        <button onClick={()=>this.checkForm()}>Submit Payment</button>
                    </div>
                </div>

            </div>
        );
    }
}

const ConfirmContainer = ReactRedux.connect(
    state => state,
    actions
)(Confirm);

export default ConfirmContainer;
