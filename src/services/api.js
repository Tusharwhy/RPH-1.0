import axios from "axios";

export function checkLogin(credentials) {
  // Replace these with your actual predefined credentials
  const predefinedCredentials = [
    { email: "admin@123", password: "12345" },
    { email: "user", password: "user" },
    // Add more credentials as needed
  ];

  // Find a match in the predefined credentials
  const matchedCredentials = predefinedCredentials.find(
    (cred) =>
      cred.email === credentials.email && cred.password === credentials.password
  );

  // Return true if a match is found, otherwise return false
  return Boolean(matchedCredentials);
}

// Replace 'YOUR_BACKEND_API_URL' with the actual endpoint URL
const backendApiUrl = "YOUR_BACKEND_API_URL";

// Function to handle file upload
export const handleFileUpload = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided for upload");
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `http://192.168.108.47:5000/ipc-sections`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
export const handleImageUpload = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided for upload");
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      `http://192.168.108.47:5000/vision`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const sendUserMessage = async (message) => {
  try {
    if (!message) {
      throw new Error("No message provided");
    }

    const response = await axios.post(`http://192.168.108.47:5000/chat-bot`, {
      prompt: message,
    });

    if (!response.data.Legal_Assistant) {
      throw new Error("Invalid response from the API");
    }

    return response.data.Legal_Assistant;
  } catch (error) {
    console.error("Error sending user message:", error.message);
    throw error;
  }
};
