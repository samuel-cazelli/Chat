import { newMessageReceived } from './MessagesAction';

export const CONNECTION_REQUEST = 'CONNECTION_REQUEST';
export const CONNECTION_SUCCESS = 'CONNECTION_SUCCESS';
export const CONNECTION_ERROR = 'CONNECTION_ERROR';


export const connectionRequest = (nick) => {
    return (dispatch, getState) => {

        dispatch({ type: CONNECTION_REQUEST });

        getState().connection.realTime
            .connect()
            .then(() => {
                dispatch(connectionSuccess());

                getState()
                    .connection
                    .realTime
                    .subscribeOnNewMessageEvent(
                        'onNewMessageReceived',
                        (message) => {
                            dispatch(newMessageReceived(message));
                        });

            })
            .catch((err) => {
                dispatch(connectionError(err));
            });
    }
}

export const connectionSuccess = () => {
    return {
        type: CONNECTION_SUCCESS,
    }
}

export const connectionError = (connectionError) => {
    return {
        type: CONNECTION_ERROR,
        connectionError: connectionError
    }
}

