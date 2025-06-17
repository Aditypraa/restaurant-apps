class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer class="modern-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-main">
              <h3 class="footer-title font-bold">RestaurantApps</h3>
              <p class="footer-description font-regular">
                Temukan restoran terbaik di Indonesia
              </p>
            </div>
            <nav class="footer-nav">
              <a href="/" class="footer-link">Home</a>
              <a href="#/favorite" class="footer-link">Favorite</a>
              <a href="https://www.aditypraa.me" class="footer-link" target="_blank">About</a>
            </nav>
          </div>
          <div class="footer-bottom">
            <span class="footer-copyright">© ${new Date().getFullYear()} RestaurantApps</span>
            <span class="footer-credits">
              Made by <a href="https://www.aditypraa.me" target="_blank" class="footer-author">Aditya Pratama</a>
            </span>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);
