import RestaurantApiSource from '../../data/RestaurantApiSource';
import { RestaurantItem } from '../template/template-creator';

const Home = {
  async render() {
    return `
      <section class="jumbroton-wrapper">
        <div class="image-wrapper">
          <picture>
            <source type="image/webp" media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.webp">
            <source type="image/webp" media="(max-width: 1280px)" srcset="./images/heros/hero-image_2-medium.webp">
            <source type="image/webp" srcset="./images/heros/hero-image_2-large.webp">
            <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.jpg">
            <source media="(max-width: 1280px)" srcset="./images/heros/hero-image_2-medium.jpg">
            <img 
              src="./images/heros/hero-image_2-large.jpg" 
              alt="hero image"
              loading="lazy"
              class="responsive-image"
            />
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

    loader.classList.add('hidden');

    response.forEach((restaurant) => {
      restaurants.innerHTML += RestaurantItem(restaurant);
    });
  },
};

export default Home;
