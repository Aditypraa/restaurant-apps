const Favorite = {
  async render() {
    return `
          <h2>Favorite Page</h2>
          `;
  },

  async afterRender() {
    console.log('Favorite Page');
  },
};

export default Favorite;
