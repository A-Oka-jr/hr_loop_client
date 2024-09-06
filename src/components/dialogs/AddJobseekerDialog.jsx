import { useState } from "react";

const AddJobseekerDialog = ({ isOpen, onClose, onSubmit }) => {
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = () => {
    // Prepare the data to be sent
    const jobseekerData = {
      address,
      profile_details: {
        first_name: firstName,
        last_name: lastName,
        age,
        bio,
      },
      resume_link: resumeLink,
      resume_file: resumeFile,
      skills: skills.split(",").map((skill) => skill.trim()),
      education,
      experience: experience.split(";").map((exp) => {
        const [company, role, start_date, end_date, description] =
          exp.split("|");
        return { company, role, start_date, end_date, description };
      }),
    };

    // Call the onSubmit function passed from SubscriptionPlans
    onSubmit(jobseekerData);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Add Jobseeker Details</h2>
          {/* Form inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your address"
                required
              />
            </div>
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your first name"
                required
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your last name"
                required
              />
            </div>
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your age"
                required
              />
            </div>
          </div>
          {/* Bio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter a short bio"
              rows="4"
              required
            />
          </div>
          {/* Resume Link & File */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Resume Link
              </label>
              <input
                type="url"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your resume link"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Resume File
              </label>
              <input
                type="file"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="mt-1 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          {/* Skills */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your skills"
              required
            />
          </div>
          {/* Education */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your education details"
              required
            />
          </div>
          {/* Experience */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Experience (format: company|role|start_date|end_date|description,
              separated by semicolons)
            </label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your work experience"
              rows="4"
              required
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-end">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddJobseekerDialog;
