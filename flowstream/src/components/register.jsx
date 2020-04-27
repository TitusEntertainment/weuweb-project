import React from "react";
import "../scss/register.scss";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          ref={register({ required: true, minLength: 2 })}
        />
        {errors.fullName && <p className="error">You must provide a full name</p>}

        <input type="email" name="email" placeholder="Email" ref={register({ required: true, minLength: 5 })} />
        {errors.email && <p>You must provide a valid email!</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={register({ required: true, minLength: 6 })}
          minLength="6"
        />

        {errors.password && <p className="error">>You must provide a passowrd longer than six characters</p>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          ref={register({ required: true, minLength: 6 })}
          minLength="6"
        />
        {errors.confirmPassword && <p className="error">>Password must be indentical to the first password!</p>}

        <button type="submit">Register</button>
        <p>Already have an account? Login!</p>
      </form>
    </div>
  );
};

export default Register;
