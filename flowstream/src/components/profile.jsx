import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import "../scss/profile.scss";
import cookie from "cookie";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [tag, setTag] = useState("");
  const [email, setEmail] = useState("");

  const getUserData = async () => {
    const { token } = cookie.parse(document.cookie);

    if (!token) return;

    const data = await fetch("http://localhost:3000/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const user = await data.json();

    setUsername(user.username);
    setLastname(user.lastname);
    setEmail(user.email);
    setName(user.name);
    setTag(user.tag);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="Profile">
      <h1>{`${username}#${tag}`}</h1>
      <p>{`Hey, ${name} ${lastname}`}</p>
      <p>{`Your email is currently: ${email}`}</p>
      <p>{`Your discriminator is: #${tag}`}</p>
      <button>Edit profile</button>
    </div>
  );
};

export default Profile;
