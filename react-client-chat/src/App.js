import React from 'react';


import { RealTime } from 'shared-client-chat/index';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      realTime: null,
      messages: [],
      isLoggedIn: false,
      errorMessageLogin: '',
    };
    this.handleSubmitNick = this.handleSubmitNick.bind(this);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
  }

  componentDidMount = () => {

    const realTime = new RealTime();

    this.setState({ realTime }, () => {

      this.state.realTime
        .connect()
        .then(() => {
          console.log('connected');
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

  handleSubmitNick(event) {
    this.state.realTime.logIn(this.refs.nick.value).then((result) => {
      if (result.Key) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ errorMessageLogin: result.Value });
      }
    });
    event.preventDefault();
  }


  handleSubmitMessage(event) {
    this.state.realTime.sendMessage(this.refs.message.value);
    event.preventDefault();
  }

  render() {

    let visibleForm;

    //If is logged in show messages form, otherwise show login form
    if (this.state.isLoggedIn) {
      visibleForm = (
        <form onSubmit={this.handleSubmitMessage} id="formLogin">
          <div>
            <label>Nick</label><br />
            <input type="text" placeholder="Message" name="message" ref="message" key="message" value='hello world' />
            <button type="submit">Send Message</button>
          </div>
        </form>
      );
    } else {
      visibleForm = (
        <form onSubmit={this.handleSubmitNick} id="formMessage">
          <div>
            <label>Message</label><br />
            <input type="text" placeholder="Nick" name="nick" ref="nick" key="nick" value='react' />
            <button type="submit">Log In</button>
            <span>{this.state.errorMessageLogin}</span>
          </div>
        </form>
      );
    }

    let messagesList = (
      <ul>
        {this.state.messages.map((message, index) =>
          <li key={index}>{message}</li>)
        }
      </ul>
    );

    return (
      <React.Fragment>
        {visibleForm}
        {messagesList}
      </React.Fragment>
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