import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiFillDelete, AiOutlineProfile } from "react-icons/ai";
import StarRating from "../components/sections/StarRating";

const JobDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [job, setJob] = useState(null);
  const [seekers, setSeekers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        // Fetch applied seekers for the job
        const response = await axios.get(`/api/v1/applied/getByJobId/${id}`);
        const appliedData = response.data.data;

        if (appliedData.success === false) throw new Error(appliedData.message);

        // Extract seeker details from the applied data
        const seekerPromises = appliedData.map(async (applied) => {
          // Fetch user data based on job_seeker_id
          const userResponse = await axios.get(
            `/api/v1/users/${applied.seeker.user_id}`
          );
          const userData = userResponse.data.data;
          return { ...applied.seeker, ...userData }; // Combine seeker and user data
        });

        // Wait for all user data to be fetched and merged
        const seekersWithUserData = await Promise.all(seekerPromises);

        setSeekers(seekersWithUserData); // Update seekers state
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleRatingChange = (seekerId, newRating) => {
    setSeekers((prevSeekers) =>
      prevSeekers.map((seeker) =>
        seeker.id === seekerId ? { ...seeker, hrEvaluation: newRating } : seeker
      )
    );
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Jobs Details Table</h1>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl text-red-500">
          Something went wrong
        </p>
      )}

      <div className="flex items-end justify-end">
        <button
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-violet-950 mb-4"
          //   onClick={handleAddJobClick}
        >
          Send
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-center text-sm font-semibold text-gray-700 uppercase">
              Candidate
            </th>
            <th className="py-3 px-6 bg-gray-100 text-center text-sm font-semibold text-gray-700 uppercase">
              Hr Evaluation
            </th>
            <th className="py-3 px-6 bg-gray-100 text-center text-sm font-semibold text-gray-700 uppercase">
              Send For Evaluation
            </th>
            <th className="py-3 px-6 bg-gray-100 text-center text-sm font-semibold text-gray-700 uppercase">
              Send Invitation
            </th>
            <th className="py-3 px-6 bg-gray-100 text-center text-sm font-semibold text-gray-700 uppercase">
              Options
            </th>
          </tr>
        </thead>

        <tbody>
          {seekers.map((seeker) => (
            <tr key={seeker.id}>
              {console.log(seeker)}

              <td className="py-6 px-6 text-sm text-gray-700 whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <img
                    className="w-14 h-14 rounded-full"
                    src={`http://localhost:3000/uploads/${seeker.photo}`}
                    alt="candidate_image"
                  />
                  <p className="ml-2">
                    {seeker.first_name} {seeker.last_name}
                  </p>
                </div>
              </td>
              <td className="py-3 px-6 text-sm text-gray-700 whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <StarRating
                    rating={seeker.hrEvaluation || 0}
                    onRatingChange={(newRating) =>
                      handleRatingChange(seeker.id, newRating)
                    }
                  />
                </div>
              </td>
              <td className="py-3 px-6 text-sm text-gray-700 whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6" // Size of the checkbox
                    name=""
                    id=""
                    value=""
                  />
                </div>
              </td>

              <td className="py-3 px-6 text-sm text-gray-700 whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6" // Size of the checkbox
                    name=""
                    id=""
                    value=""
                  />
                </div>
              </td>

              <td className="py-3 px-6 text-sm text-gray-700 whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <AiOutlineProfile
                    title="View Profile"
                    className="text-green-400 text-xl hover:text-green-600 mr-2 cursor-pointer"
                    // onClick={() => handleViewProfileClick(seeker.id)}
                  >
                    View
                  </AiOutlineProfile>

                  <AiFillDelete
                    title="Delete Job"
                    className="text-red-400 text-xl hover:text-red-600 mr-2 cursor-pointer"
                    // onClick={() => handleDeleteJobClick(job.id)}
                  >
                    Delete
                  </AiFillDelete>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default JobDetails;
