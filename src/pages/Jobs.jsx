import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PostJob from "../components/PostJob";
import FindCandidates from "../components/FindCandidates";
import axios from "axios";

const Jobs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("postJob");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [requests, setRequests] = useState([]);

  // Pagination states for requests (candidates)
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        if (activeTab === "postJob") {
          const response = await axios.get(
            `/api/v1/jobs/get_by_company_id/${currentUser.user.company_id}`
          );
          const data = response.data.data;
          if (data.success === false) throw new Error(data.message);
          setJobs(data);
        } else if (activeTab === "findCandidates") {
          const response = await axios.get(
            `/api/v1/search/getSearchesByCompanyId/${currentUser.user.company_id}`
          );
          const data = response.data.data;
          if (data.success === false) throw new Error(data.message);
          setRequests(data);
        }
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, activeTab]);

  // Pagination logic for requests
  const paginatedRequests = requests.slice(
    (currentPage - 1) * requestsPerPage,
    currentPage * requestsPerPage
  );
  const totalPages = Math.ceil(requests.length / requestsPerPage);

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
        <PostJob
          currentUser={currentUser}
          setError={setError}
          setLoading={setLoading}
          jobs={jobs}
          setJobs={setJobs}
          loading={loading}
          error={error}
        />
      )}

      {activeTab === "findCandidates" && (
        <FindCandidates
          currentUser={currentUser}
          setError={setError}
          setLoading={setLoading}
          requests={paginatedRequests}
          setRequests={setRequests}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default Jobs;
