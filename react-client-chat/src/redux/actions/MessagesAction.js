export const NEW_MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const SEND_MESSAGE = 'MESSAGE_SEND';
export const LOAD_MESSAGES_REQUEST = 'LOAD_MESSAGES_REQUEST';
export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';
export const CHANGE_NUMBER_OF_UNREAD_MESSAGES = 'CHANGE_NUMBER_OF_UNREAD_MESSAGES';

export const newMessageReceived = (message) => {
    return {
        type: NEW_MESSAGE_RECEIVED,
        message: message
    }
}

export const sendMessage = (message) => {

    return (dispatch, getState) => {

        dispatch({ type: SEND_MESSAGE, messsage: message });

        getState().connection.realTime.sendMessage(message);

    }
}


export const loadMessagesRequest = (startId) => {
    return (dispatch, getState) => {

        dispatch({ type: LOAD_MESSAGES_REQUEST });

        getState().connection.realTime.getMessages(startId).then((result) => {
            dispatch(loadMessagesSuccess(result));
        });

    }
}

export const loadMessagesSuccess = (messages) => {
    return {
        type: LOAD_MESSAGES_SUCCESS,
        messages: messages
    };
}

export const changeNumberOfUnreadMessages  = (numberOfUnreadMessages) => {
    return {
        type: CHANGE_NUMBER_OF_UNREAD_MESSAGES,
        numberOfUnreadMessages: numberOfUnreadMessages
    };
}

