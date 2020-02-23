export const NEW_MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const SEND_MESSAGE = 'MESSAGE_SEND';

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

