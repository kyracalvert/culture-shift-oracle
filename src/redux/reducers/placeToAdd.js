import { combineReducers } from 'redux';

const placeToAdd = (state={}, action) => {
    if (action.type === 'ADD_PLACE_NAME'){
        return {...state, name: action.payload}
    } else if (action.type === 'ADD_PLACE_DESCRIPTION'){
        return {...state, description: action.payload}
    } else if (action.type === 'ADD_PLACE_IMAGE'){
        return {...state, image_url: action.payload}
    } else if (action.type === 'RESET_STATE'){
        return (state = {
            name: '',
            description: '',
            image_url: '',
        });
    }
    return state
}

export default combineReducers({
    placeToAdd,
})