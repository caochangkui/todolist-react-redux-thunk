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
