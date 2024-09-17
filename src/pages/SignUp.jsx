import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter your first name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter your last name"
              onChange={handleChange}
              required
            />
          </div>
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
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Email
            </label>
            <input
              type="number"
              id="phone"
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter your Phone Number"
              onChange={handleChange}
              required
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
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <div className="flex gap-2 mt-5">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <span className="text-blue-700">Login</span>
          </Link>
        </div>

        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
