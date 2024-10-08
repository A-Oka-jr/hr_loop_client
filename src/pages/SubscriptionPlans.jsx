import { useState, useEffect } from "react";
import axios from "axios";
import { FaGift, FaMedal, FaGem } from "react-icons/fa";
import PaymentDialog from "../components/dialogs/PaymentDialog";
import CompanyDetailsDialog from "../components/dialogs/CompanyDetailsDialog";
import AddJobseekerDialog from "../components/dialogs/AddJobseekerDialog";
import { useSelector, useDispatch } from "react-redux";
import { updateUserRole } from "../redux/user/userSlice";

const SubscriptionPlans = () => {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isJobseekerDialogOpen, setIsJobseekerDialogOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPlans = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get("/api/v1/subscription_plans/");
        const data = response.data.data;

        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          setError(true);
          return;
        }

        setLoading(false);
        setPlans(data);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };

    fetchPlans();
  }, []);

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    if (plan.type === "free") {
      setIsJobseekerDialogOpen(true);
    } else if (plan.type === "premium" || plan.type === "professional") {
      setIsCompanyDialogOpen(true);
    } else {
      processPlanSelection(plan.id);
    }
  };

  const processPlanSelection = async (planId) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/v1/payments/create`, { planId });
      setLoading(false);
    } catch (error) {
      console.error("Error choosing plan:", error);
      setLoading(false);
    }
  };

  const handleCompanyDetailsSubmit = async (companyDetails) => {
    setError(null);
    companyDetails.user_id = currentUser.user.id;
    companyDetails.subscription_plan_id = selectedPlan.id;
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/v1/company/create",
        companyDetails
      );

      if (response.data.success) {
        setCompanyId(response.data.company.id);
        setIsCompanyDialogOpen(false);
        setIsPaymentDialogOpen(true);
      } else {
        setError(response.data.message);
        console.error("Error creating company:", response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error creating company:", error);
      setLoading(false);
    }
  };

  const handlePayment = async (paymentDetails) => {
    paymentDetails.company_id = companyId;
    paymentDetails.subscription_plan_id = selectedPlan.id;
    paymentDetails.amount = selectedPlan.price;
    paymentDetails.status = "success";

    try {
      const response = await axios.post(
        `/api/v1/payments/create`,
        paymentDetails
      );

      if (response.data.success) {
        console.log("Payment successful:");

        const newRole = "company_user";
        dispatch(updateUserRole(newRole));

        const updatedUser = {
          ...currentUser.user,
          role: newRole,
        };
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ user: updatedUser })
        );
      } else {
        console.error("Error processing payment:", response.data.message);
      }
      setSelectedPlan(null);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const handleJobseekerSubmit = async (jobseekerData) => {
    jobseekerData.user_id = currentUser.user.id;
    console.log(jobseekerData);

    try {
      const response = await axios.post(
        "/api/v1/jobSeekers/create",
        jobseekerData
      );

      if (response.data.success) {
        console.log("Jobseeker details submitted successfully!");
        setIsJobseekerDialogOpen(false);
        const newRole = "job_seeker";
        const jobSeeker = response.data.jobSeeker;
        dispatch(updateUserRole(newRole, jobSeeker));

        const updatedUser = {
          ...currentUser.user,
          role: newRole,
          job_seeker_id: jobSeeker,
        };
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ user: updatedUser })
        );
      } else {
        console.error(
          "Error submitting jobseeker details:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error submitting jobseeker details:", error);
    }
  };

  const handleCloseDialogs = () => {
    setIsCompanyDialogOpen(false);
    setIsPaymentDialogOpen(false);
    setIsJobseekerDialogOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Choose Your Plan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-center">
                {plan.type === "free" && (
                  <FaGift className="text-indigo-600 text-4xl" />
                )}
                {plan.type === "professional" && (
                  <FaMedal className="text-pink-500 text-4xl" />
                )}
                {plan.type === "premium" && (
                  <FaGem className="text-yellow-500 text-4xl" />
                )}
              </div>
              <h3 className="mt-6 text-center text-xl font-semibold text-gray-900">
                {plan.name}
              </h3>
              {console.log(plan.description)}
              <div className="mt-4 text-left text-gray-500">
                <div
                  className="list-decimal pl-6"
                  dangerouslySetInnerHTML={{ __html: plan.description }}
                />
              </div>
              <div className="mt-6 text-center">
                <span className="text-2xl font-extrabold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-base font-medium text-gray-500">
                  /{plan.duration}
                </span>
              </div>
              <div className="mt-8">
                <button
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:opacity-90"
                  onClick={() => handleChoosePlan(plan)}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Company Details Dialog */}
      <CompanyDetailsDialog
        isOpen={isCompanyDialogOpen}
        onClose={handleCloseDialogs}
        onNext={handleCompanyDetailsSubmit}
      />

      {/* Payment Dialog */}
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={handleCloseDialogs}
        onConfirm={handlePayment}
        plan={selectedPlan}
      />

      {/* Add Jobseeker Dialog */}
      <AddJobseekerDialog
        isOpen={isJobseekerDialogOpen}
        onClose={handleCloseDialogs}
        onSubmit={handleJobseekerSubmit}
      />
    </div>
  );
};

export default SubscriptionPlans;
