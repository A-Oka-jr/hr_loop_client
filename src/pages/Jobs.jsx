import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import JobFormDialog from "../components/JobFormDialog";
import RequirementsDialog from "../components/RequirementsDialog";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";

const Jobs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRequirementsDialogOpen, setIsRequirementsDialogOpen] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedRequirements, setSelectedRequirements] = useState(null);
  const [activeTab, setActiveTab] = useState("postJob"); // State for active tab
  const [jobs, setJobs] = useState([]);

  const statusColors = {
    closed: "bg-gray-100 hover:bg-gray-300",
    opened: "bg-blue-100 hover:bg-blue-300",
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setError(false);
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/jobs/get_by_company_id/${currentUser.user.company_id}`
        );
        const data = response.data.data;

        if (data.success === false) {
          setLoading(false);
          setError(true);
          console.log(data.message);
          return;
        }
        setLoading(false);
        setError(false);
        setJobs(data);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error(error);
      }
    };

    if (activeTab === "postJob") {
      fetchJobs();
    }
  }, [currentUser, activeTab]);

  const handleAddJobClick = () => {
    setEditingJob(null);
    setIsDialogOpen(true);
  };

  const handleEditJobClick = (job) => {
    setEditingJob(job);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleRequirementsClick = (requirements) => {
    setSelectedRequirements(requirements);
    setIsRequirementsDialogOpen(true);
  };

  const handleRequirementsDialogClose = () => {
    setIsRequirementsDialogOpen(false);
  };

  const handleDeleteJobClick = async (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await axios.delete(`/api/v1/jobs/delete/${id}`);
        const deletedJob = response.data.data;
        if (deletedJob.success === false) {
          console.log(deletedJob.message);
          return;
        }
        setJobs(jobs.filter((job) => job.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleJobSubmit = async (jobData) => {
    setError(false);
    setLoading(true);
    try {
      if (editingJob) {
        const response = await axios.put(
          `/api/v1/jobs/update/${editingJob.id}`,
          jobData
        );
        const updatedJob = response.data.data;

        if (updatedJob.success === false) {
          console.log(response.data.message);
          setError(true);
          setLoading(false);
          return;
        }

        setJobs(
          jobs.map((job) => (job.id === editingJob.id ? updatedJob : job))
        );
      } else {
        jobData.company_id = currentUser.user.company_id;
        const response = await axios.post("/api/v1/jobs/create", jobData);
        const newJob = response.data.data;

        if (newJob.success === false) {
          console.log(response.data.message);
          setError(true);
          setLoading(false);
          return;
        }

        setJobs([...jobs, newJob]);
      }

      setLoading(false);
      setIsDialogOpen(false);
      setEditingJob(null);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="overflow-x-auto">
      {/* Tabs */}
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab("postJob")}
          className={`py-2 px-4 rounded-t-lg focus:outline-none ${
            activeTab === "postJob"
              ? "bg-primary text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Post Job
        </button>
        <button
          onClick={() => setActiveTab("findCandidates")}
          className={`py-2 px-4 rounded-t-lg focus:outline-none ml-2 ${
            activeTab === "findCandidates"
              ? "bg-primary text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Find Candidates
        </button>
      </div>

      {activeTab === "postJob" && (
        <>
          <h1 className="text-2xl font-semibold mb-4">Jobs Status Table</h1>
          {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
          {error && (
            <p className="text-center my-7 text-2xl text-red-500">
              Something went wrong
            </p>
          )}

          <button
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-violet-950 mb-4"
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
                  <td
                    className="py-3 px-6 border-b border-gray-200 cursor-pointer"
                    onClick={() => handleRequirementsClick(job.requirements)}
                  >
                    {job.requirements.position}
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
                      <AiFillEdit
                        title="Edit Job"
                        className="text-green-400 text-xl hover:text-green-600 mr-2"
                        onClick={() => handleEditJobClick(job)}
                      >
                        Edit
                      </AiFillEdit>

                      <AiFillDelete
                        title="Delete Job"
                        className="text-red-400  text-xl hover:text-red-600 mr-2"
                        onClick={() => handleDeleteJobClick(job.id)}
                      >
                        Delete
                      </AiFillDelete>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`${
                    currentPage === pageNumber
                      ? "bg-primary text-white"
                      : "bg-gray-300 text-gray-700"
                  } py-2 px-4 rounded-lg mx-1`}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>

          <JobFormDialog
            isOpen={isDialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleJobSubmit}
            initialData={editingJob}
          />

          <RequirementsDialog
            isOpen={isRequirementsDialogOpen}
            onClose={handleRequirementsDialogClose}
            requirements={selectedRequirements}
          />
        </>
      )}

      {activeTab === "findCandidates" && (
        <>
          <h1 className="text-2xl font-semibold mb-4">Find Candidates</h1>
          <div className="flex justify-end">
            <button className="bg-primary text-white py-2 px-4 rounded-lg mr-2">
              loop
            </button>
            <button className="bg-primary text-white py-2 px-4 rounded-lg mr-2">
              search
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  type
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Name
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Date
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No candidates found.
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Jobs;
