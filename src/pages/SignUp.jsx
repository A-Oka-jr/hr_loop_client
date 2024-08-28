import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("job_seeker");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "company") {
      formData.role = "company_user";
    }
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>
        <div className="flex justify-around mb-6">
          <button
            className={`${
              activeTab === "job_seeker"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-lg`}
            onClick={() => handleTabSwitch("job_seeker")}
          >
            Job Seeker
          </button>
          <button
            className={`${
              activeTab === "company"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-lg`}
            onClick={() => handleTabSwitch("company")}
          >
            Company
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>

          {activeTab === "company" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company_name"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company_name"
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                placeholder="Enter your company name"
                onChange={handleChange}
                required
              />
            </div>
          )}

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

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company_role"
            >
              Company Role
            </label>
            <select
              id="company_role"
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="owner">Owner</option>
              <option value="mnager">Manager</option>
              <option value="recruiter">Recruiter</option>
            </select>
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
