import axios from "axios";

export const getCurrentUser = async () => {
  try {
    const response = await axios({
      url: "http://localhost:3000/api/currentUser",
      method: "GET",
    });
    return response.data; // Successfully fetched user data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return error.response.data; // 401 Unauthorized case
    } else {
      console.error(
        "Error fetching current user:",
        error.response?.data || error.message
      );
      return undefined; // Handle other errors or undefined cases
    }
  }
};
