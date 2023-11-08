import React, { useEffect, useState, ChangeEvent, FormEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginUser } from "../../thunks/userThunks";
import { AppDispatch } from "../../store";
import { RootState } from "../../reducers/rootReducer";
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

// LoginForm component using functional component syntax
const LoginForm: React.FC = () => {
  // State for managing form data and validation errors
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    validationError: "",
    actionType: "login",
  });

  // Destructuring form data for easy access
  const { username, password, confirmPassword, validationError, actionType } = formData;

  // Dispatch function from the Redux store
  const dispatch: AppDispatch = useDispatch();
  // Redux state selectors
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const error = useSelector((state: RootState) => state.user.error);

  // useCallback hook to prevent unnecessary re-creations of the updateFormData function
  const updateFormData = useCallback((data: Partial<typeof formData>) => {
    setFormData((prevState) => ({ ...prevState, ...data }));
  }, []);

  // Validates the form data before submitting
  const validateForm = () => {
    if (!username.trim() || !password.trim()) {
      updateFormData({ validationError: "Username and password are required." });
      return false;
    }
    if (actionType === "signup" && password !== confirmPassword) {
      updateFormData({ validationError: "Passwords do not match." });
      return false;
    }
    return true;
  };

  // Handler for form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (actionType === "signup") {
      dispatch(createUser(username, password));
    } else {
      dispatch(loginUser(username, password));
    }
  };

  // Handler for input changes to update the state
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // useEffect hook to reset form or set an error when the login status changes
  useEffect(() => {
    if (isLoggedIn) {
      updateFormData({ username: "", password: "", confirmPassword: "", validationError: "" });
    } else if (error) {
      updateFormData({ validationError: error });
    }
  }, [isLoggedIn, error, updateFormData]);

  // Render the login form UI
  return (
    <Card className="loginCard">
      <div className="welcomeContainer">
        <h2>{actionType === "login" ? "Welcome, Please login" : "Create your account"}</h2>
      </div>
      <div className="loginContainer">
        <div className="topContainer">
          <TextField
            name="username"
            value={username}
            onChange={handleInputChange}
            className="textField"
            label="Username"
          />
          <TextField
            name="password"
            type="password"
            value={password}
            onChange={handleInputChange}
            className="textField"
            label="Password"
          />
          {/* Conditionally render the confirmPassword field only for sign up */}
          {actionType === "signup" && (
            <TextField
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleInputChange}
              className="textField"
              label="Repeat Password"
            />
          )}
        </div>
        <div className="bottomContainer">
          {/* Display validation errors if any */}
          {validationError && <div className="error">{validationError}</div>}
          {/* Radio buttons to toggle between login and sign up */}
          <FormControl className="radioGroup">
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="actionType"
              value={actionType}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="login"
                control={<Radio />}
                label="Log in"
              />
              <FormControlLabel
                value="signup"
                control={<Radio />}
                label="Sign up"
              />
            </RadioGroup>
          </FormControl>
          {/* Submit button for the form */}
          <Button
            className="loginButton"
            variant="contained"
            onClick={handleSubmit}
          >
            {actionType === "signup" ? "Sign Up" : "Login"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LoginForm;
