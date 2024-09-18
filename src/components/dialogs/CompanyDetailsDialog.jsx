import { useState } from "react";
import PropTypes from "prop-types";

const CompanyDetailsDialog = ({ isOpen, onClose, onNext }) => {
  const [name, setCompanyName] = useState("");
  const [address, setCompanyAddress] = useState("");
  const [email, setCompanyEmail] = useState("");
  const [industry, setCompanyIndustry] = useState("");
  const [phone, setCompanyPhone] = useState("");
  const [company_size, setCompanySize] = useState("");
  const [image, setCompanyImage] = useState("");
  const [role, setRole] = useState("");

  const handleNext = () => {
    onNext({
      name,
      address,
      email,
      industry,
      phone,
      company_size,
      image,
      role,
    });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl transform transition-transform duration-300 ease-out scale-100">
          <h2 className="text-3xl font-bold mb-6">Company Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-2 block w-full p-3 border rounded-md"
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Company Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className="mt-2 block w-full p-3 border rounded-md"
              placeholder="Enter company address"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Company Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setCompanyEmail(e.target.value)}
              className="mt-2 block w-full p-3 border rounded-md"
              placeholder="Enter company email"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Company Industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setCompanyIndustry(e.target.value)}
              className="mt-2 block w-full p-3 border rounded-md"
              placeholder="Enter company industry"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Company Size
            </label>
            <input
              type="text"
              value={company_size}
              onChange={(e) => setCompanySize(e.target.value)}
              className="mt-2 block w-full p-3 border rounded-md"
              placeholder="Enter company size"
              required
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Company Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              id="role"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select One</option>
              <option value="owner">Owner</option>
              <option value="manager">Manager</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Company Phone
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              className="mt-2 block w-full p-3 border rounded-md"
              placeholder="Enter company phone"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Company Logo
            </label>
            <input
              type="file"
              value={image}
              onChange={(e) => setCompanyImage(e.target.value)}
              className="mt-2 block w-full p-3 border rounded-md"
              placeholder="Enter company logo"
              required
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md mr-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 text-white px-6 py-3 rounded-md"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  );
};

CompanyDetailsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default CompanyDetailsDialog;
