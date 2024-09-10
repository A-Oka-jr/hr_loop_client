import { useState } from "react";

const AddJobseekerDialog = ({ isOpen, onClose, onSubmit }) => {
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [education, setEducation] = useState([
    {
      start_date: "",
      end_date: "",
      certificate: "",
      degree: "",
      description: "",
    },
  ]);
  const [experience, setExperience] = useState([
    { role: "", company: "", start_date: "", end_date: "", description: "" },
  ]);

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducation(updatedEducation);
  };

  const addEducationField = () => {
    setEducation([
      ...education,
      {
        start_date: "",
        end_date: "",
        certificate: "",
        degree: "",
        description: "",
      },
    ]);
  };

  const removeEducationField = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperience(updatedExperience);
  };

  const addExperienceField = () => {
    setExperience([
      ...experience,
      { role: "", company: "", start_date: "", end_date: "", description: "" },
    ]);
  };

  const removeExperienceField = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
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
      skills,
      education,
      experience: { jobs: experience },
    };

    onSubmit(jobseekerData);
  };
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden">
          <div className="overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-6">Add Jobseeker Details</h2>
            {/* Inline Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="ml-1">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1  block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Age"
                  required
                />
              </div>
            </div>
            <div className="mb-4 ml-1">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="ml-1">
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
            <div className="mb-4 ml-1">
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <div className="bg-white border  p-4 rounded-md">
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white text-primary border border-primary px-3 py-1 rounded-md flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(index)}
                        className="ml-2 text-primary"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={skillInput}
                  onChange={handleSkillInputChange}
                  onKeyDown={handleSkillKeyDown}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter a skill and press Enter"
                />
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Education
              </label>
              {education.map((edu, index) => (
                <div key={index} className="mb-4 border p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={edu.start_date}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "start_date",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={edu.end_date}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "end_date",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Certificate
                      </label>
                      <input
                        type="text"
                        value={edu.certificate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "certificate",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your certificate"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your degree"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={edu.description}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Describe your education"
                      rows="3"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-4 text-red-500"
                    onClick={() => removeEducationField(index)}
                  >
                    Remove Education
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-4 text-indigo-600"
                onClick={addEducationField}
              >
                Add Education
              </button>
            </div>
            {/* Experience Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4 border p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) =>
                          handleExperienceChange(index, "role", e.target.value)
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your role"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter the company name"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={exp.start_date}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "start_date",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={exp.end_date}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "end_date",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Describe your experience"
                      rows="3"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-4 text-red-500"
                    onClick={() => removeExperienceField(index)}
                  >
                    Remove Experience
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-4 text-indigo-600"
                onClick={addExperienceField}
              >
                Add Experience
              </button>
            </div>
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
      </div>
    )
  );
};

export default AddJobseekerDialog;
