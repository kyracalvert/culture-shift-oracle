import { combineReducers } from 'redux';

const placeToAdd = (state={}, action) => {
    if (action.type === 'ADD_PLACE_NAME'){
        return {...state, place: action.payload}
    } else if (action.type === 'ADD_PLACE_DESCRIPTION'){
        return {...state, description: action.payload}
    } else if (action.type === 'ADD_PLACE_IMAGE'){
        return {...state, img_path: action.payload}
    } else if (action.type === 'RESET_STATE'){
        return (state = {
            place: '',
            description: '',
            img_path: '',
        });
    }
    return state
}

export default combineReducers({
    placeToAdd,
})