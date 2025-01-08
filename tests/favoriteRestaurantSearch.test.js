/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';
import '../src/scripts/components/card-item';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the found restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('card-item').length).toEqual(3);
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            {
              id: 'rqdv5juczeskfw1e867',
              name: 'Restaurant ABC',
              description: 'Lorem ipsum dolor sit amet',
              pictureId: '14',
              city: 'Medan',
              rating: 4.2,
            },
            {
              id: 'rqdv5juczeskfw1e868',
              name: 'Restaurant DEF',
              description: 'Lorem ipsum dolor sit amet',
              pictureId: '14',
              city: 'Medan',
              rating: 4.2,
            },
            {
              id: 'rqdv5juczeskfw1e869',
              name: 'Restaurant GHI',
              description: 'Lorem ipsum dolor sit amet',
              pictureId: '14',
              city: 'Medan',
              rating: 4.2,
            },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    }, 10000);

    it('should show the name of the found restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantElements = document.querySelectorAll('card-item');
        expect(restaurantElements[0].getAttribute('name')).toEqual('Restaurant ABC');
        expect(restaurantElements[1].getAttribute('name')).toEqual('Restaurant DEF');
        expect(restaurantElements[2].getAttribute('name')).toEqual('Restaurant GHI');
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            {
              id: 'rqdv5juczeskfw1e867',
              name: 'Restaurant ABC',
              description: 'Lorem ipsum dolor sit amet',
              pictureId: '14',
              city: 'Medan',
              rating: 4.2,
            },
            {
              id: 'rqdv5juczeskfw1e868',
              name: 'Restaurant DEF',
              description: 'Lorem ipsum dolor sit amet',
              pictureId: '14',
              city: 'Medan',
              rating: 4.2,
            },
            {
              id: 'rqdv5juczeskfw1e869',
              name: 'Restaurant GHI',
              description: 'Lorem ipsum dolor sit amet',
              pictureId: '14',
              city: 'Medan',
              rating: 4.2,
            },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    }, 10000);

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantElement = document.querySelector('card-item');
        expect(restaurantElement.getAttribute('name')).toEqual('-');
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 444 }];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    }, 10000);
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('card-item').length).toEqual(0);
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restaurant a');
    });
  });
});
