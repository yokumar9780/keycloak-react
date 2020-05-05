import React, { useState, useEffect } from "react";

function UserProfile(props) {
  const [keycloakProfile, setkeycloakProfile] = useState({
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    enabled: false,
    emailVerified: false,
    totp: false,
    createdTimestamp: "",
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    props.keycloak.loadUserProfile().then((_keycloakProfile) => {
      debugger;
      setkeycloakProfile({ ..._keycloakProfile });
    });
  });

  return (
    <div className="UserInfo">
      <p>Id: {keycloakProfile.id}</p>
      <p>username: {keycloakProfile.username}</p>
      <p>email: {keycloakProfile.email}</p>
      <p>firstName: {keycloakProfile.firstName}</p>
      <p>lastName: {keycloakProfile.lastName}</p>
      <p>enabled: {keycloakProfile.enabled}</p>
      <p>createdTimestamp: {keycloakProfile.createdTimestamp}</p>
    </div>
  );
}

export default UserProfile;
