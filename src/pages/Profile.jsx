import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import EditCompanyProfileDialog from "../components/dialogs/EditCompanyProfileDialog"; // Import the new component

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const fileInputRef = useRef(null); // Reference to the file input

  useEffect(() => {
    if (!currentUser) {
      Navigate("/login");
    }
    const getCompanyProfile = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await axios.get(
          `/api/v1/company_users/get_by_user_id/${currentUser.user.id}`
        );

        const data = response.data.data;

        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          setError(true);
          return;
        }

        setLoading(false);
        setData(data);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };

    if (currentUser.user.role === "company_user") {
      getCompanyProfile();
    }
  }, [currentUser]);

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the file input when the image is clicked
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);

      try {
        const response = await axios.post(
          `/api/v1/company/upload_profile_picture/${currentUser.user.company_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setData((prevData) => ({
            ...prevData,
            company: {
              ...prevData.company,
              image: response.data.image,
            },
          }));
          window.location.reload();
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-red-500">
        Error loading company profile. Please try again later.
      </div>
    );
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center space-x-6 mb-8 border-b border-gray-300 pb-6">
        <img
          src={`http://localhost:3000/uploads/${data.company?.image}`}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-primary shadow-lg cursor-pointer"
          onClick={handleImageClick}
        />
        <div>
          <h1 className="text-4xl font-bold text-primary">
            {data.company?.name}
          </h1>
          <span className="text-lg font-bold text-primary"></span>
        </div>
      </div>

      {/* Hidden file input for profile image upload */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Information Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            General Information
          </h2>
          <p className="mb-2">
            <strong className="font-medium text-gray-700">Email:</strong>{" "}
            {data.company?.email}
          </p>
          <p className="mb-2">
            <strong className="font-medium text-gray-700">Phone:</strong>{" "}
            {data.company?.phone}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Address:</strong>{" "}
            {data.company?.address}
          </p>
        </div>

        {/* Role-Specific Section */}
        {currentUser.user.role === "job_seeker" ? (
          <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Job Preferences
            </h2>
            <p className="mb-2">
              <strong className="font-medium text-gray-700">
                Preferred Job Titles:
              </strong>{" "}
              {currentUser.jobPreferences.titles.join(", ")}
            </p>
            <p className="mb-2">
              <strong className="font-medium text-gray-700">
                Preferred Locations:
              </strong>{" "}
              {currentUser.jobPreferences.locations.join(", ")}
            </p>
            <p className="mb-2">
              <strong className="font-medium text-gray-700">Skills:</strong>{" "}
              {currentUser.skills.join(", ")}
            </p>
            <p>
              <strong className="font-medium text-gray-700">Experience:</strong>{" "}
              {currentUser.experience} years
            </p>
          </div>
        ) : (
          <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Company Overview
            </h2>
            <p className="mb-2">
              <strong className="font-medium text-gray-700">Industry:</strong>{" "}
              {data.company?.industry}
            </p>
            <p className="mb-2">
              <strong className="font-medium text-gray-700">
                Company Size:
              </strong>{" "}
              {data.company?.company_size}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <button
          className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
          onClick={openModal}
        >
          Edit
        </button>
      </div>

      {/* Render the modal dialog */}
      <EditCompanyProfileDialog
        isOpen={isModalOpen}
        onClose={closeModal}
        currentUser={currentUser}
        setData={setData}
        data={data}
        user={currentUser.user}
      />
    </div>
  );
};

export default Profile;
