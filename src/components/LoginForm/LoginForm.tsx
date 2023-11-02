import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    validationError: "",
    actionType: "login",
  });

  const { username, password, confirmPassword, validationError, actionType } =
    formData;

  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const error = useSelector((state: RootState) => state.user.error);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prevState) => ({ ...prevState, ...data }));
  };

  const validateForm = () => {
    if (!username.trim() || !password.trim()) {
      updateFormData({
        validationError: "Username and password are required.",
      });
      return false;
    }
    if (actionType === "signup" && password !== confirmPassword) {
      updateFormData({ validationError: "Passwords do not match." });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (actionType === "signup") {
      dispatch(createUser(username, password));
    }

    dispatch(loginUser(username, password));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      updateFormData({ username: "", password: "", validationError: "" });
    } else if (error) {
      updateFormData({ validationError: error });
    }
  }, [isLoggedIn, error]);

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
          className="textField"
          onChange={handleInputChange}
          label="Password"
        />
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
          {validationError && <div className="error">{validationError}</div>}
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
