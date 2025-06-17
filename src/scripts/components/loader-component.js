class LoaderComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="modern-loader-wrapper">
        <div class="modern-loader">
          <div class="loader-spinner"></div>
          <div class="loader-text font-medium">Memuat restoran...</div>
        </div>
      </div>
    `;
  }
}

customElements.define('loader-component', LoaderComponent);
