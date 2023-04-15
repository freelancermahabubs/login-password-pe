import React, { useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import app from "../../fireBase/fireBase.config";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import "./Register.css";

const auth = getAuth(app);
const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    const email = event.target.email.value;
    const name = event.target.name.value;
    const password = event.target.password.value;
    console.log(email, name, password);

    if (!/(?=.*[A-Z])/.test(password)) {
      setError(
        toast.error("Please add at least Two Uppercase Letter", {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
      return;
    } else if (!/(?=.*[!@#$&*])/.test(password)) {
      setError(
        toast.error("Please Add a Special Character.", {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError(
        toast.error("Please add atLeast two number", {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
      return;
    } else if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)) {
      setError(
        toast.error("Please add atLeast three lowercase letters", {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
      return;
    } else if (password.length < 8) {
      setError(
        toast.error("Please add At least 8 Characters In your Password", {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        event.target.reset();
        setSuccess(
          toast.success("User Has Created SuccessFull", {
            position: toast.POSITION.TOP_RIGHT,
          })
        );
        sendVerificationEmail(result.user);
        updateUserData(result.user, name);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const sendVerificationEmail = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      setError(
        toast.error("Please Verify Your Email Address", {
          position: toast.POSITION.TOP_CENTER,
        })
      );
    });
  };

  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        setSuccess(
          toast.success("User Name Updated", {
            position: toast.POSITION.TOP_RIGHT,
          })
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="mx-auto w-25">
      <Form onSubmit={handleSubmit}>
        <h2>Please Register</h2>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            required
          />
        </div>

        <div className="form-group mb-3 password-filed">
          <label htmlFor="password">Password</label>
          <input
            className="form-control "
            type={passwordShown ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            required
          />
          {passwordShown ? (
            <EyeSlashIcon
              onClick={togglePassword}
              className="eye text-blue-500"
            />
          ) : (
            <EyeIcon onClick={togglePassword} className="eye text-blue-500" />
          )}
        </div>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>
        <small>
          AlReady Have an Account Please <Link to="/login">Login</Link>
        </small>
      </p>
      {/* <p className="text-danger">{error}</p> */}
      {/* <p className="text-success">{success}</p> */}
    </div>
  );
};

export default Register;
