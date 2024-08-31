// SubscriptionPlans.js
import { useState, useEffect } from "react";
import axios from "axios";
import { FaGift, FaMedal, FaGem } from "react-icons/fa";
import PaymentDialog from "../components/PaymentDialog";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch subscription plans from the API
    const fetchPlans = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get("/api/v1/subscription_plans/");
        const data = response.data;

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
      setIsDialogOpen(true);
    } else {
      processPlanSelection(plan.id);
    }
  };

  const processPlanSelection = async (planId) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/v1/choose_plan`, { planId });
      // Handle the response (e.g., show a success message, update UI)
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error choosing plan:", error);
      setLoading(false);
      // Optionally, set an error state or show an error message
    }
  };

  const handlePayment = async (paymentDetails) => {
    console.log("Processing payment for", selectedPlan.name, paymentDetails);
    try {
      const response = await axios.post(`/api/v1/choose_plan`, {
        planId: selectedPlan.id,
        paymentDetails,
      });
      // Handle the response (e.g., show a success message, update UI)
      console.log(response.data);
      setSelectedPlan(null); // Clear selection after successful payment
    } catch (error) {
      console.error("Error processing payment:", error);
      // Optionally, set an error state or show an error message
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
                {/* Choose an icon based on the plan type */}
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

      {/* Payment Dialog */}
      <PaymentDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handlePayment}
        plan={selectedPlan}
      />
    </div>
  );
};

export default SubscriptionPlans;
