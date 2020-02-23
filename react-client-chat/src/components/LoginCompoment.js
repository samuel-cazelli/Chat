import React from 'react';
import { connect } from 'react-redux';

import { loginRequest } from '../redux/actions/LoginAction';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitNick = this.handleSubmitNick.bind(this);
    }

    handleSubmitNick(event) {
        event.preventDefault();
        this.props.dispatch(loginRequest(this.refs.nick.value));
    }

    render() {

        //if it's logged hide form
        if (this.props.isLoggedIn) {
            return null;
        }

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmitNick} id="formMessage">
                    <div>
                        <label>Nick</label><br />
                        <input type="text" placeholder="Nick" name="nick" ref="nick" key="nick" defaultValue='react' />
                        <button type="submit">Log In</button>
                        <span>{this.props.errorMessageLogin}</span>
                    </div>
                </form>
            </React.Fragment>
        );
    }

}

const mapStateProps = (state) => {
    return {
        isLoggedIn: state.login.isLoggedIn,
        errorMessageLogin: state.login.errorMessageLogin
    }
}

export default connect(mapStateProps)(LoginComponent);