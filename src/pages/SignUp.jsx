import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      {/* Container */}
      <div className="flex bg-white rounded-lg shadow-lg w-2/3 overflow-hidden">
        {/* Left Side - Welcome Section */}
        <div className="bg-primary text-white p-10 flex flex-col justify-center w-1/2 rounded-3xl shadow-lg">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="mb-6">
            Enter your personal details to use all of site features
          </p>
          <Link to="/login">
            <button className="bg-white text-primary font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300">
              Sign In
            </button>
          </Link>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="p-8 w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Create Account
          </h2>

          {/* Social Media Buttons */}
          <div className="flex justify-center gap-4 mb-4">
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
              <i className="fab fa-google"></i>
            </button>
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-gray-700 font-semibold"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                className="w-full px-3 py-2 border rounded-lg mt-1 text-gray-700"
                placeholder="Enter your first name"
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label
                htmlFor="last_name"
                className="block text-gray-700 font-semibold"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                className="w-full px-3 py-2 border rounded-lg mt-1 text-gray-700"
                placeholder="Enter your last name"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg mt-1 text-gray-700"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            {/* mobile */}
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-semibold"
              >
                mobile
              </label>
              <input
                type="tel"
                id="mobile"
                className="w-full px-3 py-2 border rounded-lg mt-1 text-gray-700"
                placeholder="Enter your mobile number"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg mt-1 text-gray-700"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg  transition duration-300"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          {/* Already have an account? */}
          <div className="flex justify-center gap-2 mt-5">
            <p>Already have an account?</p>
            <Link to="/login">
              <span className="text-primary font-semibold">Login</span>
            </Link>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
