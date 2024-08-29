import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/login";
    }
    const getCompanyProfile = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await axios.get(
          `/api/v1/company/get_by_id/${currentUser.user.company_id}`
        );

        const data = response;

        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          setError(true);
          return;
        }
        setLoading(false);
        setCompany(data.data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    if (currentUser.user.role === "company_user") {
      getCompanyProfile();
    }
  }, [currentUser.user.company_id]);

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={currentUser.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h1 className="text-3xl font-bold">{currentUser.name}</h1>
          <span className="text-blue-500">
            {currentUser.role === "job_seeker" ? "Job Seeker" : company.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Information Section */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-4">General Information</h2>
          <p>
            <strong>Email:</strong> {company.email}
          </p>
          <p>
            <strong>Phone:</strong> {company.phone}
          </p>
          <p>
            <strong>Address:</strong> {company.address}
          </p>
        </div>

        {/* Role-Specific Section */}
        {currentUser.role === "job_seeker" ? (
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Job Preferences</h2>
            <p>
              <strong>Preferred Job Titles:</strong>{" "}
              {currentUser.jobPreferences.titles.join(", ")}
            </p>
            <p>
              <strong>Preferred Locations:</strong>{" "}
              {currentUser.jobPreferences.locations.join(", ")}
            </p>
            <p>
              <strong>Skills:</strong> {currentUser.skills.join(", ")}
            </p>
            <p>
              <strong>Experience:</strong> {currentUser.experience} years
            </p>
          </div>
        ) : (
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Company Overview</h2>
            <p>
              <strong>Industry:</strong> {company.industry}
            </p>
            <p>
              <strong>Company Size:</strong> {company.companySize}
            </p>
            {/* <p>
              <strong>Open Positions:</strong>{" "}
              {company.openPositions.length}
            </p> */}
          </div>
        )}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit
        </button>
      </div>

      {/* Additional sections like Settings can be added here */}
    </div>
  );
};

export default Profile;
