import React from "react";
import { Link } from "react-router-dom";
import SignOut from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

const Navigation = () => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </div>
  );
};

const NavigationAuth = () => (
  <AppBar position="static" container alignItems="center">
    <Toolbar>
      <Grid justify="left" container spacing={5}>
        <Grid item>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={ROUTES.LANDING}
            >
              Landing
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={ROUTES.HOME}
            >
              Home
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={ROUTES.ACCOUNT}
            >
              Account
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={ROUTES.ADMIN}
            >
              Admin
            </Link>
          </Button>
        </Grid>
      </Grid>
      <MenuItem>
        <SignOut />
      </MenuItem>
    </Toolbar>
  </AppBar>
);

const NavigationNonAuth = () => (
  <AppBar position="static" container alignItems="center">
    <Toolbar>
      <Grid justify="left" container spacing={5}>
        <Grid item>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={ROUTES.SIGN_IN}
            >
              Sign In
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={ROUTES.LANDING}
            >
              Landing
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={ROUTES.HOME}
            >
              Home
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Navigation;
