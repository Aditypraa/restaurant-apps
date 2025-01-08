import FavoriteRestaurantsIdb from '../../data/favorite-restaurant-idb';
import { RestaurantItem } from '../template/template-creator';

const Favorite = {
  async render() {
    return `
          <section id="restaurant-list">
      <h2 class="font-semibold">Favortite</h2>
      <loader-component></loader-component>
        <div id="card-list" class="card-container"></div>
      </section>
          `;
  },

  async afterRender() {
    const restaurantApi = await FavoriteRestaurantsIdb.getAllRestaurants();
    const restaurantContainer = document.querySelector('#card-list');
    const loader = document.querySelector('loader-component');

    loader.classList.add('hidden');

    restaurantApi.forEach((restaurant) => {
      restaurantContainer.innerHTML += RestaurantItem(restaurant);
    });
  },
};

export default Favorite;
