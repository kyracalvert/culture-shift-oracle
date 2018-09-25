import { combineReducers } from 'redux';

const cardToAdd = (state={}, action) => {
    if (action.type === 'ADD_CARD_MESSAGE'){
        return {...state, message: action.payload}
    } else if (action.type === 'ADD_CARD_IMAGE'){
        return {...state, img_path: action.payload}
    } else if (action.type === 'RESET_STATE'){
        return (state = {
            message: '',
            img_path: '',
        });
    }
    return state
}

export default combineReducers({
    cardToAdd,
})