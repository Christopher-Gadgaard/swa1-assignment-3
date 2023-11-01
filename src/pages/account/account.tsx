import { Card, TextField, Button } from "@mui/material";
import Topbar from "../../components/topbar/topbar";
import "./styles.css";
const AccountPage: React.FC = () => {
  return (
    <div className="pageContainer">
      <Topbar />
      <div className="pageLayout">
        <div className="updateAccountContainer">
          <Card className="accountCard">
            <TextField className="textField" label="name" />
            <TextField type="email" className="textField" label="email" />
            <TextField type="password" className="textField" label="password" />
            <TextField
              type="password"
              className="textField"
              label="repeat password"
            />
            <Button
              className="loginButton"
              variant="contained"
              onClick={() => {
                alert("Account updated");
              }}
            >
              Update
            </Button>
            <Button
              className="loginButton"
              variant="contained"
              onClick={() => {
                alert("Account deleted");
              }}
            >
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AccountPage;
