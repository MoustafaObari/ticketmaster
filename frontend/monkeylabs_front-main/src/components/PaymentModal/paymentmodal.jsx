import React, { useEffect, useState } from "react";
import "./paymentmodal.css";
import axios from "../../axiosConfig";

const PaymentModal = ({ isOpen, onClose, ticketId }) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "/login";
  }
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State for loading animation
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Card Number Validation
    if (!formData.cardNumber) {
      formErrors.cardNumber = "Card number is required";
      isValid = false;
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
      formErrors.cardNumber = "Card number must be 16 digits";
      isValid = false;
    }

    // Card Holder Validation
    if (!formData.cardHolder) {
      formErrors.cardHolder = "Card holder name is required";
      isValid = false;
    }

    // Expiry Date Validation
    if (!formData.expiryDate) {
      formErrors.expiryDate = "Expiry date is required";
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      formErrors.expiryDate = "Expiry date must be in MM/YY format";
      isValid = false;
    }

    // CVV Validation
    if (!formData.cvv) {
      formErrors.cvv = "CVV is required";
      isValid = false;
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      formErrors.cvv = "CVV must be 3 digits";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      const paymentData = {
        userId,
        ticketId,
        cardNumber: formData.cardNumber,
        cardHolder: formData.cardHolder,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
      };

      try {
        const response = await axios.post("/api/orders", paymentData);
        console.log("Payment Response:", response.data);
        setPaymentSuccess(true); // Set payment success state
        // Handle successful payment here
      } catch (error) {
        console.error("Payment Error:", error);
        // Handle error here (e.g., display error message)
      } finally {
        setIsLoading(false);
      }

      setTimeout(() => {
        setIsLoading(false);
        // onClose();
        // Here, handle the actual form submission logic
      }, 2000);
      //   onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-header">
          <h3>Payment</h3>
          <button onClick={onClose} className="modal-close-button">
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Processing...</p>
            </div>
          ) : paymentSuccess ? ( // Check if payment was successful
            <div className="payment-success">
              <div className="success-icon">✓</div>
              <p>Payment successful!</p>
              <button onClick={onClose} className="btn btn-success">
                Close
              </button>
            </div>
          ) : ticketId ? (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="ticketId" value={ticketId} />
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234567890123456"
                />
                {errors.cardNumber && (
                  <p className="error">{errors.cardNumber}</p>
                )}

                <label htmlFor="cardHolder">Card Holder</label>
                <input
                  type="text"
                  className="form-control"
                  id="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  placeholder="Enter card holder name"
                />
                {errors.cardHolder && (
                  <p className="error">{errors.cardHolder}</p>
                )}

                <div className="row">
                  <div className="col">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && (
                      <p className="error">{errors.expiryDate}</p>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="CVV"
                    />
                    {errors.cvv && <p className="error">{errors.cvv}</p>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h4>Ticket ID is required</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
