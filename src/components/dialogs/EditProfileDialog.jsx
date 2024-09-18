import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Import axios for making HTTP requests

const EditProfileDialog = ({
  isOpen,
  onClose,
  user,
  onProfileUpdate,
  setError,
  error,
  setLoading,
  loading,
}) => {
  const [formData, setFormData] = useState({
    profile_details: {
      first_name: user.profile_details?.first_name || "",
      last_name: user.profile_details?.last_name || "",
      role: user.profile_details?.role || "",
      bio: user.profile_details?.bio || "",
      age: user.profile_details?.age || "", // Adding age
    },
    // education: user.education || "",
    skills: user.skills || [], // Ensure skills are an array
    address: user.address || "",
    resume_link: user.resume_link || "",
    resume_file: user.resume_file || null, // Updated to handle file
  });

  const [skillInput, setSkillInput] = useState("");
  const [resumeFile, setResumeFile] = useState(null); // New state for file input
  const dialogRef = useRef(null); // Ref for dialog content

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "first_name" ||
      name === "last_name" ||
      name === "role" ||
      name === "bio" ||
      name === "age"
    ) {
      setFormData({
        ...formData,
        profile_details: {
          ...formData.profile_details,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSkillChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, skillInput.trim()],
        });
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    setFormData({ ...formData, resume_file: file?.name || "" }); // Update formData with file name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    Object.keys(formData.profile_details).forEach((key) => {
      formDataToSubmit.append(
        `profile_details[${key}]`,
        formData.profile_details[key]
      );
    });

    // Append form data
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) =>
          formDataToSubmit.append(`${key}[]`, item)
        ); // Append array items with [] notation
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }
    // Append file
    if (resumeFile) {
      formDataToSubmit.append("resume_file", resumeFile);
    }

    for (const [key, value] of formDataToSubmit.entries()) {
      console.log(`${key}: ${value}`);
    }

    // TODO: fix updating profile_details
    console.log("Profile Details:", formData);
    setError(null);
    setLoading(true);

    try {
      // Make an API call to update the user profile
      const response = await axios.put(
        `api/v1/jobSeekers/update/${user.id}`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      if (data.success === false) {
        setLoading(false);
        setError("Failed to update profile");
        console.error(data.message);
        return;
      }
      console.log(data);

      alert("Profile updated successfully!");
      setLoading(false);
      setError(null);
      onProfileUpdate(data.data);
      onClose(); // Close the dialog on successful submit
    } catch (error) {
      setLoading(false);
      setError("Failed to update profile");
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleClickOutside = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose(); // Close the dialog if click is outside of it
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isOpen) return null;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl"
        ref={dialogRef}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1" htmlFor="first_name">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.profile_details.first_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1" htmlFor="last_name">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.profile_details.last_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.profile_details.age}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="role">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.profile_details.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.profile_details.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1" htmlFor="resume_link">
                Resume Link
              </label>
              <input
                type="text"
                id="resume_link"
                name="resume_link"
                value={formData.resume_link}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1" htmlFor="resume_file">
                Resume File
              </label>
              <input
                type="file"
                id="resume_file"
                name="resume_file"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              type="text"
              value={skillInput}
              onChange={handleSkillChange}
              onKeyDown={handleAddSkill}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Type a skill and press Enter"
            />
            <div className="mt-2">
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white text-primary border border-primary px-3 py-1 rounded-md flex items-center"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-primary rounded-full p-1"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditProfileDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProfileUpdate: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    // id: PropTypes.string.isRequired,
    profile_details: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      role: PropTypes.string,
      bio: PropTypes.string,
      age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Allow age as string or number
    }),
    // education: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    address: PropTypes.string,
    resume_link: PropTypes.string,
    resume_file: PropTypes.string,
  }).isRequired,
};

export default EditProfileDialog;
