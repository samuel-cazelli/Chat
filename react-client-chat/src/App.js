import React from 'react';
import logo from './logo.svg';
import './App.css';

import { HubConnectionBuilder } from '@aspnet/signalr';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chatHubConnection: null
    };
  }

  componentDidMount = () => {
    const chatHubConnection = new HubConnectionBuilder().withUrl("https://localhost:44342/chatHub").build();

    this.setState({ chatHubConnection }, () => {
      this.state.chatHubConnection
        .start()
        .then(() => console.log('SignalR Started'))
        .catch(err => console.log('Error connecting SignalR - ' + err));

      this.state.chatHubConnection.on('ReceiveMessage', (user, message) => {
        console.log(`${user} - ${message}`);
      });
    });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            teste
        </a>
        </header>
      </div>
    );
  }
}

function App() {

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;