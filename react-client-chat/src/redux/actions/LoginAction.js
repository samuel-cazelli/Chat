import { loadInitialMessagesRequest } from './MessagesAction';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';



export const loginRequest = (nick) => {
    return (dispatch, getState) => {

        dispatch({ type: LOGIN_REQUEST });

        getState().connection.realTime.logIn(nick).then((result) => {
            if (result.Key) {
                dispatch(loginSuccess());
                dispatch(loadInitialMessagesRequest());
            } else {
                dispatch(loginError(result.Value));
            }
        });

    }
}

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS,
    }
}

export const loginError = (errorMessageLogin) => {
    return {
        type: LOGIN_ERROR,
        errorMessageLogin: errorMessageLogin
    }
}

