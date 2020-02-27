import React from 'react';
import { connect } from 'react-redux';

import { sendMessage } from '../redux/actions/MessagesAction';

class MessageFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    }

    handleSubmitMessage(event) {
        event.preventDefault();
        this.props.dispatch(sendMessage(this.refs.message.value));
    }

    render() {

        //if itsn't logged hide form
        if (!this.props.isLoggedIn) {
            return null;
        }

        return (
            <form onSubmit={this.handleSubmitMessage} id="formLogin">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Message" name="message" ref="message" key="message" defaultValue='hello world' />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">
                            <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                        </button>
                    </span>
                </div>
            </form>
        );
    }

}

const mapStateProps = (state) => {
    return {
        isLoggedIn: state.login.isLoggedIn,
        messagesHistory: state.messages.messagesHistory,
    }
}

export default connect(mapStateProps)(MessageFormComponent);