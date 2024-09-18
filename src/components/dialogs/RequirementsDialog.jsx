import PropTypes from "prop-types";

const RequirementsDialog = ({ isOpen, onClose, requirements }) => {
  if (!isOpen || !requirements) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Job Requirements
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="font-semibold text-gray-700 w-32">Position:</span>
            <span className="text-gray-600 ml-2">{requirements.position}</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-gray-700 w-32">Education:</span>
            <span className="text-gray-600 ml-2">
              {requirements.qualifications.education}
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-gray-700 w-32">
              Experience:
            </span>
            <span className="text-gray-600 ml-2">
              {requirements.qualifications.experience}
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-gray-700 w-32">Skills:</span>
            <span className="text-gray-600 ml-2">
              {requirements.qualifications.skills.join(", ")}
            </span>
          </li>
          {/* Add more fields as needed */}
        </ul>
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

RequirementsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  requirements: PropTypes.object,
};

export default RequirementsDialog;
