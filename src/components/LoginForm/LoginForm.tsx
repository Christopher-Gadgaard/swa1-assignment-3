import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginUser } from "../../thunks/userThunks";
import { AppDispatch } from "../../store";
import { RootState } from "../../reducers";

import Card from "@mui/material/Card";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import "./style.css";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const [value, setValue] = React.useState("login");

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const error = useSelector((state: RootState) => state.user.error);

  const validateForm = () => {
    if (!username.trim() || !password.trim()) {
      setValidationError("Username and password are required.");
      return false;
    }
    if (value === "signup" && password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return false;
    }
    return true;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(username, password));
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createUser(username, password));
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setUsername("");
      setPassword("");
      setValidationError("");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (error) {
      setValidationError(error);
    }
  }, [error]);

  return (
    <Card className="loginCard">
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="login" control={<Radio />} label="Log in" />
          <FormControlLabel
            value="signup"
            control={<Radio />}
            label="Sign up"
          />
        </RadioGroup>
      </FormControl>
      {validationError && <div className="error">{validationError}</div>}
      {value === "signup" ? (
        <div className="loginContainer">
          <TextField className="textField"  onChange={(e) => setUsername(e.target.value)} value={username} label="Username"></TextField>

          <TextField
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="textField"
            label="password"
          ></TextField>
          <TextField
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="textField"
            label="repeat password"
          ></TextField>
          <Button
            className="loginButton"
            variant="contained"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </div>
      ) : (
        <div className="loginContainer">
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="textField"
            label="Username"
          ></TextField>
          <TextField
            type="password"
            value={password}
            className="textField"
            onChange={(e) => setPassword(e.target.value)}
            label="password"
          ></TextField>
          <Button
            className="loginButton"
            variant="contained"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      )}
    </Card>
  );
};

export default LoginForm;
