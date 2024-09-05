import { useState } from "react";
import PropTypes from "prop-types";

const SearchDialog = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

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
    const searchData = { name, type, skills };
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Search Candidates</h2>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-4">
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
                      className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-white hover:bg-red-700 rounded-full p-1"
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              )}
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
