// /* eslint-disable no-undef */
// const assert = require('assert');

// Feature('Searching Restaurants');

// Before(({ I }) => {
//   I.amOnPage('/#/favorite');
// });

// Scenario('searching restaurants', async ({ I }) => {
//   // Add first restaurant to favorites
//   I.amOnPage('/');
//   I.waitForElement('card-item', 30);

//   const firstRestaurant = locate('card-item').first();
//   const firstRestaurantName = await I.grabAttributeFrom(firstRestaurant, 'name');

//   I.click(firstRestaurant);
//   I.waitForElement('#likeButton', 30);
//   I.click('#likeButton');
//   I.wait(2);

//   // Add second restaurant to favorites
//   I.amOnPage('/');
//   I.waitForElement('card-item', 30);

//   const secondRestaurant = locate('card-item').at(2);
//   const secondRestaurantName = await I.grabAttributeFrom(secondRestaurant, 'name');

//   I.click(secondRestaurant);
//   I.waitForElement('#likeButton', 30);
//   I.click('#likeButton');
//   I.wait(2);

//   // Perform search
//   I.amOnPage('/#/favorite');
//   I.waitForElement('#query', 30);

//   const searchQuery = firstRestaurantName.substring(1, 3).toLowerCase();
//   I.fillField('#query', searchQuery);
//   I.wait(2);

//   // Count visible restaurants that match search
//   const visibleCards = await I.grabNumberOfVisibleElements('card-item');
//   const expectedMatches = [firstRestaurantName, secondRestaurantName].filter((name) =>
//     name.toLowerCase().includes(searchQuery),
//   ).length;

//   assert.strictEqual(
//     visibleCards,
//     expectedMatches,
//     'Number of visible restaurants should match search results',
//   );
// });
