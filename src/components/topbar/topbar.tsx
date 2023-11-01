import { FunctionComponent } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ExtensionIcon from "@mui/icons-material/Extension";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const Topbar: FunctionComponent = () => {
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
      <Dialog open={open}>
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
          <Button onClick={() => navigate("/login")} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <PersonIcon className="topbarIcon" onClick={() => navigate("/account")} />
    </div>
  );
};
export default Topbar;
