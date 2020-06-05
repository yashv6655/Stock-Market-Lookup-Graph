import React, { useState } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get("http://localhost:4000/postmessages")
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    // user.map((item) => {
    //   if (item.username === username && item.password === password) {
    //     console.log("Success");
    //     setLoggedIn(true);
    //     return loggedIn;
    //   } else {
    //     console.log("Failed");
    //     setLoggedIn(false);
    //     return loggedIn;
    //   }
    // });
    user.map((item) => {
      bcrypt.compare(password, item.password, function (err, res) {
        if (res) {
          console.log("success");
          setLoggedIn(true);
        } else {
          console.log("failed");
          setLoggedIn(false);
        }
      });
    });
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Log In</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Username"
            onChange={usernameChange}
            value={username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">Password</label>
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Another input"
            onChange={passwordChange}
            value={password}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Login
        </button>
        {loggedIn ? <Redirect to="/complete" /> : <p>Please Log In</p>}
      </form>
      <Link to="/signup">signup</Link>
    </div>
  );
}
