import { FunctionComponent } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import "./styles.css";

const Topbar: FunctionComponent = () => {
  return (
    <div className="topbarContainer">
      <LogoutIcon
        className="topbarIcon"
        onClick={() => alert("do soemthing")}
      />
      <PersonIcon
        className="topbarIcon"
        onClick={() => alert("do soemthing")}
      />
    </div>
  );
};
export default Topbar;
