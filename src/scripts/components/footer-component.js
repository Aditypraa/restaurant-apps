class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
           <footer class="container">
             <p>&copy; 2024 - Restaurant Apps</p>
           </footer>
        `;
  }
}

customElements.define('footer-component', Footer);
