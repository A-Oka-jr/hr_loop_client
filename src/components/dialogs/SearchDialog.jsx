import { useState } from "react";
import PropTypes from "prop-types";

const SearchDialog = ({ isOpen, onClose, onSubmit, countries }) => {
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [type, setType] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [country, setCountry] = useState(""); // State for selected country

  if (!isOpen) return null;

  // Reset form fields
  const resetForm = () => {
    setName("");
    setType("");
    setSkills([]);
    setSkillInput("");
  };

  // Handle form submission
  const handleSubmit = () => {
    const searchData = {
      name,
      job_title: jobTitle,
      type,
      skills,
      description,
      job_type: jobType,
      country,
    };
    onSubmit(searchData, resetForm); // Pass resetForm as a callback
    onClose();
  };

  // Handle adding a skill
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
      e.preventDefault();
    }
  };

  // Handle removing a skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Search Candidates</h2>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="mb-4 w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Search Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter search title"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Job Title
              </label>
              <input
                id="title"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter search title"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            >
              <option value="">Select</option>
              <option value="loop">Loop</option>
              <option value="search">Search</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description
            </label>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>

          {/* Skills Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Type a skill and press Enter"
            />
            <div className="mt-2">
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
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
            {/* Inline Job Type Inputs */}
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label
                  htmlFor="jobType1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Type
                </label>
                <select
                  id="jobType1"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="full_time">Full Time</option>
                  <option value="remote">Remote</option>
                  <option value="contract">Contract</option>
                  <option value="part_time">Part Time</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Country</label>
                <select
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="">Select a Country</option>
                  {countries.map((countryOption) => (
                    <option
                      key={countryOption.country}
                      value={countryOption?.country?.toLowerCase()}
                    >
                      {countryOption.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

SearchDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchDialog;
