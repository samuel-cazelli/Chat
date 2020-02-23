import { NEW_MESSAGE_RECEIVED, SEND_MESSAGE } from '../actions/MessagesAction';

const initialState = {
    messagesHistory: '',
}

export const messagesReducer = (state = initialState, action) => {

    switch (action.type) {

        case NEW_MESSAGE_RECEIVED:
            return {
                ...state,
                messagesHistory: [...state.messagesHistory, action.message]
            }


        case SEND_MESSAGE: return state;

        default: return state;

    }
}