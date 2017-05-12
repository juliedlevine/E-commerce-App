import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Home.actions';

class SignUp extends React.Component {

    checkForm() {
        if (this.props.first_name === '' || this.props.last_name === '' || this.props.address_1 === '' || this.props.city === '' || this.props.state === '' || this.props.email === '' || this.props.password === '') {
            this.props.emptyFields();
        } else {
            this.props.submitSignUp(this.props.first_name, this.props.last_name, this.props.address_1, this.props.address_2, this.props.city, this.props.state, this.props.zip, this.props.email, this.props.password);
        }
    }

    render() {
        return (
            <div className="signUp">
                <div className="form-group">
                    <label>First Name</label>
                    <input onChange={(event)=> this.props.typing(event, 'first-name')}className="form-control" type="text"></input>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input onChange={(event)=> this.props.typing(event, 'last-name')} className="form-control" type="text"></input>
                </div>
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
                <div className="form-group">
                    <label>Email</label>
                    <input onChange={(event)=> this.props.typing(event, 'email')} className="form-control" type="email"></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(event)=> this.props.typing(event, 'password')} className="form-control" type="password"></input>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input onChange={(event)=> this.props.typing(event, 'password-confirm')} className="form-control" type="password"></input>

                    {this.props.passwords_match ?
                        <p></p> :
                        <p className="message">Passwords don't match</p>}

                    {this.props.empty_fields ?
                        <p className="message">Please fill out all the fields</p> :
                        <p></p>
                    }

                </div>
                <button disabled={!this.props.passwords_match} onClick={()=>this.checkForm()}>Submit</button>
            </div>
        );
    }
}

const SignUpContainer = ReactRedux.connect(
    state => state,
    actions
)(SignUp);

export default SignUpContainer;
