import React from "react";
import LoginForm from "../../components/loginForm/LoginForm";
import "./styles.css";
import gemQuestLogo from "../../images/GemQuest.png";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="logo">
        {" "}
        <img src={gemQuestLogo} alt="Logo" />{" "}
      </div>
      <div className="form-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
