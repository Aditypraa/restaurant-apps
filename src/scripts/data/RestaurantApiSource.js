import axios from 'axios';
import API_ENDPOINT from '../globals/api-endpoint';

// Create axios instance
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.response?.data || error.message}`);
    return Promise.reject(error);
  },
);

class RestaurantApiSource {
  static async listRestaurants() {
    try {
      const response = await api.get(API_ENDPOINT.restaurantList);
      return response.data?.restaurants;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw untuk error handling di component
    }
  }

  static async detailRestaurants(id) {
    try {
      const response = await api.get(API_ENDPOINT.detailRestaurant + id);
      return response.data?.restaurant;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw untuk error handling di component
    }
  }

  static async mutateAddReview(data) {
    try {
      const response = await api.post(API_ENDPOINT.addReviewRestaurant, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default RestaurantApiSource;
