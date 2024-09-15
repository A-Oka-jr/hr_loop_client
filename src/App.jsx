import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SeekerProfile from "./pages/SeekerProfile";
import Settings from "./pages/Settings";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import JobSeekerJobs from "./pages/JobSeekerJobs.jsx";
import SignUp from "./pages/SignUp.jsx";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/*"
          element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="seeker_profile" element={<SeekerProfile />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="jobSeekerJobs" element={<JobSeekerJobs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="subscription_plans" element={<SubscriptionPlans />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Catch-all route for 404 */}
        </Route>
        <Route path="*" element={<NotFound />} />{" "}
        {/* Fallback for any undefined routes */}
      </Routes>
    </Router>
  );
}

export default App;
