import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useSelector } from "react-redux";

const JobSeekerJobs = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [findJobs, setFindJobs] = useState(true);
  const [findCompanies, setFindCompanies] = useState(false);
  const [autoApply, setAutoApply] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    jobs: [],
    companies: [],
  });
  const [selectedJob, setSelectedJob] = useState(null); // State to hold selected job

  const { currentUser } = useSelector((state) => state.user);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!findJobs && !findCompanies) {
      setSearchResults({
        jobs: [],
        companies: [],
      });
      return;
    }

    try {
      const response = await axios.get("/api/v1/jobs/search", {
        params: {
          title: searchQuery,
          findJobs,
          findCompanies,
        },
      });
      const data = response.data;

      const { jobs, companies } = data.data;

      setSearchResults({
        jobs,
        companies,
      });

      // Reset to first page when new results are fetched
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Function to handle job click
  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  // Function for loop buttons
  const handleLoopClick = (loop) => {
    console.log(`hi from ${loop}`);
  };

  // Calculate paginated results
  const getPaginatedResults = (results) => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return results.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(
    searchResults[activeTab].length / resultsPerPage
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const applyForJob = async (job) => {
    let applied = {
      job_id: job.id,
      job_seeker_id: currentUser.user.job_seeker_id,
    };
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/applied/create", applied);
      setLoading(false);
      alert("Applied Successfully");
    } catch (error) {
      setLoading(false);
      alert("Failed : You Already applied for this job");
    }
  };

  return (
    <div className="p-6">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <button
            onClick={() => handleLoopClick("loop1")}
            className="bg-gray-100 px-4 py-2 rounded-lg shadow"
          >
            loop 1
          </button>
          <button
            onClick={() => handleLoopClick("loop2")}
            className="bg-gray-100 px-4 py-2 rounded-lg shadow"
          >
            loop 2
          </button>
          <button
            onClick={() => handleLoopClick("loop3")}
            className="bg-gray-100 px-4 py-2 rounded-lg shadow"
          >
            loop 3
          </button>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        {/* Other filter inputs */}
        <div className="flex items-center justify-between">
          <form onSubmit={handleSearch} className="flex w-full space-x-4">
            <input
              type="text"
              placeholder="Enter keyword and press enter"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary-dark transition duration-300"
            >
              Search
            </button>
          </form>
        </div>

        {/* Toggles */}
        <div className="flex space-x-4 mt-4">
          <label className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={findJobs}
                onChange={() => setFindJobs(!findJobs)}
              />
              <div
                className={`block w-10 h-6 rounded-full ${
                  findJobs ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  findJobs ? "transform translate-x-4" : ""
                }`}
              ></div>
            </div>
            <span>Find jobs</span>
          </label>

          <label className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={findCompanies}
                onChange={() => setFindCompanies(!findCompanies)}
              />
              <div
                className={`block w-10 h-6 rounded-full ${
                  findCompanies ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  findCompanies ? "transform translate-x-4" : ""
                }`}
              ></div>
            </div>
            <span>Find companies</span>
          </label>

          <label className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={autoApply}
                onChange={() => setAutoApply(!autoApply)}
              />
              <div
                className={`block w-10 h-6 rounded-full ${
                  autoApply ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  autoApply ? "transform translate-x-4" : ""
                }`}
              ></div>
            </div>
            <span>Auto-apply Applications</span>
          </label>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex space-x-4">
        {/* Left: Jobs or Companies List */}
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-gray-700 mb-4">
            Search Result /{" "}
            <span className="text-green-500">
              {searchResults.jobs.length} Jobs Matches
            </span>
          </h2>
          <div className="border-b-2 mb-4 flex space-x-8">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`pb-2 ${
                activeTab === "jobs"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500"
              }`}
            >
              Jobs ({searchResults.jobs.length})
            </button>
            <button
              onClick={() => setActiveTab("companies")}
              className={`pb-2 ${
                activeTab === "companies"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500"
              }`}
            >
              Companies ({searchResults.companies.length})
            </button>
          </div>

          {/* Job or Company Cards */}
          {activeTab === "jobs" ? (
            <div className="space-y-4">
              {getPaginatedResults(searchResults.jobs).map((job, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer"
                  onClick={() => handleJobClick(job)} // Add click handler
                >
                  <h3 className="text-lg font-bold">{job.title}</h3>
                  <p className="text-sm">
                    {job.company?.name || "Unknown Company"}
                  </p>
                  <p className="text-sm text-gray-600">{job.type}</p>
                  <span className="text-xs text-gray-500">
                    {formatDate(job.posted_date)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {getPaginatedResults(searchResults.companies).map(
                (company, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg shadow"
                  >
                    <h3 className="text-lg font-bold">{company.name}</h3>
                    <p className="text-sm">{company.description}</p>
                    <span className="text-xs text-gray-500">
                      {company.jobs} Jobs
                    </span>
                  </div>
                )
              )}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-gray-200 px-4 py-2 rounded-lg shadow disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="bg-gray-200 px-4 py-2 rounded-lg shadow disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* Right: Job or Company Detail */}
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-gray-700 mb-4">Detail</h2>
          {activeTab === "jobs" && selectedJob ? (
            <div className="space-y-2">
              <h3 className="text-lg font-bold">{selectedJob.title}</h3>
              <p className="text-sm">
                {selectedJob.company?.name || "Unknown Company"}
              </p>
              <p className="text-sm">{selectedJob.type}</p>
              <p>
                <span className="text-sm font-semibold text-primary">
                  Location:{" "}
                </span>
                {selectedJob.location}
              </p>
              <span className="text-xs text-gray-500">
                {selectedJob.posted_date}
              </span>
              <p className="text-sm">{selectedJob.description}</p>
              <span className="text-xs text-gray-500">
                {selectedJob.requirements.position}
              </span>

              <p className="text-sm">
                <span className="text-sm font-semibold text-primary">
                  Education:
                </span>{" "}
                {selectedJob.requirements.qualifications.education}
              </p>
              <span className="text-xs text-gray-500">
                <span className="text-sm font-semibold text-primary">
                  Experience:
                </span>{" "}
                {selectedJob.requirements.qualifications.experience}
              </span>
              <p className="text-sm">
                <span className="text-sm font-semibold text-primary">
                  Skills:
                </span>{" "}
                {selectedJob.requirements.qualifications.skills.join(", ")}
              </p>
              <button
                disabled={loading}
                onClick={() => applyForJob(selectedJob)}
                className="bg-primary text-white px-4 py-2 rounded-lg "
              >
                Apply
              </button>
            </div>
          ) : activeTab === "companies" &&
            searchResults.companies.length > 0 ? (
            <div className="space-y-2">
              {/* Company Details */}
              <img
                className="w-20 h-20 object-cover rounded-lg mb-4"
                src={
                  selectedJob?.company?.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                }
                alt={searchResults.companies[0].name}
              />
              <h3 className="text-lg font-bold">
                {searchResults.companies[0].name}
              </h3>
              <p className="text-sm">
                {searchResults.companies[0].description}
              </p>
              <p>
                <span className="text-sm font-semibold text-primary">
                  Location:
                </span>{" "}
                {searchResults.companies[0].address}
              </p>
              <p>
                <span className="text-sm font-semibold text-primary">
                  Email:
                </span>{" "}
                {searchResults.companies[0].email}
              </p>
              <p>
                {" "}
                <span className="text-sm font-semibold text-primary">
                  Phone:
                </span>{" "}
                {searchResults.companies[0].phone}
              </p>
              <p>
                <span className="text-sm font-semibold text-primary">
                  Company Size:
                </span>{" "}
                {searchResults.companies[0].company_size}
              </p>
              <p>
                <span className="text-sm font-semibold text-primary">
                  Industry:
                </span>{" "}
                {searchResults.companies[0].industry}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Select an item to view detail
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerJobs;
