import React, { Component } from "react";
import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>Home page is accessible by any signed in user.</p>
    <Messages />
  </div>
);

class MessagesBase extends Component {
  render() {
    return <div>Messages will be here</div>;
  }
}
const Messages = withFirebase(MessagesBase);

const condition = authUser => !!authUser;

export default withEmailVerification(withAuthorization(condition)(Home));
