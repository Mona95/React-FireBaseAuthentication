import React, { Component } from "react";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";
import { withFirebase } from "../Firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>Home page is accessible by any signed in user.</p>
    <Messages />
  </div>
);

class MessagesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      messages: [],
      text: ""
    };
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid
      //createdAt: this.props.firebase.serverValue.TIMESTAMP
    });

    this.setState({ text: "" });

    event.preventDefault();
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;
    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text
      //editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.messages().on("value", snapshot => {
      const messageObject = snapshot.val();
      if (messageObject) {
        // convert messages list from snapshot
        const messageList = Object.keys(messageObject).map(key => ({
          ...messageObject[key],
          uid: key
        }));
        this.setState({ loading: false, messages: messageList });
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }
  componentWillUnmount() {
    this.props.firebase.messages().off();
  }
  render() {
    const { text, messages, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}
            {messages ? (
              <MessageList
                messages={messages}
                onRemoveMessage={this.onRemoveMessage}
                onEditMessage={this.onEditMessage}
              />
            ) : (
              <div>There are no messages ...</div>
            )}
            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <TextField
                id="standard-basic"
                label="Message"
                value={text}
                onChange={this.onChangeText}
              />
              <br />
              <br />
              <Button type="submit" variant="contained" color="secondary">
                Send
              </Button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
const MessageList = ({ messages, onRemoveMessage, onEditMessage }) => {
  return (
    <ul>
      {messages.map(message => (
        <MessageItem
          key={message.uid}
          message={message}
          onRemoveMessage={onRemoveMessage}
          onEditMessage={onEditMessage}
        />
      ))}
    </ul>
  );
};

const EditButton = withStyles({
  root: {
    fontSize: 10,
    color: "#000000",
    padding: 0,
    marginLeft: 15,
    width: "20px"
  }
})(Button);

const RedButton = withStyles({
  root: {
    fontSize: 10,
    color: "#000000",
    padding: 0,
    backgroundColor: "red",
    marginLeft: 5,
    width: "20px"
  }
})(Button);

const SaveButton = withStyles({
  root: {
    fontSize: 10,
    color: "#000000",
    padding: 0,
    backgroundColor: "green",
    marginLeft: 5
  }
})(Button);

class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editText: this.props.message.text
    };
  }
  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text
    }));
  };
  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };
  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);
    this.setState({ editMode: false });
  };
  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;
    return (
      <li>
        {editMode ? (
          <TextField
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>{message.userId}</strong> {message.text}
            {message.editedAt && <span>(Edited)</span>}
          </span>
        )}
        {editMode ? (
          <span>
            <SaveButton onClick={this.onSaveEditText}>Save</SaveButton>
            <RedButton onClick={this.onToggleEditMode}>Reset</RedButton>
          </span>
        ) : (
          <EditButton variant="outlined" onClick={this.onToggleEditMode}>
            Edit
          </EditButton>
        )}
        {!editMode && (
          <RedButton type="button" onClick={() => onRemoveMessage(message.uid)}>
            Delete
          </RedButton>
        )}
      </li>
    );
  }
}

const Messages = withFirebase(MessagesBase);

const condition = authUser => !!authUser;

export default withEmailVerification(withAuthorization(condition)(Home));
