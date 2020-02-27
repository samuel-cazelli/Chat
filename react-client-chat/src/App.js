import React from 'react';

import { Provider } from 'react-redux';
import { store } from './redux/Store';
import { connectionRequest } from './redux/actions/ConnectionAction';

import LoginComponent from './components/LoginCompoment'
import MessageWrapper from './components/MessageWrapper'



class Main extends React.Component {

  constructor(props) {
    super(props);
    store.dispatch(connectionRequest());
  }

  render() {
    return (
      <React.Fragment>
        <LoginComponent></LoginComponent>
        <MessageWrapper></MessageWrapper>
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