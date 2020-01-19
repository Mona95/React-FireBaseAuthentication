import React from "react";
import { withFirebase } from "../Firebase";
import Button from "@material-ui/core/Button";

const SignOut = ({ firebase }) => (
  <Button variant="contained" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOut);
