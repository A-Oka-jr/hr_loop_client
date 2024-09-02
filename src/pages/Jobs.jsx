import { useState } from "react";
import JobFormDialog from "../components/JobFormDialog";

const Jobs = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const statusColors = {
    closed: "bg-red-100 hover:bg-red-300",
    opend: "bg-blue-100 hover:bg-blue-300",
  };

  const [jobs, setJobs] = useState([
    {
      title: "Software Developer",
      description: "We are looking for a software developer to join our team.",
      requirements:
        "Bachelor's degree in Computer Science or equivalent experience",
      location: "ksa",
      type: "remote",
      status: "closed",
      posted_date: "2022-01-01",
    },
    {
      title: "Data Scientist",
      description: "We are looking for a data scientist to join our team.",
      requirements:
        "Bachelor's degree in Computer Science or equivalent experience",
      location: "usa",
      type: "full_time",
      status: "opend",
      posted_date: "2022-01-01",
    },
    {
      title: "Product Manager",
      description: "We are looking for a product manager to join our team.",
      requirements:
        "Bachelor's degree in Computer Science or equivalent experience",
      location: "uae",
      type: "full_time",
      status: "closed",
      posted_date: "2022-01-01",
    },
    {
      title: "Frontend Developer",
      description: "We are looking for a frontend developer to join our team.",
      requirements:
        "Bachelor's degree in Computer Science or equivalent experience",
      location: "uae",
      type: "part_time",
      status: "opend",
      posted_date: "2022-01-01",
    },
    {
      title: "Backend Developer",
      description: "We are looking for a backend developer to join our team.",
      requirements:
        "Bachelor's degree in Computer Science or equivalent experience",
      location: "uae",
      type: "full_time",
      status: "opend",
      posted_date: "2022-01-01",
    },
    {
      title: "Full Stack Developer",
      description:
        "We are looking for a full stack developer to join our team.",
      requirements:
        "Bachelor's degree in Computer Science or equivalent experience",
      location: "uae",
      type: "full_time",
      status: "opend",
      posted_date: "2022-01-01",
    },
    {
      title: "UI/UX Designer",
      description: "We are looking for a UI/UX designer to join our team.",
      requirements:
        "Bachelor's degree in Computer Science or equivalent experience",
      location: "uae",
      type: "full_time",
      status: "closed",
      posted_date: "2022-01-01",
    },
    {
      title: "Mobile Developer",
      description: "We are looking for a mobile developer to join our team.",
      requirements:
        "Bachelor's degree in Computer Science or equivalent experience",
      location: "uae",
      type: "full_time",
      status: "closed",
      posted_date: "2022-01-01",
    },
  ]); // Dummy state to store job listings

  const handleAddJobClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleJobSubmit = (jobData) => {
    setJobs([...jobs, jobData]); // Add the new job to the job listings
    setIsDialogOpen(false); // Close the dialog
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const countStatus = (status) => {
    return jobs.filter((jobs) => jobs.status === status).length;
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4">Jobs Status Table</h1>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl text-red-500">
          Something went wrong
        </p>
      )}

      <button
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 mb-4"
        onClick={handleAddJobClick}
      >
        Add Job
      </button>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Title
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Description
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Requirements
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Location
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Type
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Posted Date
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Status
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Render job listings here */}
          {paginatedJobs.map((job, index) => (
            <tr
              key={index}
              className={`cursor-pointer ${statusColors[job.status]}`}
            >
              <td className="py-3 px-6 border-b border-gray-200">
                {job.title}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {job.description}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {job.requirements}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {job.location}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {job.type === "full_time"
                  ? "Full Time"
                  : job.type === "Part Time"
                  ? "Part Time"
                  : "Remote"}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {new Date(job.posted_date).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                {job.status}
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                <div className="flex">
                  <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                    Edit
                  </button>

                  <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ml-2">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Job Form Dialog */}
      <JobFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleJobSubmit}
      />
    </div>
  );
};

export default Jobs;
