import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Home.actions';

class SignUp extends React.Component {

    render() {
        return (
            <div>
                Email: <input type="text"></input>
                Password: <input type="password"></input>
                <button>Submit</button>
            </div>
        );
    }
}

const SignUpContainer = ReactRedux.connect(
    state => state,
    actions
)(SignUp);

export default SignUpContainer;
