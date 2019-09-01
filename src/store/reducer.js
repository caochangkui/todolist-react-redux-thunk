import * as constants from './constants';

const defaultState = {
    inputValue: '',
    list: []
}

export default (state = defaultState, action) => {
    console.log(state, action);
    if (action.type === constants.CHANGE_INPUT_VALUE) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if (action.type === constants.ADD_ITEM) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }
    if (action.type === constants.INIT_LIST) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.list = action.list;
        return newState;
    }
    return state;
}