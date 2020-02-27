import React from 'react';

import { Provider } from 'react-redux';
import { store } from './redux/Store';
import { connectionRequest } from './redux/actions/ConnectionAction';

import LoginComponent from './components/LoginCompoment'
import MessageListComponent from './components/MessageListComponent'
import MessageFormComponent from './components/MessageFormComponent'


class Main extends React.Component {

  constructor(props) {
    super(props);
    store.dispatch(connectionRequest('teste'));
  }

  render() {
    return (
      <React.Fragment>
        <LoginComponent></LoginComponent>
        <MessageListComponent></MessageListComponent>
        <MessageFormComponent></MessageFormComponent>
      </React.Fragment>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;