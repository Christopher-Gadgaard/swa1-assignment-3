import { FunctionComponent } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ExtensionIcon from "@mui/icons-material/Extension";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Topbar: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="topbarContainer">
      <ExtensionIcon className="topbarIcon" onClick={() => navigate("/")} />
      <SportsScoreIcon
        className="topbarIcon"
        onClick={() => navigate("/scoreboard")}
      />
      <LogoutIcon className="topbarIcon" onClick={() => navigate("/login")} />
      <PersonIcon className="topbarIcon" onClick={() => navigate("/account")} />
    </div>
  );
};
export default Topbar;
