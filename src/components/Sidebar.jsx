import { Link } from "react-router-dom";
import { AiFillHome, AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { useDispatch } from "react-redux";

import {
  signOutUserStart,
  signOutUserFailuar,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";

const Sidebar = ({ onLogout }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.get("/api/v1/auth/logout");

      if (res.data.success === false) {
        dispatch(signOutUserFailuar(res.data.message));
        return;
      }

      dispatch(signOutUserSuccess(res.data));
      if (typeof onLogout === "function") {
        onLogout();
      }
    } catch (error) {
      dispatch(signOutUserFailuar(error.message));
    }
  };

  return (
    <div className="bg-gradient-to-b from-black to-blue-500 text-white h-screen w-72 flex flex-col shadow-lg">
      <div className="text-3xl font-bold p-8">
        <Link to="/">Hr Loop</Link>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-6">
            <Link
              to="/"
              className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
            >
              <AiFillHome className="text-2xl" />
              <span>Home</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/profile"
              className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
            >
              <FaUserCircle className="text-2xl" />
              <span>Profile</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/jobs"
              className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
            >
              <ImSearch className="text-2xl" />
              <span>Jobs</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/settings"
              className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
            >
              <AiFillSetting className="text-2xl" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-4 w-full p-3 text-lg bg-red-600 hover:bg-red-700 rounded-lg transition ease-in-out duration-300"
        >
          <AiOutlineLogout className="text-2xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
