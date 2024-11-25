class NavbarComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
         <header class="navigation border-b">
      <nav class="container">
        <div class="navigation-content">
          <img
            src="./images/logo.png"
            alt="Logo Lorem"
            width="50"
            height="50"
          />
          <div class="navbar-action">
            <button class="hamburger-menu">
              <i class="fa fa-bars"></i>
            </button>
            <div class="navbar-item">
              <a href="/" class="button font-bold">Home</a>
              <a href="#" class="button font-bold">Favorite</a>
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

customElements.define("navbar-component", NavbarComponent);
