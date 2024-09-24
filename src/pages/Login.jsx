import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signinStart,
  signinSuccess,
  signinFailuar,
} from "../redux/user/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const response = await axios.post("api/v1/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;

      if (data.success === false) {
        dispatch(signinFailuar(data.message));
        return;
      }

      dispatch(signinSuccess(data));
      if (!data.user.role) {
        navigate("/subscription_plans");
        return;
      }
      if (data.user.role === "job_seeker") {
        navigate("/seeker_profile");
        return;
      }
      navigate("/");
    } catch (error) {
      dispatch(
        signinFailuar(error.response?.data?.message || "An error occurred")
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-[900px]">
        {/* Left Side - Login Form */}
        <div className="w-1/2 bg-white p-12">
          <h2 className="text-4xl font-bold mb-6 text-center">Sign In</h2>
          <div className="flex justify-center gap-4 mb-6">
            {/* Social Sign-In Buttons */}
            {/* <button className="border p-2 rounded-full">
              <i className="fab fa-google text-gray-600"></i>
            </button>
            <button className="border p-2 rounded-full">
              <i className="fab fa-facebook text-gray-600"></i>
            </button>
            <button className="border p-2 rounded-full">
              <i className="fab fa-linkedin text-gray-600"></i>
            </button> */}
          </div>
          <p className="text-center mb-6 text-gray-500">
            or use your email password
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-md font-semibold mb-3"
                htmlFor="emailOrMobile"
              >
                Email or Mobile
              </label>
              <input
                type="text"
                id="emailOrMobile"
                className="w-full px-4 py-3 border rounded-lg text-gray-700 text-lg"
                placeholder="Enter your email or mobile number"
                onChange={handleChange}
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-md font-semibold mb-3"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 border rounded-lg text-gray-700 text-lg"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-primary text-white py-3 text-lg rounded-lg  transition duration-300"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="flex justify-between mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-600 hover:underline"
            >
              Forgot Your Password?
            </Link>
          </div>
        </div>

        {/* Right Side - Sign Up Invitation */}
        <div className="w-1/2 bg-gradient-to-r from-primary to-primary flex flex-col items-center justify-center p-12 text-white rounded-3xl shadow-lg">
          <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
          <p className="mb-6 text-center">
            Register with your personal details to use all site features
          </p>
          <Link to="/sign-up">
            <button className="bg-white text-primary font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
