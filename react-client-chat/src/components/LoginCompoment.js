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
            <div className="row">
                <div className="col-md-offset-4 col-md-4">
                    <div className="panel panel-primary">
                        <div className="panel-heading">Log In</div>
                        <div className="panel-body">
                            {this.props.errorMessageLogin && (<div className="alert alert-danger" role="alert" >{this.props.errorMessageLogin}</div>)}
                            <form onSubmit={this.handleSubmitNick} id="formMessage">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Nick" name="nick" ref="nick" key="nick" defaultValue='react' />
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="submit" >
                                            <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

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