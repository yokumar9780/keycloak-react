import React, { useState, useEffect } from "react";

function UserInfo(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    props.keycloak.loadUserInfo().then((userInfo) => {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setId(userInfo.sub);
    });
  });

  return (
    <div className="UserInfo">
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>ID: {id}</p>
    </div>
  );
}

export default UserInfo;
