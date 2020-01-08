import React from "react";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes("password");

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    onSendEmailVerification = () => {
      this.props.firebase.doSendEmailVerification();
    };
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                <p>
                  Verify your E-Mail: Check you E-Mails (Spam folder included)
                  for a confirmation E-Mail or send another confirmation E-Mail.
                </p>
                <button type="button" onClick={this.onSendEmailVerification}>
                  Send confirmation E-Mail
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return withFirebase(WithEmailVerification);
};
export default withEmailVerification;
