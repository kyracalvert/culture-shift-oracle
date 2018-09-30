import { combineReducers } from 'redux';

const cardsToDisplay = (state=[], action) => {
    if (action.type === 'DISPLAY_CARDS') {
        return action.payload;
    }
    return state
}
export default cardsToDisplay;