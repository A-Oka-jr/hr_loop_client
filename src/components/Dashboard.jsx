import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserFailuar,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";

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
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 bg-gray-50 p-10 overflow-y-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
