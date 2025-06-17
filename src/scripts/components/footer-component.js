class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer class="modern-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <h3 class="footer-title font-bold">RestaurantApps</h3>
              <p class="footer-description font-regular">
                Platform terpercaya untuk menemukan restoran terbaik di Indonesia dengan rating dan review autentik.
              </p>
            </div>
            <div class="footer-links">
              <div class="footer-section">
                <h4 class="footer-section-title font-semibold">Navigasi</h4>
                <ul class="footer-list">
                  <li><a href="/" class="footer-link">Home</a></li>
                  <li><a href="#/favorite" class="footer-link">Favorite</a></li>
                  <li><a href="https://www.aditypraa.me" class="footer-link" target="_blank">About</a></li>
                </ul>
              </div>
              <div class="footer-section">
                <h4 class="footer-section-title font-semibold">Kontak</h4>
                <ul class="footer-list">
                  <li><a href="mailto:contact@aditypraa.me" class="footer-link">Email</a></li>
                  <li><a href="#" class="footer-link">Telepon</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p class="footer-copyright font-regular">
              &copy; 2025 RestaurantApps. All rights reserved.
            </p>
            <p class="footer-credits font-regular">
              Built with Aditya Pratama by <a href="https://www.aditypraa.me" target="_blank" class="footer-author">Aditya</a>
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);
