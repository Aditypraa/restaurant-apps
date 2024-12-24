import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantApiSource {
  static async listRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.restaurantList);
      const result = await response.json();
      return result?.restaurants;
    } catch (error) {
      console.log(error);
    }
  }

  static async detailRestaurants(id) {
    try {
      const response = await fetch(API_ENDPOINT.detailRestaurant + id);
      // console.log(response);
      const result = await response.json();
      // console.log('Detail Restaurant', result);
      return result?.restaurant;
    } catch (error) {
      console.log(error);
    }
  }

  static async mutateAddReview(data) {
    try {
      const response = await fetch(API_ENDPOINT.addReviewRestaurant, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      // TODO:  Setup  Alert
      if (result?.message) {
        alert('Berhasil menambahkan review');
      }

      // TODO:  Reload Page
      window.location.reload();

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default RestaurantApiSource;
