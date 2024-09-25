import axios from 'axios';

// Generate a Razorpay order by calling the  backend api 
export const createRazorpayOrder = async (amount) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/createRazorpayOrder',  //  backend API for creating Razorpay order
      {
        amount: amount, // Amount in paise (₹1 = 100 paise)
      }
    );
    return response.data;  // Razorpay order details returned from the backend
  } catch (error) {
    console.error('Error generating Razorpay order:', error);
    throw error;
  }
};

// Open Razorpay payment UI

export const openRazorpayPayment = (orderId, amount, user, onSuccess, onFailure) => {
  const options = {
    key: 'rzp_test_VBFdlG4BxZE1Bi',  // Razorpay test key ID
    amount: amount, // Do NOT multiply Backend is Converting into Rupee
    currency: 'INR',
    name: 'Trackidooo',//Your Company Name 
    description: 'Payment for your order',
    order_id: orderId,  // Razorpay order ID from the backend
    handler: (response) => {
      if (onSuccess) {
        onSuccess(response);
      }
    },
    prefill: {
      name: user.displayName,
      email: user.email,
      contact: user.phoneNumber,
    },
    notes: {
      address: 'Your company address here',
    },
    theme: {
      color: '#F37254',
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on('payment.failed', (response) => {
    if (onFailure) {
      onFailure(response);
    }
  });

  rzp.open();
};


// Load Razorpay SDK
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
