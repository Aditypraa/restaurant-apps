import RestaurantApiSource from '../../data/RestaurantApiSource';
import ToastService from '../../utils/toast-service';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { DetailRestaurant } from '../template/template-creator';
import FavoriteRestaurantsIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
        <div id="detail-content"></div>
        <loader-component></loader-component>
        <div id="likeButtonContainer" data-testid="likeButtonContainer"></div>
        <div class="details-container">
          <form class="form-review">
            <h1 class="details-subtitle">Tambahkan Ulasanmu</h1>
            <div>
              <label>Nama</label>
              <input type="text" name="name" id="name" placeholder="Nama" required />
            </div>
            <div>
              <label>Ulasan</label>
              <textarea name="review" id="review" rows="4" placeholder="Ulasan" required></textarea>
            </div>
            <button type="submit" id="submit-review">Kirim Review</button>
          </form>
        </div>
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
      console.log('Testing', error);
      contentElement.innerHTML = '<p>Tidak dapat menampilkan detail resto.</p>';
      ToastService.error('Gagal memuat detail restaurant');
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
    console.log('🔄 Updating reviews only...', { reviewCount: newReviews?.length });

    // Cari container review di dalam content yang sudah ada
    const reviewsContainer = document.querySelector('#detail-content .details-review-wrapper');

    console.log('📍 Reviews container found:', !!reviewsContainer);

    if (reviewsContainer && newReviews) {
      // Update hanya bagian reviews
      reviewsContainer.innerHTML = this.generateReviewsHTML(newReviews);
      console.log('✅ Reviews HTML updated successfully');

      // Scroll ke review baru
      setTimeout(() => {
        const allReviews = reviewsContainer.querySelectorAll('.details-review-item');
        console.log(`📊 Total reviews after update: ${allReviews.length}`);

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
      return '<p>Belum ada ulasan.</p>';
    }

    return reviews
      .map(
        (review) => `
      <div class="details-review-item">
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
