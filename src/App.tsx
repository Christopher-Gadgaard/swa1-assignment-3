//App.tsx 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "./store"; 
import { RootState } from "./reducers/rootReducer"; 
import "./App.css";
import Game from "./pages/game/GamePage";
import AccountPage from "./pages/account/account";
import ScorebardPage from "./pages/scoreboard/scoreboard";
import LoginPage from "./pages/login/login";

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/game" replace /> : <LoginPage />} />
          <Route path="/" element={isLoggedIn ? <Game /> : <Navigate to="/login" replace />} />
          <Route path="/game" element={<Game />} />
          <Route path="/account" element= { <AccountPage /> }  />
          <Route path="/scoreboard" element={isLoggedIn ? <ScorebardPage /> : <Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}


export default App;
