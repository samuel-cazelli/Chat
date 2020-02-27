import { 
    NEW_MESSAGE_RECEIVED, 
    SEND_MESSAGE,
    LOAD_MESSAGES_REQUEST,
    LOAD_MESSAGES_SUCCESS
 } from '../actions/MessagesAction';

const initialState = {
    messagesHistory: [],
}

export const messagesReducer = (state = initialState, action) => {

    switch (action.type) {

        case NEW_MESSAGE_RECEIVED:
            return {
                ...state,
                messagesHistory: [...state.messagesHistory, action.message]
            }


        case SEND_MESSAGE: return state;

        case LOAD_MESSAGES_REQUEST: return state;

        case LOAD_MESSAGES_SUCCESS:
            return {
                ...state,
                messagesHistory: action.messages.concat(state.messagesHistory)
            }


        default: return state;

    }
}