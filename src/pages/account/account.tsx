import React from "react";
import "./styles.css";
import gemQuestLogo from "../../images/GemQuest.png";
import AccountComponent from "../../components/account/AccountComponent";
import Topbar from "../../components/topbar/topbar";

const AccountPage: React.FC = () => {
  return (
    
    <div className="account-page">
       <Topbar/>
      <div className="logo"><img src={gemQuestLogo} alt="Logo" />  </div>
      <div className="account-container">
        <AccountComponent />
      </div>
    </div>
  );
};

export default AccountPage;
