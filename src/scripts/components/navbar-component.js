class NavbarComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
         <header class="navigation border-b">
      <nav class="container">
        <div class="navigation-content">
          <picture>
            <source type="image/webp" srcset="./images/logo.webp">
            <source type="image/png" srcset="./images/logo.png">
            <img
            class="lazyload"
              data-src="./images/logo.png"
              alt="Logo Lorem"
              width="50"
              height="50"
            />
          </picture>
          <div class="navbar-action">
            <button class="hamburger-menu">
              <i class="fa fa-bars"></i>
            </button>
            <div class="navbar-item">
              <a href="/" class="button font-bold">Home</a>
              <a href="#/favorite" class="button font-bold">Favorite</a>
              <a href="https://www.aditypraa.me" class="button font-bold"
                >About Us</a
              >
            </div>
          </div>
        </div>
      </nav>
    </header>
        `;
  }
}

customElements.define('navbar-component', NavbarComponent);
