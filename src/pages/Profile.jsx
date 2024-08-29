import { useSelector } from "react-redux";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.user);

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
            {currentUser.role === "job_seeker" ? "Job Seeker" : "Company"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Information Section */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-4">General Information</h2>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Phone:</strong> {currentUser.phone}
          </p>
          <p>
            <strong>Address:</strong> {currentUser.address}
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
              <strong>Industry:</strong> {currentUser.industry}
            </p>
            <p>
              <strong>Company Size:</strong> {currentUser.companySize}
            </p>
            {/* <p>
              <strong>Open Positions:</strong>{" "}
              {currentUser.openPositions.length}
            </p> */}
          </div>
        )}
      </div>

      {/* Additional sections like Settings can be added here */}
    </div>
  );
};

export default Profile;
