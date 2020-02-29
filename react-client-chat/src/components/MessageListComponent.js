import React from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';

import { loadMessagesRequest } from '../redux/actions/MessagesAction';



class MessageListComponent extends React.Component {

    loadMoreMessages() {
        this.props.dispatch(loadMessagesRequest(this.props.messagesHistory[0].id));
    }

    componentDidUpdate() {
        /*const messagesElement = document.querySelector(".messages");
        if(messagesElement) {
            const scrollSize = messagesElement.scrollHeight;
            messagesElement.scrollTo(0, scrollSize);
        }*/
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.messagesHistory.length === 0) {
            this.scrollChatToEnd(true);
        } else if (nextProps.messagesHistory.length > this.props.messagesHistory.length) {
            this.scrollChatToEnd(false);
        }
    }

    scrollChatToEnd(force) {
        setTimeout(() => {
            const messagesElement = document.querySelector(".messages");
            const scrollSize = messagesElement.scrollHeight;
            const currentScrollPosition = messagesElement.scrollTop;
            const divSize = messagesElement.clientHeight;

            // if it's at the end of chat scroll to show new message
            if (force || (currentScrollPosition + divSize - scrollSize) > -100) {
                messagesElement.scrollTo(0, scrollSize);
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
            </div>
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