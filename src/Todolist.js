import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators  from './store/actionCreators';

class TodoList extends Component {

  render() {
    const { inputValue, list, ChangeInputValue, handleClick } = this.props;

    return (
      <div>
        <div>
          <input
            value={inputValue}
            onChange={ChangeInputValue}
          />
          <button onClick={handleClick}>提交</button>
        </div>
        <ul>
          {
            list.map((item, index) => {
              return <li key={index}>{item}</li>
            })
          }
        </ul>
      </div>
    )
  }

  // 组件挂载到页面之后执行
  componentDidMount () {
    this.props.initTodolist();
  }

}

// 将store里面的state映射给当前组件，成为组件的props
// 只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该
// 回调函数必须返回一个纯对象，这个对象会与组件的 props 合并
const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

// 将store.dispatch()方法映射到props上
const mapDispatchToProps = (dispatch) => {
  return {
    ChangeInputValue(e) {
      const action = actionCreators.changeInputValueAction(e.target.value);
      dispatch(action);
    },
    handleClick() {
      const action = actionCreators.addItemAction();
      dispatch(action);
    },
    initTodolist() {
      const action = actionCreators.getTodoList();
      dispatch(action);
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
