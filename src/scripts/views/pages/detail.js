import RestaurantApiSource from '../../data/RestaurantApiSource';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { TemplateCreator } from '../template/template-creator';

const Detail = {
  async render() {
    return `
        <div id="detail-content"></div>
        <loader-component></loader-component>
        <div class="details-container">
          <form class="form-review">
            <h1 class="details-subtitle">Tambahkan Ulasanmu</h1>
            <div>
              <label>Nama</label>
              <input type="text" name="name" id="name" placeholder="Nama" />
            </div>
            <div>
              <label>Ulasan</label>
              <textarea name="review" id="review" rows="4" placeholder="Ulasan"></textarea>
            </div>
            <button type="submit" id="submit-review">Kirim</button>
          </form>
     </div>
     <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    const contentElement = document.querySelector('#detail-content');
    const loader = document.querySelector('loader-component');
    const InputName = document.querySelector('#name');
    const InputReview = document.querySelector('#review');
    const formReview = document.querySelector('.form-review');

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const response = await RestaurantApiSource.detailRestaurants(url.id);

    loader.classList.add('hidden');

    formReview.addEventListener('submit', async (event) => {
      const data = {
        id: url.id,
        name: InputName.value,
        review: InputReview.value,
      };
      event.preventDefault();
      event.stopPropagation();

      await RestaurantApiSource.mutateAddReview(data);
    });
    try {
      if (!response) {
        throw new Error('Failed to fetch restaurant details');
      }
      contentElement.innerHTML += TemplateCreator.DetailRestaurant(response);
      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
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
    }
  },
};

export default Detail;
