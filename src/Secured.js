import React, { Component } from "react";
import Keycloak from "keycloak-js";
import UserInfo from "./UserInfo";
import Logout from "./Logout";

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
    });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        this.setLocalStorage();

        this.refreshTokenReset();

        return (
          <div>
            <p>
              This is a Keycloak-secured component of your application. You
              shouldn't be able to see this unless you've authenticated with
              Keycloak.
            </p>
            <p> {this.state.keycloak.token} </p>
            <p> {this.state.keycloak.refreshToken} </p>
            <UserInfo keycloak={this.state.keycloak} />
            <Logout keycloak={this.state.keycloak} />
          </div>
        );
      } else return <div>Unable to authenticate!</div>;
    }
    return <div>Initializing Keycloak...</div>;
  }

  refreshTokenReset() {
    setTimeout(() => {
      this.state.keycloak
        .updateToken(70)
        .success((refreshed) => {
          if (refreshed) {
            console.debug("Token refreshed" + refreshed);
          } else {
            console.warn(
              "Token not refreshed, valid for " +
                Math.round(
                  this.state.keycloak.tokenParsed.exp +
                    this.state.keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .error(() => {
          console.error("Failed to refresh token");
        });
    }, 60000);
  }

  setLocalStorage() {
    localStorage.setItem("react-token", this.state.keycloak.token);
    localStorage.setItem(
      "react-refresh-token",
      this.state.keycloak.refreshToken
    );
  }
}
export default Secured;
