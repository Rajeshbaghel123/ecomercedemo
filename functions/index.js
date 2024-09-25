// Firebase functions and admin SDK
const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors");

const RAZORPAY_KEY = "rzp_test_VBFdlG4BxZE1Bi";
const RAZORPAY_SECRET = "wCYCd5dQcvC2qr1iQ6ZegSUl";

const createRazorpayOrder = async (amount) => {
  try {
    const response = await axios.post(
        "https://api.razorpay.com/v1/orders",
        {
          amount: amount * 100, // Convert amount to paise (₹1 = 100 paise)
          currency: "INR",
          payment_capture: 1, // Automatically capture
        },
        {
          auth: {
            username: RAZORPAY_KEY,
            password: RAZORPAY_SECRET,
          },
        },
    );
    return response.data; // Return the Razorpay order data
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new functions.https.HttpsError(
        "internal",
        "Failed to create Razorpay order",
        error,
    );
  }
};

// Cloud Function to create Razorpay order
exports.createRazorpayOrder = functions.https.onRequest((req, res) => {
  cors()(req, res, async () => {
    const {amount} = req.body;

    try {
      const order = await createRazorpayOrder(amount);
      res.status(200).json(order); // Return the order details to the frontend
    } catch (error) {
      console.error("Error processing the request:", error);
      res.status(500).json({message: "Failed to create Razorpay order", error});
    }
  });
});
