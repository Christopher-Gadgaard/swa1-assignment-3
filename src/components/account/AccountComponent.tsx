//AccountComponent.tsx
import { Card, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { getUserProfile, updateUserProfile } from "../../thunks/userThunks";
import "./accountStyles.css";
import { AppDispatch } from "../../store";

const AccountComponent: React.FC = () => {
  // State to store user data and validation errors
  const [myUserData, setUserData] = useState({
    newPassword: "",
    newConfirmPassword: "",
    validationError: "",
  });
  // State to handle edit mode for changing the password
  const [editPasswordMode, setEditPasswordMode] = useState(false);

  // Destructure the necessary data from the Redux store
  const { userId, token, userData } = useSelector(
    (state: RootState) => state.user
  );

  // Get the dispatch function from the Redux store
  const dispatch: AppDispatch = useDispatch();

  // Effect to fetch user profile data on component mount
  useEffect(() => {
    if (userId !== null && token) {
      dispatch(getUserProfile(token, userId));
    }
  }, [dispatch, userId, token]);

  // Function to handle the initiation of password change
  const handleEditPassword = () => {
    setEditPasswordMode(true);
  };

  // Function to cancel the password change
  const handleCancel = () => {
    setEditPasswordMode(false);
    setUserData({ newPassword: "", newConfirmPassword: "", validationError: "" });
  };

  // Function to save the new password
  const handleSave = () => {
    // Validate password match
    if (myUserData.newPassword !== myUserData.newConfirmPassword) {
      setUserData({ ...myUserData, validationError: "Passwords do not match" });
      return;
    }
    // Dispatch the password update action
    dispatch(updateUserProfile(token, userId, { password: myUserData.newPassword }));
    // Reset the edit mode
    setEditPasswordMode(false);
  };

  // Function to handle form field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...myUserData, [name]: value });
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string: string) => {
   
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return ''; 
  };
  

  return (
    <Card className="accountCard">
      <div className="accountContainer">
        {/* Display welcome message */}
        <h2>Welcome, {userData && userData.username ? capitalizeFirstLetter(userData.username) : ''}</h2>
        {!editPasswordMode ? (
          // Show change password button if not in edit mode
          <Button
            className="account-button"
            variant="contained"
            onClick={handleEditPassword}
          >
            Change Password
          </Button>
        ) : (
          // Show password fields if in edit mode
          <>
            <TextField
              className="account-text-field"
              name="newPassword"
              label="New Password"
              type="password"
              value={myUserData.newPassword}
              onChange={handleChange}
              margin="normal"
              autoComplete="new-password"
            />
            <TextField
              className="account-text-field"
              name="newConfirmPassword"
              label="Confirm New Password"
              type="password"
              value={myUserData.newConfirmPassword}
              onChange={handleChange}
              margin="normal"
              autoComplete="new-password"
            />
            {myUserData.validationError && (
              <p className="account-error">{myUserData.validationError}</p>
            )}
            <Button
              className="account-button"
              variant="contained"
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
              className="account-button"
              variant="contained"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default AccountComponent;
