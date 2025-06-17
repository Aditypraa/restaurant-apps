import FavoriteRestaurantsIdb from '../../data/favorite-restaurant-idb';
import { RestaurantItem } from '../template/template-creator';

const Favorite = {
  async render() {
    return `
      <section class="favorite-page">
        <div class="container">
          <div class="page-header">
            <h1 class="page-title font-bold">Restoran Favorit</h1>
            <p class="page-subtitle font-regular">Koleksi restoran yang telah Anda sukai</p>
          </div>
          
          <div class="favorite-content">
            <loader-component></loader-component>
            
            <div class="empty-state">
              <div class="empty-illustration">
                <div class="empty-icon-main">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <div class="empty-decorations">
                  <div class="decoration-icon decoration-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div class="decoration-icon decoration-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                      <line x1="6" y1="1" x2="6" y2="4"/>
                      <line x1="10" y1="1" x2="10" y2="4"/>
                      <line x1="14" y1="1" x2="14" y2="4"/>
                    </svg>
                  </div>
                  <div class="decoration-icon decoration-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="empty-content">
                <h3 class="empty-title font-bold">Belum Ada Restoran Favorit</h3>
                <p class="empty-description font-regular">
                  Koleksi favorit Anda masih kosong. Mulai jelajahi berbagai restoran menarik dan simpan yang paling Anda sukai!
                </p>
                
                <div class="empty-suggestions">
                  <h4 class="suggestions-title font-semibold">Tips menemukan restoran favorit:</h4>
                  <ul class="suggestions-list">
                    <li class="suggestion-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      Cari restoran dengan rating tinggi
                    </li>
                    <li class="suggestion-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      Pilih lokasi yang dekat dengan Anda
                    </li>
                    <li class="suggestion-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      Klik ❤️ untuk menyimpan ke favorit
                    </li>
                  </ul>
                </div>
                
                <div class="empty-actions">
                  <a href="/" class="empty-action-btn primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                    Jelajahi Restoran
                  </a>
                  <button class="empty-action-btn secondary" onclick="window.location.reload()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="1 4 1 10 7 10"/>
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                    </svg>
                    Refresh Halaman
                  </button>
                </div>
              </div>
            </div>
            
            <div id="card-list" class="card-container"></div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantApi = await FavoriteRestaurantsIdb.getAllRestaurants();
    const restaurantContainer = document.querySelector('#card-list');
    const loader = document.querySelector('loader-component');
    const emptyState = document.querySelector('.empty-state');

    // Add loading delay for better UX
    setTimeout(() => {
      loader.classList.add('hidden');

      if (restaurantApi.length > 0) {
        // Hide empty state and show cards
        emptyState.style.display = 'none';
        restaurantContainer.classList.remove('empty');
        restaurantContainer.style.display = 'grid';

        // Clear container and add cards
        restaurantContainer.innerHTML = '';

        restaurantApi.forEach((restaurant, index) => {
          const cardElement = document.createElement('div');
          cardElement.innerHTML = RestaurantItem(restaurant);
          cardElement.style.setProperty('--card-index', index);
          restaurantContainer.appendChild(cardElement.firstElementChild);
        });

        // Initialize lazy loading for images
        const images = restaurantContainer.querySelectorAll('.lazyload');
        images.forEach((img) => {
          img.src = img.dataset.src;
          img.classList.remove('lazyload');
        });
      } else {
        // Show empty state with smooth animation
        emptyState.style.display = 'flex';
        restaurantContainer.classList.add('empty');
        restaurantContainer.style.display = 'none';

        // Add staggered animation to empty state elements
        setTimeout(() => {
          const illustration = emptyState.querySelector('.empty-illustration');
          const content = emptyState.querySelector('.empty-content');

          if (illustration) illustration.style.animation = 'fadeInUp 0.6s ease-out forwards';
          if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            setTimeout(() => {
              content.style.transition = 'all 0.6s ease-out';
              content.style.opacity = '1';
              content.style.transform = 'translateY(0)';
            }, 200);
          }
        }, 100);
      }
    }, 300); // Small delay for better perceived performance
  },
};

export default Favorite;
