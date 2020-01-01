import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpFormBase extends React.Component {
  state = { ...INITIAL_STATE };
  onSubmit = e => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    e.preventDefault();
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    console.log(this);
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          placeholder="Username"
          type="text"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          placeholder="Email Address"
          type="text"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          placeholder="Password"
          type="text"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          placeholder="Confirm Password"
          type="text"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't you have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withFirebase(SignUpFormBase);

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

export { SignUpLink, SignUpForm };
export default SignUpPage;
