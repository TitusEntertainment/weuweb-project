import React, { useState } from "react";
import fetch from "node-fetch";
import "../scss/register.scss";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, errors, setError, clearError } = useForm();

  const validateEmail = (e) => {
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const subject = e.target.value.toLowerCase();
    if (reg.test(subject)) return clearError("email");
    setError("email", "notMatch", "Please, enter a valid email");
  };

  const onSubmit = (data) => {
    const body = {
      email: data.email,
      password: data.password,
    };

    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => console.log(res));
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>

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
          onChange={(e) => {
            if (e.target.value.length > 5) return clearError("password");
            setError("password", "notMatch", "Password must be more than 5 characters");
          }}
          ref={register({ required: true, minLength: 6 })}
          name="password"
          id="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
