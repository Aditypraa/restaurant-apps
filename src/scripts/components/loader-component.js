class LoaderComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="loader-wrapper">
                <span class="loader"></span>
            </div>
        `;
  }
}

customElements.define('loader-component', LoaderComponent);
