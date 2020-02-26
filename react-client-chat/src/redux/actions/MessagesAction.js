export const NEW_MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const SEND_MESSAGE = 'MESSAGE_SEND';
export const LOAD_INITIAL_MESSAGES_REQUEST = 'LOAD_INITIAL_MESSAGES_REQUEST';
export const LOAD_INITIAL_MESSAGES_SUCCESS = 'LOAD_INITIAL_MESSAGES_SUCCESS';

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


export const loadInitialMessagesRequest = () => {
    return (dispatch, getState) => {

        dispatch({ type: LOAD_INITIAL_MESSAGES_REQUEST });

        getState().connection.realTime.getMessages(0).then((result) => {
            dispatch(loadInitialMessagesSuccess(result));
        });

    }
}

export const loadInitialMessagesSuccess = (messages) => {
    return {
        type: LOAD_INITIAL_MESSAGES_SUCCESS,
        messages: messages
    };
}

