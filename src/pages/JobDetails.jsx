import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiFillDelete, AiOutlineProfile } from "react-icons/ai";
import StarRating from "../components/sections/StarRating";
import SeekerProfileDialog from "../components/dialogs/SeekerProfileDialog";

const JobDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [seekers, setSeekers] = useState([]);
  const { id } = useParams();
  const [selectedSeeker, setSelectedSeeker] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`/api/v1/applied/getByJobId/${id}`);
        const appliedData = response.data.data;

        if (appliedData.success === false) throw new Error(appliedData.message);

        const seekerPromises = appliedData.map(async (applied) => {
          // Fetch user data based on job_seeker_id
          const userResponse = await axios.get(
            `/api/v1/users/${applied.seeker.user_id}`
          );
          const userData = userResponse.data.data;
          return { ...applied.seeker, ...userData };
        });

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

  const handleViewProfileClick = (seeker) => {
    setSelectedSeeker(seeker);
    setDialogOpen(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSeeker(null);
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
          {seekers.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="py-6 px-6 text-sm text-gray-700 whitespace-nowrap"
              >
                No seekers applied for this job
              </td>
            </tr>
          )}
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
                    onClick={() => handleViewProfileClick(seeker)}
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

      <SeekerProfileDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        seeker={selectedSeeker}
      />
    </>
  );
};

export default JobDetails;
