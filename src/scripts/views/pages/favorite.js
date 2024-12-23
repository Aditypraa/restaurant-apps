import RestaurantsIdb from '../../data/favorite-restaurant-idb';
import { TemplateCreator } from '../template/template-creator';

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
    const restaurantApi = await RestaurantsIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('#card-list');
    const loader = document.querySelector('loader-component');

    loader.classList.add('hidden');

    restaurantApi.forEach((restaurant) => {
      restaurantContainer.innerHTML += TemplateCreator.RestaurantItem(restaurant);
    });
  },
};

export default Favorite;
