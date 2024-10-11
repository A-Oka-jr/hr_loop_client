import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "../components/sections/StarRating";
import SeekerProfileDialog from "../components/dialogs/SeekerProfileDialog";
import SendEvaluationAndInvitationDialog from "../components/dialogs/SendEvaluationAndInvitationDialog";
import { AiFillDelete, AiOutlineProfile } from "react-icons/ai";

const SeekersResults = () => {
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the id from the URL
  const [selectedSeeker, setSelectedSeeker] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false); // Manage Send Dialog open state
  const [selectedSeekers, setSelectedSeekers] = useState([]); // Manage selected seekers for send dialog

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/v1/search/${id}`);
        const data = response.data.data;

        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setLoading(false);
        setSearch(data);
        if (data && data.results && data.results.length > 0) {
          const users = data.seekers.map(async (seeker) => {
            const userResponse = await axios.get(
              `/api/v1/users/${seeker.user_id}`
            );
            const userData = userResponse.data.data;
            return {
              ...seeker,
              ...userData,
              sendForEvaluation: false,
              sendInvitation: false,
              hrEvaluation: 0, // Initialize hrEvaluation as 0
            };
          });
          const seekerPromises = await Promise.all(users);
          setSeekers(seekerPromises);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [id]);

  // Handle HR Evaluation Rating Change
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

  // Function to close the profile dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSeeker(null);
  };

  // Handle checkbox changes for "Send for Evaluation" and "Send Invitation"
  const handleCheckboxChange = (seekerId, field) => {
    setSeekers((prevSeekers) =>
      prevSeekers.map((seeker) =>
        seeker.id === seekerId
          ? {
              ...seeker,
              [field]: !seeker[field], // Toggle the value of the field (sendForEvaluation or sendInvitation)
            }
          : seeker
      )
    );
  };

  // Handle Send button click
  const handleSendClick = () => {
    const selected = seekers
      .filter((seeker) => seeker.sendForEvaluation || seeker.sendInvitation)
      .map((seeker) => ({
        id: seeker.id,
        name: `${seeker.first_name} ${seeker.last_name}`,
        email: seeker.email,
        address: seeker.address || "",
        skills: seeker.skills || [],
        education: seeker.education || "",
        experience: seeker.experience || 0,
        hrEvaluation: seeker.hrEvaluation || 0,
        sendForEvaluation: seeker.sendForEvaluation,
        sendInvitation: seeker.sendInvitation,
      }));
    setSelectedSeekers(selected);
    setSendDialogOpen(true);
  };

  // Close the send dialog
  const handleCloseSendDialog = () => {
    setSendDialogOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          onClick={handleSendClick} // Handle send button click
        >
          Send
        </button>
      </div>
      <div>
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
                      className="w-6 h-6"
                      checked={seeker.sendForEvaluation}
                      onChange={() =>
                        handleCheckboxChange(seeker.id, "sendForEvaluation")
                      }
                    />
                  </div>
                </td>

                <td className="py-3 px-6 text-sm text-gray-700 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="w-6 h-6"
                      checked={seeker.sendInvitation}
                      onChange={() =>
                        handleCheckboxChange(seeker.id, "sendInvitation")
                      }
                    />
                  </div>
                </td>

                <td className="py-3 px-6 text-sm text-gray-700 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <AiOutlineProfile
                      size={22}
                      onClick={() => handleViewProfileClick(seeker)}
                    />
                    <AiFillDelete size={22} className="ml-4" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SeekerProfileDialog
        seeker={selectedSeeker}
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
      />

      <SendEvaluationAndInvitationDialog
        open={sendDialogOpen}
        onClose={handleCloseSendDialog}
        selectedSeekers={selectedSeekers} // Pass the selected seekers to the dialog
      />
    </>
  );
};

export default SeekersResults;
