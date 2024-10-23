import { useState } from "react";
import axios from "axios"; // Make sure to import axios

const SendEvaluationAndInvitationDialog = ({
  open,
  onClose,
  selectedSeekers,
  jobId,
}) => {
  console.log("selectedSeekers", selectedSeekers);

  // State for invitation form
  const [subject, setSubject] = useState("");
  const [address, setAddress] = useState("");

  // State for evaluation emails
  const [evaluationEmails, setEvaluationEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");

  // Handle email input and adding emails on Enter
  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter" && emailInput.trim()) {
      setEvaluationEmails([...evaluationEmails, emailInput.trim()]);
      setEmailInput(""); // Clear input
    }
  };

  // Handle removing an email
  const handleRemoveEmail = (indexToRemove) => {
    setEvaluationEmails(
      evaluationEmails.filter((_, index) => index !== indexToRemove)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const invitationData = {
      subject,
      address,
      seekers: selectedSeekers
        .filter((seeker) => seeker.sendInvitation)
        .map((seeker) => ({
          appliedId: seeker.appliedId,
          email: seeker.email, // Include the seeker's email
          hr_evaluation: seeker.hrEvaluation, // Include the HR evaluation for each seeker
          send_for_evaluation: seeker.sendForEvaluation,
          send_invitation: seeker.sendInvitation,
          seeker_id: seeker.id,
        })),
    };
    const evaluationData = {
      seekers: selectedSeekers
        .filter((seeker) => seeker.sendForEvaluation)
        .map((seeker) => ({
          appliedId: seeker.appliedId,
          hr_evaluation: seeker.hrEvaluation,
          send_for_evaluation: seeker.sendForEvaluation,
        })),
      emails: evaluationEmails.filter((email) =>
        selectedSeekers.some((seeker) => seeker.sendForEvaluation)
      ),
    };

    try {
      // Send invitation data to the API
      if (invitationData.seekers.length > 0) {
        await axios.post(
          `/api/v1/emails/send-invitation/${jobId}`,
          invitationData
        );
        console.log("Invitation sent:", invitationData);
      }

      // Send evaluation data to the API
      if (evaluationData.emails.length > 0) {
        console.log(evaluationData);

        await axios.post(
          `/api/v1/emails/send-evaluation/${jobId}`,
          evaluationData
        );
        console.log("Evaluation request sent:", evaluationData);
      }

      // Close the dialog after submission
      onClose();
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle the error (e.g., show a notification)
    }
  };

  if (!open) return null; // If the dialog is not open, render nothing

  // Check if any selected seeker has sendInvitation or sendForEvaluation true
  const anyForEvaluation = selectedSeekers.some(
    (seeker) => seeker.sendForEvaluation
  );
  const anyForInvitation = selectedSeekers.some(
    (seeker) => seeker.sendInvitation
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          Send Evaluation and Invitation
        </h2>

        {/* Render Invitation Form if needed */}
        {anyForInvitation && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Invitation</h3>
            <label className="block text-sm mb-2">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-6"
            />

            <label className="block text-sm mb-2">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        )}

        {/* Render Evaluation Form if needed */}
        {anyForEvaluation && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Evaluation</h3>
            <label className="block text-sm mb-1">
              Emails (Press Enter to add):
            </label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={handleEmailKeyDown}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Display added emails */}
            <div className="flex flex-wrap gap-2">
              {evaluationEmails.map((email, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                >
                  {email}
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveEmail(index)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white py-2 px-4 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendEvaluationAndInvitationDialog;
