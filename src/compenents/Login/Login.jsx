import React, { useRef, useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import app from "../../fireBase/fireBase.config";
import { FaTwitter, FaGithub, FaGoogle } from "react-icons/fa";

import { Link } from "react-router-dom";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Login = () => {
  const auth = getAuth(app);
  const [passwordShown, setPasswordShown] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const emailRef = useRef();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        if (!loggedUser) {
          setError(
            toast.error("Your Email Not verified", {
              position: toast.POSITION.TOP_RIGHT,
            })
          );
        }
        setSuccess(
          toast.success("Login Successfully", {
            position: toast.POSITION.TOP_CENTER,
          })
        );
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  const handleRestPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      setError(
        toast.error("Please Provide Your Email Address to Rest Password", {
          position: toast.POSITION.TOP_CENTER,
        })
      );
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(
          toast.success("Please Check Your Email", {
            position: toast.POSITION.TOP_CENTER,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  const handleGitHubSingIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleTwitterSingIn = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSingOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-auto w-25">
      <Form onSubmit={handleLogin}>
        <h2>Please Login</h2>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
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
        <Button className="mb-3" variant="primary" type="submit">
          Login
        </Button>
        <div>
          {user ? (
            <button onClick={handleSingOut}>Sing Out</button>
          ) : (
            <>
              <Link className="fs-2" onClick={handleGoogleSingIn}>
                <FaGoogle />
              </Link>
              <Link className="fs-2" onClick={handleGitHubSingIn}>
                <FaGithub />
              </Link>
              <Link className="fs-2" onClick={handleTwitterSingIn}>
                {" "}
                <FaTwitter />
              </Link>
            </>
          )}
        </div>
      </Form>
      <div>
        <small>
          Rest Password? Please
          <button onClick={handleRestPassword} className="btn btn-link">
            Rest
          </button>
        </small>
      </div>
      <p>
        <small>
          New To Website? Please <Link to="/register">Register</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      {/* <p className="text-success">{success}</p> */}
    </div>
  );
};

export default Login;
