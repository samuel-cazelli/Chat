import React from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';

import { loadMessagesRequest, changeNumberOfUnreadMessages } from '../redux/actions/MessagesAction';

class MessageListComponent extends React.Component {

    constructor(props) {
        super(props);

        this.handleScrollEvent = this.handleScrollEvent.bind(this);
    }

    componentDidMount() {
        document.querySelector(".messages").addEventListener('scroll', this.handleScrollEvent)
    }

    componentWillReceiveProps(nextProps) {
        
        const oldMessages = this.props.messagesHistory;
        const newMessages = nextProps.messagesHistory;

        if (oldMessages.length === 0) { //if it's the first payload of messages should always scroll to bottom
            this.scrollChatToBottom(true);

        } else if (newMessages.length > oldMessages.length) { //if prop messagesHistory changed

            const lastIdNewMessages = newMessages[newMessages.length - 1].id;
            const lastIdOldMessages = oldMessages[oldMessages.length - 1].id;
            const isNewMessage = lastIdNewMessages !== lastIdOldMessages;

            if (isNewMessage) {
                this.props.dispatch(changeNumberOfUnreadMessages(this.props.numberOfUnreadMessages + 1));
            }

            this.scrollChatToBottom(false);
        }
    }

    loadMoreMessages() {
        this.props.dispatch(loadMessagesRequest(this.props.messagesHistory[0].id));
    }

    isChatScrolledToBottom() {
        const messagesElement = document.querySelector(".messages");
        if (messagesElement) {
            const scrollSize = messagesElement.scrollHeight;
            const currentScrollPosition = messagesElement.scrollTop;
            const divSize = messagesElement.clientHeight;
            return (currentScrollPosition + divSize - scrollSize) > -100
        }
    }

    scrollChatToBottom(force) {
        setTimeout(() => {
            // if it's at the end of chat scroll to show new message
            if (force || this.isChatScrolledToBottom()) {
                const messagesElement = document.querySelector(".messages");
                messagesElement.scrollTo(0, messagesElement.scrollHeight);
            }
        }, 50);
    }

    handleScrollEvent() {
        if (this.isChatScrolledToBottom() && this.props.numberOfUnreadMessages !== 0) {
            this.props.dispatch(changeNumberOfUnreadMessages(0));
        }
    }

    render() {

        //if itsn't logged hide form
        if (!this.props.isLoggedIn) {
            return null;
        }

        return (
            <div className='messages' onScroll={this.handleScrollEvent()}>
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
                        <button className="buttonMoveToBottom btn btn-default" onClick={() => { this.scrollChatToBottom(true) }} >
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