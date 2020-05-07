# todolist-react-redux-thunk

# 1. react-redux

- React-Redux 是 Redux 的官方 React 绑定库。
- 它能够使你的 React 组件从 Redux store 中读取数据，并且向 store 分发 actions 以更新数据。
- React-Redux 并不是 Redux 内置，需要单独安装。
- React-Redux 一般会和 Redux 结合一起使用。

## react-redux 安装

```
$ npm install react-redux
```

## Provider 和 connect

#### React-Redux 提供`<Provider/>`组件，能够使你的整个 app 访问到 Redux store 中的数据:

App.js:

```
import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Todolist from './Todolist';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Todolist />
        </Fragment>
      </Provider>
    )
  }
}

export default App;
```

#### React-Redux 提供一个`connect`方法能够让你把组件和 store 连接起来。

可以在 connect 方法中定义两个参数： `mapStateToProps`和 `mapDispatchToProps`;

- [mapStateToProps(state, [ownProps]): stateProps](Function): 如果定义该参数，组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。

- [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function): 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名；每个方法将返回一个新的函数，函数中 dispatch 方法会将 action creator 的返回值作为参数执行。这些属性会被合并到组件的 props 中。

例如：在组件<Todolist />中：

```
import React, { Component } from 'react';
import { connect } from 'react-redux'

class TodoList extends Component {
  render() {
    ... ...
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
      const action = ...
      dispatch(action);
    },
    handleClick() {
      const action = ...
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

> [redux-react API 文档](http://cn.redux.js.org/docs/react-redux/api.html#api)

# 2. redux-thunk

Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。

- redux-thunk 是一个常用的 redux 异步 action 中间件。通常用来处理 axios 请求。
- redux-thunk 中间件可以让 action 创建函数先不返回一 个 action 对象，而是返回一个函数

### redux-thunk 用法

```
$ npm install redux-thunk
```

```
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;
```

applyMiddlewares() 是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行。

#### 在 actionCreator.js 中：

```
// 一般，创建 action 的函数只能返回一个对象
export const initListAction = (list) => {
    return {
        type: constants.INIT_LIST,
        list
    }
}

// ---------------------------

// 使用了 redux-thunk, action函数可以返回一个函数
export const getTodoList = () => {
    return (dispatch) => {
        axios.get('/api/list.json').then(res => {
            const { data } = res;
            const action = initListAction(data);
            dispatch(action);
        })
    }
}
```

#### 在 reducer.js 中：

```
export default (state = defaultState, action) => {

    ··· ···
    if (action.type === constants.INIT_LIST) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.list = action.list;
        return newState;
    }
    return state;
}
```

#### 在 Todolist.js 中:

```
componentDidMount () {
  const action = getTodoList();
  // 这里取到的action是一个函数，当执行dispatch时，会自动执行该函数
  store.dispatch(action);
}
```

# 3. react-redux 结合 redux-thunk 完整实例（todolist）

[https://github.com/caochangkui/todolist-react-redux-thunk](https://github.com/caochangkui/todolist-react-redux-thunk)

11111

22222
33333
44444

555
666

777
