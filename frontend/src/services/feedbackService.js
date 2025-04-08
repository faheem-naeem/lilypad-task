import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/feedback'; // Can be initialized dynamically as per app env, hardcoded for now.

export const fetchFeedbacks = async (rating = null) => {
  try {
    const url = rating ? `${API_URL}?rating=${rating}` : API_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error.response ? error.response.data : error.message);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(API_URL, feedbackData);
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error.response ? error.response.data : error.message);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};
