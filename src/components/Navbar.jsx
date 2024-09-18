import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserFailuar,
  signOutUserSuccess,
} from "../redux/user/userSlice";

const Navbar = ({ onLogout }) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLangOpen, setLangOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [data, setData] = useState({});

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleLangDropdown = () => {
    setLangOpen(!isLangOpen);
  };

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/users/${currentUser.user.id}`
        );
        const data = response.data.data;
        if (response.data.success === false) {
          console.log(response.data.message);
          return;
        }
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/company_users/get_by_user_id/${currentUser.user.id}`
        );
        const data = response.data.data;

        if (response.data.success === false) {
          console.log(response.data.message);
          return;
        }
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUser.user.role === "job_seeker") {
      fetchUserData();
    } else if (currentUser.user.role === "company_user") {
      fetchCompanyData(); // Call the function properly
    }
  }, [currentUser]);

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
    <nav className="bg-primary p-4 flex justify-center items-center">
      <div className="flex items-center">
        <div className="flex items-center mr-2">
          {/* user or comapny name */}
          <p className="text-white text-lg font-semibold">
            {currentUser.user.role === "job_seeker"
              ? data?.first_name + " " + data?.last_name
              : data.company?.name}
          </p>
        </div>
        {/* <div className="relative">
          <button
            onClick={toggleLangDropdown}
            className="text-white mx-2 focus:outline-none"
          >
            Language
          </button>
          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                English
              </button>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Arabic
              </button>
            </div>
          )}
        </div> */}

        {/* User Avatar */}
        <div className="relative">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <img
              src={`http://localhost:3000/uploads/${
                currentUser.user.role === "job_seeker"
                  ? data?.photo
                  : data.company?.image
              }`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <Link
                to={"/profile"}
                className="block text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
