import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs.jsx";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
