import CONFIG from './config';

const API_ENDPOINT = {
  restaurantList: `${CONFIG.BASE_URL}/list`,
  detailRestaurant: `${CONFIG.BASE_URL}/detail/`,
  addReviewRestaurant: `${CONFIG.BASE_URL}/review`,
};
export default API_ENDPOINT;
