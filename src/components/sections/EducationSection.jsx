import { useState } from "react";
import PropTypes from "prop-types";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import axios from "axios";

const EducationSection = ({ user, education, jobSeekerId, updateUser }) => {
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);
  const [newEducation, setNewEducation] = useState({
    start_date: "",
    end_date: "",
    certificate: "",
    degree: "",
    description: "",
  });

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const saveEducation = async () => {
    try {
      if (editingEducationIndex !== null) {
        const updatedEducation = [...education];
        updatedEducation[editingEducationIndex] = newEducation;

        await axios.patch(`api/v1/jobSeekers/updateEducation/${jobSeekerId}`, {
          index: editingEducationIndex,
          education: newEducation,
        });

        updateUser({ ...user, education: updatedEducation });
        setEditingEducationIndex(null);
      } else {
        await axios.post(
          `api/v1/jobSeekers/addEducation/${user.id}`,
          newEducation
        );

        updateUser({ ...user, education: [...education, newEducation] });
        setIsAddingEducation(false);
      }

      setNewEducation({
        start_date: "",
        end_date: "",
        certificate: "",
        degree: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to save education");
    }
  };

  const deleteEducation = async (index) => {
    try {
      const updatedEducation = [...education];
      updatedEducation.splice(index, 1);

      await axios.put(`api/v1/jobSeekers/update/${user.id}`, {
        education: updatedEducation,
      });

      updateUser({ ...user, education: updatedEducation });
    } catch (error) {
      console.error(error);
      alert("Failed to delete education");
    }
  };

  const openEditEducation = (index) => {
    setEditingEducationIndex(index);
    setNewEducation({ ...education[index] });
    setIsAddingEducation(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Education</h3>
      {education.map((edu, index) => (
        <div key={index} className="mt-2">
          {editingEducationIndex === index ? (
            <div>
              <input
                type="text"
                name="degree"
                value={newEducation.degree}
                onChange={handleEducationChange}
                className="block mb-2 border border-gray-300 rounded p-2"
                placeholder="Degree"
              />
              <input
                type="text"
                name="certificate"
                value={newEducation.certificate}
                onChange={handleEducationChange}
                className="block mb-2 border border-gray-300 rounded p-2"
                placeholder="Certificate"
              />
              <input
                type="date"
                name="start_date"
                value={newEducation.start_date}
                onChange={handleEducationChange}
                className="block mb-2 border border-gray-300 rounded p-2"
                placeholder="Start Date"
              />
              <input
                type="date"
                name="end_date"
                value={newEducation.end_date}
                onChange={handleEducationChange}
                className="block mb-2 border border-gray-300 rounded p-2"
                placeholder="End Date"
              />
              <textarea
                name="description"
                value={newEducation.description}
                onChange={handleEducationChange}
                className="block mb-2 border border-gray-300 rounded p-2"
                placeholder="Description"
              />
              <button
                onClick={saveEducation}
                className="bg-primary text-white py-1 px-3 rounded"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingEducationIndex(null);
                  setIsAddingEducation(false);
                }}
                className="ml-2 bg-gray-300 text-gray-800 py-1 px-3 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="p-4 border border-gray-300 rounded">
              <h4 className="text-lg font-semibold">{edu.certificate}</h4>
              <p className="text-gray-600">{edu.degree}</p>
              <p className="text-gray-600">
                {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
              </p>
              <p className="text-gray-600">{edu.description}</p>
              <button
                onClick={() => openEditEducation(index)}
                className="text-blue-600"
              >
                <AiOutlineEdit className="text-2xl text-green-600 hover:text-green-800" />
              </button>
              <button
                onClick={() => deleteEducation(index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                <AiOutlineDelete className="text-2xl" />
              </button>
            </div>
          )}
        </div>
      ))}
      {isAddingEducation && editingEducationIndex === null && (
        <div>
          <input
            type="text"
            name="degree"
            value={newEducation.degree}
            onChange={handleEducationChange}
            className="block mb-2 border border-gray-300 rounded p-2"
            placeholder="Degree"
          />
          <input
            type="text"
            name="certificate"
            value={newEducation.certificate}
            onChange={handleEducationChange}
            className="block mb-2 border border-gray-300 rounded p-2"
            placeholder="Certificate"
          />
          <input
            type="date"
            name="start_date"
            value={newEducation.start_date}
            onChange={handleEducationChange}
            className="block mb-2 border border-gray-300 rounded p-2"
            placeholder="Start Date"
          />
          <input
            type="date"
            name="end_date"
            value={newEducation.end_date}
            onChange={handleEducationChange}
            className="block mb-2 border border-gray-300 rounded p-2"
            placeholder="End Date"
          />
          <textarea
            name="description"
            value={newEducation.description}
            onChange={handleEducationChange}
            className="block mb-2 border border-gray-300 rounded p-2"
            placeholder="Description"
          />
          <button
            onClick={saveEducation}
            className="bg-primary text-white py-1 px-3 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsAddingEducation(false)}
            className="ml-2 bg-gray-300 text-gray-800 py-1 px-3 rounded"
          >
            Cancel
          </button>
        </div>
      )}
      <button
        onClick={() => setIsAddingEducation(true)}
        className="mt-4 flex items-center text-primary"
      >
        <AiOutlinePlusCircle title="Add Education" className="mr-2 text-2xl" />
      </button>
    </div>
  );
};

// Add prop types validation
EducationSection.propTypes = {
  user: PropTypes.object.isRequired,
  education: PropTypes.arrayOf(
    PropTypes.shape({
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      certificate: PropTypes.string.isRequired,
      degree: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  jobSeekerId: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default EducationSection;
