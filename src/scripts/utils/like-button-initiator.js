import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../views/template/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, favoriteRestaurants, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = favoriteRestaurants;

    await this._renderButton();
  },

  async _renderButton() {
    try {
      const { id } = this._restaurant;
      const restaurant = await this._favoriteRestaurants.getRestaurant(id);

      if (restaurant) {
        this._renderLiked();
      } else {
        this._renderLike();
      }
    } catch (error) {
      console.error(error);
      this._renderLike();
    }
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant);
      this._renderButton();
    });

    // Adjust tooltip position after render
    setTimeout(() => this._adjustTooltipPosition(), 10);
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });

    // Adjust tooltip position after render
    setTimeout(() => this._adjustTooltipPosition(), 10);
  }, // Add tooltip positioning logic
  _adjustTooltipPosition() {
    const likeButton = document.querySelector('#likeButton');
    const tooltip = likeButton?.querySelector('.like-tooltip');

    if (!likeButton || !tooltip) return;

    // Get button position relative to viewport
    const buttonRect = likeButton.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Remove existing positioning classes
    tooltip.classList.remove('tooltip-left', 'tooltip-bottom');

    // Check if tooltip would overflow right edge
    if (buttonRect.right > viewportWidth - 100) {
      tooltip.classList.add('tooltip-left');
    }

    // Check if tooltip would overflow top edge
    if (buttonRect.top < 60) {
      tooltip.classList.add('tooltip-bottom');
    }
  },
};

export default LikeButtonInitiator;
