import React from 'react';


import { RealTime } from 'shared-client-chat/index';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      realTime: null,
      messages: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {

    const realTime = new RealTime();

    this.setState({ realTime }, () => {
      this.state.realTime
        .connect()
        .then(() => {
          this.state.realTime.sendMessage('react', 'connected');
        })
        .catch(err => console.log('Error connecting SignalR - ' + err));

      this.state
          .realTime
          .onNewMessage = (message) => {
                                          let messages = this.state.messages;
                                          messages.push(message);
                                          this.setState({ messages: messages });
                                        };

    });
  }


  handleSubmit(event) {

    this.state.realTime.sendMessage(this.refs.nick.value, this.refs.message.value);

    event.preventDefault();
  }

  render() {

    let messagesList = (<ul>
      {
        this.state.messages.map((item, index) =>
          <li key={index}>
            <span>{item}</span>
          </li>
        )
      }
    </ul>
    );

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text" placeholder="Nick" name="nick" ref="nick" />
            <input type="text" placeholder="Message" name="message" ref="message" />
            <button type="submit">Send</button>
          </div>
        </form>
        {messagesList}
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