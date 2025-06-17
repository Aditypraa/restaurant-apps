class NavbarComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header class="navigation">
        <nav class="container">
          <div class="navigation-content">
            <div class="logo-container">
              <picture>
                <source type="image/webp" srcset="./images/logo.webp">
                <source type="image/png" srcset="./images/logo.png">
                <img
                  class="lazyload logo"
                  data-src="./images/logo.png"
                  alt="Restaurant Apps Logo"
                  width="40"
                  height="40"
                />
              </picture>
              <span class="logo-text font-bold">RestaurantApps</span>
            </div>
            <div class="navbar-action">
              <button class="hamburger-menu" aria-label="Menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
              </button>
              <div class="navbar-item">
                <a href="/" class="nav-link font-medium">Home</a>
                <a href="#/favorite" class="nav-link font-medium">Favorite</a>
                <a href="https://www.aditypraa.me" class="nav-link font-medium" target="_blank">About</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    `;
  }
}

customElements.define('navbar-component', NavbarComponent);
