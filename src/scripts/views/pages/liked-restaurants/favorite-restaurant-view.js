import { RestaurantItem } from '../../template/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <div class="content">
        <input id="query" type="text">
        <h2 class="content__heading">Your Liked Restaurant</h2>
  
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(RestaurantItem(restaurant)),
        '',
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    const restaurantsContainer = document.getElementById('restaurants');
    restaurantsContainer.innerHTML = html;
    restaurantsContainer.dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restoran untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
