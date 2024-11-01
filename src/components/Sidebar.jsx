import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaGem } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  signOutUserStart,
  signOutUserFailuar,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import PropTypes from "prop-types";

const Sidebar = ({ onLogout }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser?.user.role);
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
    <div className="bg-gradient-to-b from-primary to-violet-950 text-white h-screen w-72 flex flex-col shadow-lg">
      <div className="text-3xl font-bold p-8">
        <Link to="/">Hr Loop</Link>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {currentUser?.user.role && (
            <li className="mb-6">
              <Link
                to="/"
                className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
              >
                <AiFillHome className="text-2xl" />
                <span>Home</span>
              </Link>
            </li>
          )}
          {currentUser?.user.role === "company_user" && (
            <li className="mb-6">
              <Link
                to="/profile"
                className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
              >
                <FaUserCircle className="text-2xl" />
                <span>Profile</span>
              </Link>
            </li>
          )}
          {currentUser?.user.role === "job_seeker" && (
            <li className="mb-6">
              <Link
                to="/seeker_profile"
                className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
              >
                <FaUserCircle className="text-2xl" />
                <span>Profile</span>
              </Link>
            </li>
          )}

          {currentUser?.user.role === "job_seeker" && (
            <li className="mb-6">
              <Link
                to="/jobSeekerJobs"
                className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
              >
                <FaUserCircle className="text-2xl" />
                <span>Jops</span>
              </Link>
            </li>
          )}
          {currentUser?.user.role === "company_user" && (
            <li className="mb-6">
              <Link
                to="/jobs"
                className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
              >
                <ImSearch className="text-2xl" />
                <span>Jobs</span>
              </Link>
            </li>
          )}
          {/* {currentUser?.user.role && (
            <li className="mb-6">
              <Link
                to="/settings"
                className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
              >
                <AiFillSetting className="text-2xl" />
                <span>Settings</span>
              </Link>
            </li>
          )} */}

          {currentUser?.user.role === null ||
            (currentUser?.user.role === "company_user" && (
              <li className="mb-6">
                <Link
                  to="/subscription_plans"
                  className="flex items-center space-x-4 p-3 text-lg hover:bg-white hover:bg-opacity-10 rounded-lg transition ease-in-out duration-300"
                >
                  <FaGem className="text-2xl" />
                  <span>Subscription Plans</span>
                </Link>
              </li>
            ))}
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

Sidebar.propTypes = {
  onLogout: PropTypes.func,
};

export default Sidebar;
