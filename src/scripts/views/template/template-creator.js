/* eslint-disable indent */
import CONFIG from '../../globals/config';

const RestaurantItem = (restaurant) => `
  <card-item
    id="${restaurant.id || '-'}"
    pictureId="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId || '-'}"
    href="${restaurant.id || '-'}"
    name="${restaurant.name || '-'}"
    city="${restaurant.city || '-'}"
    rating="${restaurant.rating || '-'}"
    description="${restaurant.description || '-'}"
    data-testid="restaurant-item"
  >
    <div class="restaurant-item">
      <h3 class="restaurant__title">${restaurant.name}</h3>
    </div>
  </card-item>
`;

const DetailRestaurant = (restaurant) => `
  <article class="restaurant-detail">
    <header class="detail-header">
      <div class="detail-hero">
        <img src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" alt="${restaurant.name}" class="detail-image"/>
        <div class="detail-overlay">
          <div class="detail-badge-container">
            <span class="rating-badge-large">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              ${restaurant.rating}
            </span>
          </div>
        </div>
      </div>
      
      <div class="detail-info">
        <h1 class="detail-title font-bold">${restaurant.name}</h1>
        <div class="detail-meta">
          <span class="detail-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${restaurant.city}
          </span>
          <span class="detail-address">${restaurant.address}</span>
        </div>
        
        <div class="detail-categories">
          ${restaurant.categories
            .map(
              (category, index) => `
            <span class="category-tag" style="--i: ${index}">${category.name}</span>
          `,
            )
            .join('')}
        </div>
        
        <p class="detail-description font-regular">${restaurant.description}</p>
      </div>
    </header>

    <section class="detail-menus">
      <h2 class="section-title font-bold">Menu</h2>
      <div class="menu-grid">
        <div class="menu-section" style="--menu-index: 0">
          <h3 class="menu-title font-semibold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
              <line x1="6" y1="1" x2="6" y2="4"/>
              <line x1="10" y1="1" x2="10" y2="4"/>
              <line x1="14" y1="1" x2="14" y2="4"/>
            </svg>
            Makanan
          </h3>
          <ul class="menu-list">
            ${restaurant.menus.foods
              .map(
                (food) => `
              <li class="menu-item">${food.name}</li>
            `,
              )
              .join('')}
          </ul>
        </div>
        
        <div class="menu-section" style="--menu-index: 1">
          <h3 class="menu-title font-semibold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12V7a1 1 0 0 1 1-1h4l2 2h4a1 1 0 0 1 1 1v3"/>
              <path d="M5 12l6 6 6-6"/>
            </svg>
            Minuman
          </h3>
          <ul class="menu-list">
            ${restaurant.menus.drinks
              .map(
                (drink) => `
              <li class="menu-item">${drink.name}</li>
            `,
              )
              .join('')}
          </ul>
        </div>
      </div>
    </section>

    <section class="reviews-section">
      <h2 class="section-title font-bold">Ulasan Pelanggan</h2>
      <div class="details-review-wrapper">
        ${restaurant.customerReviews
          .map(
            (review, index) => `
          <div class="details-review-item" style="--review-index: ${index}">
            <div class="review-item-header">
              <div class="review-item-user">
                <h4>${review.name}</h4>
              </div>
              <p class="review-item-date">${review.date}</p>
            </div>
            <p class="review-item-desc">${review.review}</p>
          </div>
        `,
          )
          .join('')}
      </div>
    </section>
  </article>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this Restaurant" id="likeButton" class="like like-button tooltip-safe">
    <svg class="like-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
    <span class="like-tooltip">Tambah ke Favorit</span>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this Restaurant" id="likeButton" class="like liked-button tooltip-safe">
    <svg class="like-icon liked" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
    <span class="like-tooltip">Hapus dari Favorit</span>
  </button>
`;

export { RestaurantItem, DetailRestaurant, createLikeButtonTemplate, createLikedButtonTemplate };
