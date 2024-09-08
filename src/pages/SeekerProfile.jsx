import React, { useEffect, useState } from "react";
import axios from "axios";
import EditProfileDialog from "../components/dialogs/EditProfileDialog";
import { useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const SeekerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `api/v1/jobSeekers/getByUserId/${currentUser.user.job_seeker_id}`
        ); // Replace with the actual API endpoint
        setUser(response.data.data); // Update to use response.data.data
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch Your data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser.user.job_seeker_id]);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const startEditing = (index) => {
    setEditingExperienceIndex(index);
    setNewExperience({ ...user.experience.jobs[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const saveExperience = async () => {
    try {
      await axios.put(
        `api/v1/jobSeekers/update/${currentUser.user.job_seeker_id}`,
        { index: editingExperienceIndex, ...newExperience }
      ); // Replace with the actual API endpoint
      const updatedUser = { ...user };
      updatedUser.experience.jobs[editingExperienceIndex] = newExperience;
      setUser(updatedUser);
      setEditingExperienceIndex(null);
    } catch (error) {
      setError("Failed to update experience");
    }
  };

  const cancelEditing = () => {
    setEditingExperienceIndex(null);
  };

  const deleteExperience = async (description, index) => {
    const updatedUser = { ...user };
    updatedUser.experience.jobs.splice(index, 1);
    // console.log(description, "index:", index);
    console.log(updatedUser.experience);

    // return;
    try {
      await axios.put(
        `api/v1/jobSeekers/update/${updatedUser.id}`,
        updatedUser
      ); // Replace with the actual API endpoint

      setUser(updatedUser);
    } catch (error) {
      setError("Failed to delete experience");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="max-w-full mx-auto bg-white rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-center">
          <img
            className="w-32 h-32 object-cover rounded-full border-4 border-white"
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.profile_details.first_name} {user.profile_details.last_name}
          </h2>
          <p className="text-gray-600">
            {user.profile_details?.role || "Role not available"}
          </p>
        </div>
        <div className="text-center mt-2">
          <p className="text-gray-700">{user.profile_details.bio}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg text-center font-semibold text-gray-800">
            Skills
          </h3>
          <div className="flex flex-wrap justify-center mt-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="m-2 bg-primary text-white py-1 px-3 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
            {user.experience.jobs.map((job, index) => (
              <div key={index} className="mt-2">
                {editingExperienceIndex === index ? (
                  <div>
                    <input
                      type="text"
                      name="role"
                      value={newExperience.role}
                      onChange={handleChange}
                      className="block mb-2 border border-gray-300 rounded p-2"
                      placeholder="Role"
                    />
                    <input
                      type="text"
                      name="company"
                      value={newExperience.company}
                      onChange={handleChange}
                      className="block mb-2 border border-gray-300 rounded p-2"
                      placeholder="Company"
                    />
                    <input
                      type="date"
                      name="start_date"
                      value={newExperience.start_date}
                      onChange={handleChange}
                      className="block mb-2 border border-gray-300 rounded p-2"
                    />
                    <input
                      type="date"
                      name="end_date"
                      value={newExperience.end_date}
                      onChange={handleChange}
                      className="block mb-2 border border-gray-300 rounded p-2"
                    />
                    <textarea
                      name="description"
                      value={newExperience.description}
                      onChange={handleChange}
                      className="block mb-2 border border-gray-300 rounded p-2"
                      placeholder="Description"
                      rows="4"
                      cols="60"
                    ></textarea>
                    <button
                      onClick={saveExperience}
                      className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-500 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      {job.role} at {job.company}
                    </h4>
                    <p className="text-gray-600">
                      {formatDate(job.start_date)} - {formatDate(job.end_date)}
                    </p>
                    <p className="text-gray-700">{job.description}</p>
                    <div className="flex mt-2">
                      <AiFillEdit
                        onClick={() => startEditing(index)}
                        title="Edit Experience"
                        className="text-green-600 text-2xl hover:text-green-800 mr-2 cursor-pointer"
                      />
                      <AiFillDelete
                        onClick={() =>
                          deleteExperience(user.experience.jobs, index)
                        }
                        title="Delete Experience"
                        className="text-red-600 text-2xl hover:text-red-800 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mt-6">
              Education
            </h3>
            <div className="mt-2">
              <h4 className="text-md font-semibold text-gray-800">
                {user.education}
              </h4>
              <p className="text-gray-600">
                {/* {formatDate(education.start_date)} -{" "} */}
                {/* {formatDate(education.end_date)} */}
              </p>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-6">
              Address
            </h3>
            <p className="text-gray-700">
              {user.address || "Address not available"}
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6">Resume</h3>
            <a
              href={user.resume_file || "#"}
              download={user.resume_file || "resume.pdf"}
              className="text-blue-600 hover:underline"
            >
              Download Resume
            </a>
          </div>
        </div>
        <div className="mt-6 flex justify-around">
          <a
            href={`mailto:${user.profile_details.email || "email@example.com"}`}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12h1.5a2.5 2.5 0 012.5 2.5v.5m0-10.5v7.337A6.5 6.5 0 0016 12H7.5a6.5 6.5 0 00-3 7V5.5a2.5 2.5 0 012.5-2.5H15v0h0z"
              />
            </svg>
          </a>
          <a
            href={`https://www.linkedin.com/in/${
              user.profile_details.linkedin || "johndoe"
            }`}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 8a6 6 0 116 6h-3.1a2.5 2.5 0 01-.9-4.8 6 6 0 00-8-5.7A6 6 0 016 12v0h1.5m0 1.5h3"
              />
            </svg>
          </a>
          <a
            href={`https://github.com/${
              user.profile_details.github || "johndoe"
            }`}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C5.935 2 1 6.935 1 13a11.93 11.93 0 007.032 10.995c.514.095.703-.223.703-.496v-1.97c-2.855.623-3.463-1.306-3.463-1.306-.468-1.19-1.142-1.511-1.142-1.511-.933-.64.07-.627.07-.627 1.032.07 1.578 1.067 1.578 1.067.916 1.569 2.403 1.115 2.988.85.092-.665.357-1.115.65-1.373-2.292-.26-4.699-1.146-4.699-5.08 0-1.12.4-2.036 1.052-2.753-.106-.26-.455-1.311.1-2.731 0 0 .87-.278 2.846 1.051A9.797 9.797 0 0112 7.787c.88.004 1.767.12 2.594.353 1.975-1.328 2.844-1.05 2.844-1.05.557 1.418.208 2.469.104 2.73.654.717 1.05 1.634 1.05 2.754 0 3.943-2.41 4.817-4.705 5.07.369.316.698.942.698 1.898v2.82c0 .274.19.593.705.496A11.935 11.935 0 0023 13c0-6.065-4.935-11-11-11z"
              />
            </svg>
          </a>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={openDialog}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Edit
          </button>
        </div>
      </div>
      {/* Render the EditProfileDialog component */}
      <EditProfileDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        user={user}
      />
    </div>
  );
};

export default SeekerProfile;
