import * as constants from './constants';
import axios from 'axios'

// input输入内容时
export const changeInputValueAction = (value) => {
    return {
        type: constants.CHANGE_INPUT_VALUE,
        value
    }
};

// 添加todo
export const addItemAction = () => {
    return {
        type: constants.ADD_ITEM
    }
}

// 刚进入页面时，将从api获取到的列表，初始化到store
export const initListAction = (list) => {
    return {
        type: constants.INIT_LIST,
        list
    }
}

// 异步获取列表
export const getTodoList = () => {
    return (dispatch) => {
        axios.get('/api/list.json').then(res => {
            const { data } = res;
            const action = initListAction(data);
            dispatch(action);
        })
    }
}


