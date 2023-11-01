import { FunctionComponent, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ExtensionIcon from "@mui/icons-material/Extension";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { logoutUser } from "../../thunks/userThunks";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { RootState } from "../../reducers";

const Topbar: FunctionComponent = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div className="topbarContainer">
      <ExtensionIcon className="topbarIcon" onClick={() => navigate("/")} />
      <SportsScoreIcon
        className="topbarIcon"
        onClick={() => navigate("/scoreboard")}
      />
      <LogoutIcon className="topbarIcon" onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Leaving?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to leave the game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => {setOpen(false)
          
            dispatch(logoutUser(token))
            setTimeout(() => {
              navigate("/login")
            }, 0);
            }} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <PersonIcon className="topbarIcon" onClick={() => navigate("/account")} />
    </div>
  );
};
export default Topbar;
