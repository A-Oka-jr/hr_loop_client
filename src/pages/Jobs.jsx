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

      {activeTab === "findCandidates" && <FindCandidates />}
    </div>
  );
};

export default Jobs;
