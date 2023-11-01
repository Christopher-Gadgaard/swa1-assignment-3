import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./pages/game/game";
import AccountPage from "./pages/account/account";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
