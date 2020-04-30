import React, { useState } from "react";
import "../scss/register.scss";
import { useForm } from "react-hook-form";
import fetch from "node-fetch";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, errors, setError, clearError } = useForm();
  let formSubmitError = "";
  const [currPassword, setCurrPassword] = useState("");

  const validateEmail = (e) => {
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const subject = e.target.value.toLowerCase();
    if (reg.test(subject)) return clearError("email");
    setError("email", "notMatch", "Please, enter a valid email");
  };

  const onSubmit = (data) => {
    const tempName = data.fullName.split(" ");
    console.log(tempName);

    const body = {
      name: tempName[0],
      lastName: tempName[1],
      email: data.email,
      username: data.username,
      password: data.password,
    };

    fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => {
      switch (res.stauts) {
        case 400:
          formSubmitError = "something went wrong!";
          break;
        case 200:
          formSubmitError = "Success!";
      }
    });
  };

  const validateName = (e) => {
    const value = e.target.value.split(" ");

    if (value[0] && value[1] && value[1].length > 1) {
      return clearError("fullName");
    }
    setError("fullName", "notMatch", "Please, make sure to fill in BOTH your name and surname!");
  };

  return (
    <div className="Register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <input
          type="text"
          name="fullName"
          placeholder="Name and Surname"
          id="form-name"
          onChange={(e) => validateName(e)}
          ref={register({ required: true, minLength: 2 })}
        />
        {errors.fullName && <p>{errors.fullName.message}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => {
            if (e.target.value.length > 2) return clearError("username");
            setError("username", "notMatch", "Username must be longer than two characters");
          }}
          ref={register({ required: true, minLength: 2 })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => validateEmail(e)}
          ref={register({ required: true, minLength: 5 })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setCurrPassword(e.target.value);
            if (e.target.value.length > 5) return clearError("password");
            setError("password", "notMatch", "Password must be at least 6 characters");
          }}
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={(e) => {
            if (currPassword === e.target.value) return clearError("confirmPassword");
            setError("confirmPassword", "notMatch", "Password does not match!");
          }}
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <button type="submit">Register</button>
        <p>{formSubmitError}</p>
        <Link to="/login">
          <p id="alreadyGotAcc">Already have an account? Login!</p>
        </Link>
      </form>
    </div>
  );
};

export default Register;
