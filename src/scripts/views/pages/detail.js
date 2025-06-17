import RestaurantApiSource from '../../data/RestaurantApiSource';
import ToastService from '../../utils/toast-service';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { DetailRestaurant } from '../template/template-creator';
import FavoriteRestaurantsIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
      <section class="detail-page">
        <div class="container">
          <div id="detail-content" class="detail-content">
            <loader-component></loader-component>
          </div>
          
          <div id="likeButtonContainer" data-testid="likeButtonContainer"></div>
          
          <div class="review-section">
            <div class="review-form-container">
              <form class="form-review">
                <div class="form-header">
                  <h2 class="form-title font-bold">Bagikan Pengalaman Anda</h2>
                  <p class="form-subtitle font-regular">Tuliskan review untuk membantu orang lain</p>
                </div>
                <div class="form-fields">
                  <div class="form-field">
                    <label for="name" class="form-label font-medium">Nama Anda</label>
                    <input type="text" name="name" id="name" placeholder="Masukkan nama Anda" required class="form-input" />
                  </div>
                  <div class="form-field">
                    <label for="review" class="form-label font-medium">Ulasan Anda</label>
                    <textarea name="review" id="review" rows="4" placeholder="Ceritakan pengalaman Anda di restoran ini..." required class="form-textarea"></textarea>
                  </div>
                  <button type="submit" id="submit-review" class="form-submit-btn">
                    <span class="btn-text">Kirim Review</span>
                    <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="m22 2-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const contentElement = document.querySelector('#detail-content');
    const loader = document.querySelector('loader-component');
    const InputName = document.querySelector('#name');
    const InputReview = document.querySelector('#review');
    const formReview = document.querySelector('.form-review');
    const submitButton = document.querySelector('#submit-review');

    const url = UrlParser.parseActiveUrlWithoutCombiner();

    try {
      const response = await RestaurantApiSource.detailRestaurants(url.id);

      if (!response) {
        throw new Error('Failed to fetch restaurant details');
      }

      contentElement.innerHTML = DetailRestaurant(response);

      // ✅ Store current restaurant data
      this.currentRestaurant = response;

      loader.classList.add('hidden');

      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteRestaurantsIdb,
        restaurant: {
          id: response.id,
          pictureId: response.pictureId,
          name: response.name,
          city: response.city,
          rating: response.rating,
          description: response.description,
        },
      });
    } catch (error) {
      contentElement.innerHTML = '<p>Tidak dapat menampilkan detail resto.</p>';
      ToastService.error(`Gagal memuat detail restaurant ${error}`);
    }

    // ✅ Form submission handler - SEKALI SAJA
    formReview.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      // Validation
      if (!InputName.value.trim() || !InputReview.value.trim()) {
        ToastService.warning('Nama dan ulasan harus diisi!');
        return;
      }

      const data = {
        id: url.id,
        name: InputName.value.trim(),
        review: InputReview.value.trim(),
      };

      // ✅ Set loading state
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Mengirim...';
      submitButton.disabled = true;

      try {
        // Add review
        await RestaurantApiSource.mutateAddReview(data);

        // Show success toast
        ToastService.success('Review berhasil ditambahkan! 🎉');

        // ✅ HANYA update review list, JANGAN re-render seluruh content
        const updatedRestaurant = await RestaurantApiSource.detailRestaurants(url.id);
        this.updateReviewsOnly(updatedRestaurant.customerReviews);

        // Clear form
        InputName.value = '';
        InputReview.value = '';
        InputName.focus();
      } catch (error) {
        console.error('Error adding review:', error);
        ToastService.error('Gagal menambahkan review. Coba lagi!');
      } finally {
        // ✅ Reset button state - button reference masih valid
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  },
  // ✅ Update HANYA bagian review, bukan seluruh content
  updateReviewsOnly(newReviews) {
    // Cari container review di dalam content yang sudah ada
    const reviewsContainer = document.querySelector('#detail-content .details-review-wrapper');

    if (reviewsContainer && newReviews) {
      // Update hanya bagian reviews
      reviewsContainer.innerHTML = this.generateReviewsHTML(newReviews);

      // Scroll ke review baru
      setTimeout(() => {
        const allReviews = reviewsContainer.querySelectorAll('.details-review-item');

        if (allReviews.length > 0) {
          const lastReview = allReviews[allReviews.length - 1];
          lastReview.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // Highlight review baru
          lastReview.style.background = '#e8f5e8';
          setTimeout(() => {
            lastReview.style.background = '';
          }, 2000);
        }
      }, 100);
    } else {
      console.error('❌ Reviews container not found or no reviews provided', {
        containerExists: !!reviewsContainer,
        reviewsLength: newReviews?.length,
      });
    }
  },
  // ✅ Generate HTML untuk reviews saja
  generateReviewsHTML(reviews) {
    if (!reviews || reviews.length === 0) {
      return '<p class="no-reviews">Belum ada ulasan.</p>';
    }

    return reviews
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
      .join('');
  },
};

export default Detail;
