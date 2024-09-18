// PaymentDialog.js
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const PaymentDialog = ({ isOpen, onClose, onConfirm, plan }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFadeIn(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setFadeIn(false);
    setTimeout(() => onClose(), 300); // Match the fade-out duration
  };

  const handleConfirm = () => {
    // Basic validation could be added here
    if (!cardNumber || !expiryDate || !cvv || !name) {
      alert("Please fill in all fields.");
      return;
    }

    onConfirm({ cardNumber, expiryDate, cvv, name });
    handleClose();
  };

  return isOpen ? (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
          fadeIn ? "scale-100" : "scale-95"
        }`}
        style={{ width: "400px" }} // Adjust width as needed
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Proceed to Payment
        </h3>
        <p className="text-gray-700 mb-6">
          You have selected the {plan?.name} plan. Please enter your payment
          details to complete the purchase.
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cardNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Card Number
            </label>
            <input
              type="number"
              id="cardNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="expiryDate"
                className="block text-gray-700 font-medium mb-2"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="MM/YY"
                maxLength="5"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="cvv"
                className="block text-gray-700 font-medium mb-2"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="123"
                maxLength="3"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              onClick={handleConfirm}
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

PaymentDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  plan: PropTypes.object,
};

export default PaymentDialog;
