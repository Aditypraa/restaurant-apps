import RestaurantApiSource from '../../data/RestaurantApiSource';
import { RestaurantItem } from '../template/template-creator';

const Home = {
  async render() {
    return `
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title font-extrabold">
                Temukan Restoran
                <span class="hero-highlight">Terbaik</span>
                di Indonesia
              </h1>
              <p class="hero-description font-regular">
                Jelajahi ribuan restoran terbaik dengan rating tinggi dan cita rasa autentik di seluruh Indonesia.
              </p>
              <div class="hero-actions">
                <a href="#restaurant-list" class="btn-primary">
                  Jelajahi Sekarang
                </a>
              </div>
            </div>
            <div class="hero-image">
              <picture>
                <source type="image/webp" media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.webp">
                <source type="image/webp" media="(max-width: 1280px)" srcset="./images/heros/hero-image_2-medium.webp">
                <source type="image/webp" srcset="./images/heros/hero-image_2-large.webp">
                <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.jpg">
                <source media="(max-width: 1280px)" srcset="./images/heros/hero-image_2-medium.jpg">
                <img 
                  src="./images/heros/hero-image_2-large.jpg" 
                  alt="Delicious Indonesian cuisine"
                  loading="lazy"
                  class="hero-img"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>
      
      <section id="restaurant-list" class="restaurant-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title font-bold">Restoran Populer</h2>
            <p class="section-subtitle font-regular">Pilihan restoran terbaik dengan rating tertinggi</p>
          </div>
          <loader-component></loader-component>
          <div id="card-list" class="card-container"></div>
        </div>
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
