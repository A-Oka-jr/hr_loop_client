import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserFailuar,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import Navbar from "./Navbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.get("/api/v1/auth/logout");

      if (res.data.success === false) {
        dispatch(signOutUserFailuar(res.data.message));
        return;
      }

      dispatch(signOutUserSuccess(res.data));
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      dispatch(signOutUserFailuar(error.message));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar onLogout={handleLogout} />

        {/* Content Area */}
        <div className="bg-gray-50 p-10 flex-1 overflow-y-auto">
          <div className="bg-white shadow-md rounded-lg p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
