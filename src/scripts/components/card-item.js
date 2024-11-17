// card-item.js
class CardItem extends HTMLElement {
  constructor() {
    super();
    this._restaurant = {
      id: "",
      pictureId: "",
      name: "",
      city: "",
      rating: "",
      description: "",
    };
  }

  setValue(value) {
    // Tambahkan validasi data
    if (value && typeof value === "object") {
      this._restaurant = {
        id: value.id || "",
        pictureId: value.pictureId || "",
        name: value.name || "",
        city: value.city || "",
        rating: value.rating || "",
        description: value.description || "",
      };
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute("restaurant-id", this._restaurant.id);

    this.innerHTML = `
      <div class="card-wrapper">
        <img src="${this._restaurant.pictureId}" alt="${this._restaurant.name}" />
        <div class="card-content">
          <h3><a href="#"> ${this._restaurant.name} </a></h3>
          <p>City: ${this._restaurant.city}</p>
          <p>Rating: ${this._restaurant.rating}</p>
          <p class="line-clamp">
            ${this._restaurant.description}
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define("card-item", CardItem);
