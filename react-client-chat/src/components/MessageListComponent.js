import React from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';

import { loadMessagesRequest, changeNumberOfUnreadMessages } from '../redux/actions/MessagesAction';



class MessageListComponent extends React.Component {

    loadMoreMessages() {
        this.props.dispatch(loadMessagesRequest(this.props.messagesHistory[0].id));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.messagesHistory.length === 0) {
            this.scrollChatToEnd(true, true);
        } else if (nextProps.messagesHistory.length > this.props.messagesHistory.length) {
       
            const lastIdNewMessages = Number.parseInt(nextProps.messagesHistory[nextProps.messagesHistory.length - 1].id);
            const lastIdOldMessages = Number.parseInt(this.props.messagesHistory[this.props.messagesHistory.length - 1].id);
            const isNewMessage = lastIdNewMessages !== lastIdOldMessages;

            this.scrollChatToEnd(false, isNewMessage);
        }
    }

    scrollChatToEnd(force, isNewMessage) {
        setTimeout(() => {
            const messagesElement = document.querySelector(".messages");
            const scrollSize = messagesElement.scrollHeight;
            const currentScrollPosition = messagesElement.scrollTop;
            const divSize = messagesElement.clientHeight;

            // if it's at the end of chat scroll to show new message
            if (force || (currentScrollPosition + divSize - scrollSize) > -100) {
                messagesElement.scrollTo(0, scrollSize);
                this.props.dispatch(changeNumberOfUnreadMessages(0));
                console.log('foi');
            } else if (isNewMessage) {
                this.props.dispatch(changeNumberOfUnreadMessages(this.props.numberOfUnreadMessages + 1));
            }
        }, 50);
    }

    render() {

        //if itsn't logged hide form
        if (!this.props.isLoggedIn) {
            return null;
        }

        return (
            <div className='messages'>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMoreMessages.bind(this)}
                    hasMore={true}
                    isReverse={true}
                    useWindow={false}
                    initialLoad={false}
                    threshold={10}
                >
                    {this.props.messagesHistory && this.props.messagesHistory.map((message, index) =>
                        <div className={'message ' + (message.isMessageMine ? "isMessageMine" : "")} key={index}>
                            <span className="message-nick">{message.nick}</span><br />
                            <span className="message-content">{message.content}</span>
                        </div>
                    )}
                </InfiniteScroll>
                {(this.props.numberOfUnreadMessages !== 0) ?
                    (
                        <button className="buttonMoveToBotton btn btn-default" onClick={() => { this.scrollChatToEnd(true, false) }} >
                            <span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                            <span className="badge badge-pill badge-primary">{this.props.numberOfUnreadMessages}</span>
                        </button>
                    ) : ""
                }
            </div>
        );
    }
}

const mapStateProps = (state) => {
    return {
        isLoggedIn: state.login.isLoggedIn,
        messagesHistory: state.messages.messagesHistory,
        numberOfUnreadMessages: state.messages.numberOfUnreadMessages
    }
}

export default connect(mapStateProps)(MessageListComponent);