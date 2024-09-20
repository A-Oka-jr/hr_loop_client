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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg w-[32rem]">
        <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-md font-semibold mb-3"
              htmlFor="emailOrMobile"
            >
              Email or Mobile
            </label>
            <input
              type="text" // Changed from "email" to "text"
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
            className="w-full bg-blue-500 text-white py-3 text-lg rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="flex justify-center gap-2 mt-6 text-lg">
          <p>Don&apos;t have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        {error && (
          <p className="text-red-500 text-center mt-6 text-lg">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
