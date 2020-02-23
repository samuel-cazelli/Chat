import React from 'react';
import { connect } from 'react-redux';

class MessageListComponent extends React.Component {

    render() {

        //if itsn't logged hide form
        if (!this.props.isLoggedIn) {
            return null;
        }

        return (
            <ul>
                {this.props.messagesHistory && this.props.messagesHistory.map((message, index) =>
                    <li key={index}>{message}</li>)
                }
            </ul>
        );
    }

}

const mapStateProps = (state) => {
    return {
        isLoggedIn: state.login.isLoggedIn,
        messagesHistory: state.messages.messagesHistory,
    }
}

export default connect(mapStateProps)(MessageListComponent);