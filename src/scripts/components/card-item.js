class CardItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <article class="restaurant-card" id="${this.getAttribute('id')}">
        <div class="card-image-container">
          <img 
            class="lazyload card-image" 
            data-src="${this.getAttribute('pictureId')}" 
            alt="${this.getAttribute('name')}"
            loading="lazy"
          />
          <div class="rating-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            ${this.getAttribute('rating')}
          </div>
        </div>
        <div class="card-content">
          <h3 class="card-title font-semibold">
            <a href="#/detail/${this.getAttribute('href')}" class="card-link">
              ${this.getAttribute('name')}
            </a>
          </h3>
          <div class="card-meta">
            <span class="card-city font-medium">📍 ${this.getAttribute('city')}</span>
          </div>
          <p class="card-description font-regular">
            ${this.getAttribute('description').length > 100 ? `${this.getAttribute('description').substring(0, 100)}...` : this.getAttribute('description')}
          </p>
        </div>
      </article>
    `;
  }
}

customElements.define('card-item', CardItem);
