// import data from '../../../public/data/DATA';
import RestaurantApiSource from '../../data/RestaurantApiSource';
import { TemplateCreator } from '../template/template-creator';

const Home = {
  async render() {
    return `
         <section class="jumbroton-wrapper">
        <div class="image-wrapper">
          <picture>
            <source media="(max-width: 600px)" srcset="./images/heros/hero-image_4-small.jpg">
            <img src="./images/heros/hero-image_4-large.jpg" alt="hero image" />
          </picture>
          <h1 class="font-bold">Selamat datang di restoku!</h1>
        </div>
      </section>
      <section id="restaurant-list">
      <h2 class="font-semibold">Daftar Restaurant</h2>
      <loader-component></loader-component>
        <div id="card-list" class="card-container"></div>
      </section>
        `;
  },
  async afterRender() {
    const restaurants = document.querySelector('#card-list');
    const loader = document.querySelector('loader-component');

    const response = await RestaurantApiSource.listRestaurants();
    // console.log(response);

    loader.classList.add('hidden');

    // console.log(data.restaurants);
    response.forEach((restaurant) => {
      restaurants.innerHTML += TemplateCreator.RestaurantItem(restaurant);
    });
  },
};

export default Home;
