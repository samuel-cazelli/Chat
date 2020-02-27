import React from 'react';
import { connect } from 'react-redux';

import MessageListComponent from './MessageListComponent'
import MessageFormComponent from './MessageFormComponent'

class MessageWraperFormComponent extends React.Component {

    render() {

        //if itsn't logged hide form
        if (!this.props.isLoggedIn) {
            return null;
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                        <div className="panel panel-primary">
                            <MessageListComponent></MessageListComponent>
                            <div className="panel-footer">
                                <MessageFormComponent></MessageFormComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateProps = (state) => {
    return {
        isLoggedIn: state.login.isLoggedIn
    }
}

export default connect(mapStateProps)(MessageWraperFormComponent);