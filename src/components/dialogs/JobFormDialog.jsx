import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const JobFormDialog = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: {
      position: "",
      qualifications: {
        education: "",
        experience: "",
        skills: [],
      },
    },
    location: "",
    type: "full_time",
    status: "",
    posted_date: "",
  });

  const [skillInput, setSkillInput] = useState(""); // Track current skill input

  useEffect(() => {
    if (isOpen) {
      // Only update form data when the dialog is open
      if (initialData) {
        setFormData({
          title: initialData.title || "",
          description: initialData.description || "",
          requirements: {
            position: initialData.requirements?.position || "",
            qualifications: {
              education:
                initialData.requirements?.qualifications.education || "",
              experience:
                initialData.requirements?.qualifications.experience || "",
              skills: initialData.requirements?.qualifications.skills || [],
            },
          },
          location: initialData.location || "",
          type: initialData.type || "full_time",
          status: initialData.status || "",
          posted_date: initialData.posted_date || "",
        });
      } else {
        setFormData({
          title: "",
          description: "",
          requirements: {
            position: "",
            qualifications: {
              education: "",
              experience: "",
              skills: [],
            },
          },
          location: "",
          type: "full_time",
          status: "",
          posted_date: "",
        });
      }
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequirementChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [name]: value,
        qualifications: {
          ...prev.requirements.qualifications,
          [name]: value,
        },
      },
    }));
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value); // Update input state
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        requirements: {
          ...prev.requirements,
          qualifications: {
            ...prev.requirements.qualifications,
            skills: [...prev.requirements.qualifications.skills, skillInput],
          },
        },
      }));
      setSkillInput(""); // Clear the input field
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        qualifications: {
          ...prev.requirements.qualifications,
          skills: prev.requirements.qualifications.skills.filter(
            (_, i) => i !== index
          ),
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      requirements: {
        position: "",
        qualifications: {
          education: "",
          experience: "",
          skills: [],
        },
      },
      location: "",
      type: "full_time",
      status: "",
      posted_date: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={handleClose}
      ></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Job Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                value={formData.requirements.position}
                onChange={handleRequirementChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1">
              <label className="block text-gray-700">Education</label>
              <input
                type="text"
                name="education"
                value={formData.requirements.qualifications.education}
                onChange={handleRequirementChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.requirements.qualifications.experience}
                onChange={handleRequirementChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Skills</label>
            <div className="flex items-center">
              <input
                type="text"
                value={skillInput}
                onChange={handleSkillInputChange}
                onKeyPress={handleSkillKeyPress} // Detect Enter key
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Type a skill and press Enter"
              />
            </div>
            <div className="mt-2 max-h-40 overflow-y-auto">
              {formData.requirements.qualifications.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.requirements.qualifications.skills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(index)}
                          className="ml-2 text-white hover:bg-red-700 rounded-full p-1"
                        >
                          x
                        </button>
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="remote">Remote</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1">
              <label className="block text-gray-700">Posted Date</label>
              <input
                type="date"
                name="posted_date"
                value={formData.posted_date.split("T")[0]} // Format date input
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Status</option>
                <option value="opened">Opened</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
JobFormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    requirements: PropTypes.shape({
      qualifications: PropTypes.shape({
        education: PropTypes.string,
        experience: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.string),
      }),
      position: PropTypes.string,
    }),
    location: PropTypes.string,
    type: PropTypes.oneOf([
      "full-time",
      "part-time",
      "remote",
      "internship",
      "contract",
    ]),
    status: PropTypes.oneOf(["opened", "closed"]),
    posted_date: PropTypes.string,
  }),
};

export default JobFormDialog;
