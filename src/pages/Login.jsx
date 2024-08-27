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
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="flex gab-2 mt-5">
          <p>Dont Have an account ?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
