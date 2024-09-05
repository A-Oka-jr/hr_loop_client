import { useState, useEffect } from "react";
import axios from "axios";
import { FaGift, FaMedal, FaGem } from "react-icons/fa";
import PaymentDialog from "../components/dialogs/PaymentDialog";
import CompanyDetailsDialog from "../components/dialogs/CompanyDetailsDialog";
import { useSelector, useDispatch } from "react-redux";
import { updateUserRole } from "../redux/user/userSlice"; // Import your action to update the role

const SubscriptionPlans = () => {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
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
    if (plan.type === "premium" || plan.type === "professional") {
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
        setCompanyId(response.data.company.id); // Store the company_id
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
    paymentDetails.amount = selectedPlan.price; // Pass the plan amount
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
      setSelectedPlan(null); // Clear selection after successful payment
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const handleCloseDialogs = () => {
    setIsCompanyDialogOpen(false);
    setIsPaymentDialogOpen(false);
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
              <p className="mt-4 text-center text-gray-500">
                {plan.description}
              </p>
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
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
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
    </div>
  );
};

export default SubscriptionPlans;
