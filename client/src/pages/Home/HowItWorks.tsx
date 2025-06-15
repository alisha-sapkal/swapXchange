import React from "react";
import axios from "axios";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Secure the Payment",
      description: "Buyer deposits money into SecureSwap's secure escrow account.",
      icon: "🛡️",
    },
    {
      id: 2,
      title: "Complete the Exchange",
      description: "Seller delivers the item or service as agreed upon.",
      icon: "📱",
    },
    {
      id: 3,
      title: "Release the Funds",
      description: "Once both parties confirm satisfaction, payment is released to the seller.",
      icon: "💸",
    },
  ];

  const sendToBackend = async () => {
    try {
      const response = await axios.post("https://your-backend-api.com/how-it-works", { steps });
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  React.useEffect(() => {
    sendToBackend();
  }, []);

  return (
    <div className="bg-gray-900 text-white py-10 px-4 md:px-20">
      <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
      <p className="text-center text-gray-400 mb-12">
        A simple, secure 3-step process to guarantee safety for both buyers and sellers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-blue-500"
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.id}. {step.title}</h3>
            <p className="text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;