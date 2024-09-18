import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const EditCompanyProfileDialog = ({
  isOpen,
  onClose,
  currentUser,
  setData,
  data,
  user,
}) => {
  const [email, setEmail] = useState(data.company?.email || currentUser.email);
  const [phone, setPhone] = useState(data.company?.phone || "");
  const [address, setAddress] = useState(data.company?.address || "");
  const [industry, setIndustry] = useState(data.company?.industry || "");
  const [companySize, setCompanySize] = useState(
    data.company?.company_size || ""
  );

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `/api/v1/company/update/${user.company_id}`,
        {
          email,
          phone,
          address,
          industry,
          company_size: companySize,
        }
      );
      if (response.data.success) {
        setData((prevData) => ({
          ...prevData,
          company: {
            ...prevData.company,
            email,
            phone,
            address,
            industry,
            company_size: companySize,
          },
        }));
        onClose();
      } else {
        console.error("Error updating company profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating company profile:", error);
    }
    onClose();
  };

  if (!isOpen) return null; // Don't render anything if the dialog is closed

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      {/* Adjust the width here */}
      <div className="bg-white rounded-lg w-full max-w-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Edit Company Profile</h2>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Phone</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Address</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {currentUser.user.role === "company_user" && (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">
                Industry
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">
                Company Size
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-3 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-primary text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

EditCompanyProfileDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default EditCompanyProfileDialog;
