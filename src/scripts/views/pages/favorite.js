import FavoriteRestaurantsIdb from '../../data/favorite-restaurant-idb';
import { RestaurantItem } from '../template/template-creator';

const Favorite = {
  async render() {
    return `
      <section id="restaurant-list">
        <h2 class="font-semibold">Favorite</h2>
        <loader-component></loader-component>
        <div id="card-list" class="card-container">
          <div class="restaurant-item__not__found">Tidak ada restaurant untuk ditampilkan</div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantApi = await FavoriteRestaurantsIdb.getAllRestaurants();
    const restaurantContainer = document.querySelector('#card-list');
    const loader = document.querySelector('loader-component');
    const emptyMessage = document.querySelector('.restaurant-item__not__found');

    loader.classList.add('hidden');

    if (restaurantApi.length > 0) {
      emptyMessage.style.display = 'none';
      restaurantApi.forEach((restaurant) => {
        restaurantContainer.innerHTML += RestaurantItem(restaurant);
      });
    } else {
      emptyMessage.style.display = 'block';
    }
  },
};

export default Favorite;
