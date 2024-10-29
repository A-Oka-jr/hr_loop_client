import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiFillDelete, AiOutlineProfile } from "react-icons/ai";
import StarRating from "../components/sections/StarRating";
import SeekerProfileDialog from "../components/dialogs/SeekerProfileDialog";
import SendEvaluationAndInvitationDialog from "../components/dialogs/SendEvaluationAndInvitationDialog"; // Import your dialog

const Evaluation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [seekers, setSeekers] = useState([]);
  const { id } = useParams();
  const [selectedSeeker, setSelectedSeeker] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false); // Manage Send Dialog open state
  const [selectedSeekers, setSelectedSeekers] = useState([]); // Manage selected seekers for send dialog

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
          return {
            appliedId: applied.id,
            hrEvaluation: applied.hr_evaluation,
            departmentEvaluation: applied.department_evaluations,
            sendForEvaluation: applied.send_for_evaluation,
            sendInvitation: applied.send_invitation,
            ...applied.seeker,
            ...userData,
          };
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

  const handleRatingChange = (seekerId, field, newRating) => {
    setSeekers((prevSeekers) =>
      prevSeekers.map((seeker) =>
        seeker.id === seekerId
          ? {
              ...seeker,
              [field]: newRating,
            }
          : seeker
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

  const handleCheckboxChange = (seekerId, field) => {
    setSeekers((prevSeekers) =>
      prevSeekers.map((seeker) =>
        seeker.id === seekerId
          ? {
              ...seeker,
              sendForEvaluation: field === "sendForEvaluation" ? true : false,
              sendInvitation: field === "sendInvitation" ? true : false,
            }
          : seeker
      )
    );
  };

  // Handle Send button click
  const handleSendClick = async () => {
    const selected = seekers
      .filter((seeker) => seeker.sendForEvaluation || seeker.sendInvitation)
      .map((seeker) => ({
        id: seeker.id,
        appliedId: seeker.appliedId,
        name: `${seeker.first_name} ${seeker.last_name}`,
        email: seeker.email,
        address: seeker.address || "",
        skills: seeker.skills || [],
        education: seeker.education || "",
        experience: seeker.experience || 0,
        hr_evaluation: seeker.hrEvaluation || 0,
        department_evaluations: seeker.departmentEvaluation || 0,
        sendForEvaluation: seeker.sendForEvaluation,
        sendInvitation: seeker.sendInvitation,
      }));

    console.log("selected", selected);
    sendEvaluation(selected);
    // setSelectedSeekers(selected);
    // setSendDialogOpen(true);
  };

  const sendEvaluation = async (selectedSeekers) => {
    setLoading(true);
    setError(false);
    const data = await axios.put(
      `/api/v1/applied/update/${id}`,
      selectedSeekers
    );
    try {
      setLoading(false);
      console.log(data.data);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
    setSendDialogOpen(false);
  };

  // Close the send dialog
  // const handleCloseSendDialog = () => {
  //   setSendDialogOpen(false);
  // };

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
              Department Evaluation
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
                    src={`http://87.106.35.124/uploads/${seeker.photo}`}
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
                    rating={seeker.hrEvaluation || 0} // First StarRating for hrEvaluation
                    onRatingChange={(newRating) =>
                      handleRatingChange(seeker.id, "hrEvaluation", newRating)
                    }
                  />
                </div>
              </td>
              <td className="py-3 px-6 text-sm text-gray-700 whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <StarRating
                    rating={seeker.departmentEvaluation || 0} // Second StarRating for departmentEvaluation
                    onRatingChange={(newRating) =>
                      handleRatingChange(
                        seeker.id,
                        "departmentEvaluation",
                        newRating
                      )
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
                <div className="flex items-center justify-center gap-5">
                  <AiOutlineProfile
                    className="text-2xl text-primary cursor-pointer"
                    onClick={() => handleViewProfileClick(seeker)}
                  />
                  <AiFillDelete className="text-2xl text-red-500 cursor-pointer" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSeeker && (
        <SeekerProfileDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          seeker={selectedSeeker}
        />
      )}

      {/* Include the new Send Evaluation dialog */}
      {/* <SendEvaluationAndInvitationDialog
        open={sendDialogOpen}
        onClose={handleCloseSendDialog}
        selectedSeekers={selectedSeekers}
        jobId={id}
      /> */}
    </>
  );
};

export default Evaluation;
