import { useState } from "react";

const JobSeekerJobs = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [findJobs, setFindJobs] = useState(false);
  const [findCompanies, setFindCompanies] = useState(false);
  const [autoApply, setAutoApply] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    jobs: [],
    companies: [],
  });

  // Mocked job and company data with company_id
  const mockData = {
    jobs: [
      {
        title: "ASP.NET Developer",
        company_id: 1,
        type: "full time",
        posted: "3 hrs ago",
      },
      {
        title: "React Developer",
        company_id: 2,
        type: "part time",
        posted: "1 day ago",
      },
    ],
    companies: [
      { id: 1, name: "MetaNas", description: "Technology Company", jobs: 4 },
      {
        id: 2,
        name: "TechCorp",
        description: "Software Development Company",
        jobs: 2,
      },
    ],
  };

  // Function to handle search
  const handleSearch = () => {
    if (!findJobs && !findCompanies) {
      setSearchResults({
        jobs: [],
        companies: [],
      });
      return;
    }

    let filteredJobs = [];
    let filteredCompanies = [];

    if (findJobs) {
      // Filter jobs based on the search query
      filteredJobs = mockData.jobs
        .filter((job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((job) => {
          const company = mockData.companies.find(
            (company) => company.id === job.company_id
          );
          return { ...job, company }; // Attach the company details to the job
        });

      // If searching for jobs, also show related companies
      const relatedCompanies = mockData.companies.filter((company) =>
        filteredJobs.some((job) => job.company_id === company.id)
      );

      setSearchResults({
        jobs: filteredJobs,
        companies: relatedCompanies,
      });
    }

    if (findCompanies) {
      // Filter companies based on the search query
      filteredCompanies = mockData.companies
        .filter((company) =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((company) => {
          const jobs = mockData.jobs.filter(
            (job) => job.company_id === company.id
          );
          return { ...company, jobs }; // Attach the jobs details to the company
        });

      // If searching for companies, also show related jobs
      const relatedJobs = mockData.jobs.filter((job) =>
        filteredCompanies.some((company) => company.id === job.company_id)
      );

      setSearchResults({
        jobs: relatedJobs,
        companies: filteredCompanies,
      });
    }
  };

  // Function for loop buttons
  const handleLoopClick = (loop) => {
    console.log(`hi from ${loop}`);
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">Date post</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300">
              <option>last 24 hours</option>
              <option>last 7 days</option>
              <option>last 30 days</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Job type</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 ">
              <option>full time</option>
              <option>part time</option>
              <option>internship</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              placeholder="Country"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Job language</label>
            <input
              type="text"
              placeholder="Language"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Search Input */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="enter keyword and press enter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-gray-300 rounded-md px-4 py-2"
          />
          <button
            onClick={handleSearch}
            className="ml-4 bg-primary text-white px-4 py-2 rounded-lg shadow"
          >
            Search
          </button>
        </div>

        {/* Toggles */}
        <div className="flex space-x-4 mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={findJobs}
              onChange={() => setFindJobs(!findJobs)}
            />
            <span>Find jobs</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={findCompanies}
              onChange={() => setFindCompanies(!findCompanies)}
            />
            <span>Find companies</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={autoApply}
              onChange={() => setAutoApply(!autoApply)}
            />
            <span>Auto-apply Applications</span>
          </label>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex space-x-4">
        {/* Left: Jobs or Companies List */}
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-gray-700 mb-4">
            Search Result /{" "}
            <span className="text-green-500">
              {searchResults.jobs.length + searchResults.companies.length}{" "}
              Matches
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
              {searchResults.jobs.map((job, index) => {
                const company = mockData.companies.find(
                  (c) => c.id === job.company_id
                );
                return (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg shadow"
                  >
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-sm">
                      {company ? company.name : "Unknown Company"}
                    </p>
                    <p className="text-sm text-gray-600">{job.type}</p>
                    <span className="text-xs text-gray-500">{job.posted}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.companies.map((company, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-bold">{company.name}</h3>
                  <p className="text-sm">{company.description}</p>
                  <span className="text-xs text-gray-500">
                    {company.jobs} Jobs
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Job or Company Detail */}
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-gray-700 mb-4">Detail</h2>
          {activeTab === "jobs" && searchResults.jobs.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-lg font-bold">
                {searchResults.jobs[0].title}
              </h3>
              <p className="text-sm">
                {
                  mockData.companies.find(
                    (c) => c.id === searchResults.jobs[0].company_id
                  ).name
                }
              </p>
              <p className="text-sm">{searchResults.jobs[0].type}</p>
              <span className="text-xs text-gray-500">
                {searchResults.jobs[0].posted}
              </span>
            </div>
          ) : activeTab === "companies" &&
            searchResults.companies.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-lg font-bold">
                {searchResults.companies[0].name}
              </h3>
              <p className="text-sm">
                {searchResults.companies[0].description}
              </p>
              <span className="text-xs text-gray-500">
                {searchResults.companies[0].jobs} Jobs
              </span>
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
