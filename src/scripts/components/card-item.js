class CardItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="card-wrapper" id=${this.getAttribute('id')}>
        <img class="lazyload" data-src="${this.getAttribute('pictureId')}" alt="${this.getAttribute('name')}" />
        <div class="card-content">
          <h3><a href="#/detail/${this.getAttribute('href')}"> ${this.getAttribute('name')} </a></h3>
          <p>City: ${this.getAttribute('city')}</p>
          <p>Rating: ${this.getAttribute('rating')}</p>
          <p class="line-clamp">
            ${this.getAttribute('description')}
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('card-item', CardItem);
