import PropTypes from "prop-types";
const SeekerProfileDialog = ({ open, onClose, seeker }) => {
  if (!open || !seeker) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-xl relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <img
              className="w-24 h-24 rounded-full"
              src={`http://localhost:3000/uploads/${seeker.photo}`}
              alt="Seeker Profile"
            />
            <div>
              <h2 className="text-3xl font-semibold text-primary uppercase">{`${seeker.first_name} ${seeker.last_name}`}</h2>
              <p className="text-sm text-gray-600">Full-Stack Developer</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm mb-1">
              <strong>Email:</strong> {seeker.email}
            </p>
            <p className="text-sm mb-1">
              <strong>Address:</strong> {seeker.address}
            </p>
            <p className="text-sm mb-1">
              <strong>Age:</strong> {seeker.profile_details?.age}
            </p>
            <p className="text-sm mb-1">
              <strong>Bio:</strong> {seeker.profile_details?.bio}
            </p>
          </div>
        </div>

        <div className="border-t my-4"></div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <ul className="flex flex-wrap ustify-center mt-2">
              {seeker.skills.map((skill, index) => (
                <li
                  key={index}
                  className="m-2 text-primary border border-primary px-3 py-1 rounded-md flex items-center"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            {seeker.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <p>
                  <strong>Degree:</strong> {edu.degree}
                </p>
                <p>
                  <strong>Certificate:</strong> {edu.certificate}
                </p>
                <p className="text-sm">
                  <strong>Period:</strong> {edu.start_date} to {edu.end_date}
                </p>
                <p className="text-gray-500 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t my-4"></div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          {seeker.experience?.jobs.map((job, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Role:</strong> {job.role}
              </p>
              <p>
                <strong>Company:</strong> {job.company}
              </p>
              <p className="text-sm">
                <strong>Period:</strong> {job.start_date} to {job.end_date}
              </p>
              <p className="text-gray-500 text-sm">{job.description}</p>
            </div>
          ))}
        </div>

        {/* Close button at the bottom */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

SeekerProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  seeker: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    photo: PropTypes.string,
    profile_details: PropTypes.shape({
      bio: PropTypes.string,
      age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Allow age as string or number
      role: PropTypes.string,
      resume_link: PropTypes.string,
      resume_file: PropTypes.string,
    }),
    education: PropTypes.arrayOf(
      PropTypes.shape({
        degree: PropTypes.string,
        certificate: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    experience: PropTypes.shape({
      jobs: PropTypes.arrayOf(
        PropTypes.shape({
          role: PropTypes.string,
          company: PropTypes.string,
          start_date: PropTypes.string,
          end_date: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
};

export default SeekerProfileDialog;
