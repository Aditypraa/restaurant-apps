/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.see('Favorite', '.font-semibold');
  I.seeElement('.restaurant-item__not__found');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.waitForElement('card-item', 10);

  // Store first restaurant data before clicking
  const firstRestaurant = locate('card-item').first();
  const restaurantId = await I.grabAttributeFrom(firstRestaurant, 'id');
  const restaurantName = await I.grabAttributeFrom(firstRestaurant, 'name');

  // Navigate and wait for detail page
  await I.click(firstRestaurant);
  await I.waitForElement('#detail-content', 10);
  await I.waitForElement('#likeButtonContainer', 10);

  // Wait for like button and click
  await I.waitForElement('#likeButton', 20);
  await I.waitForClickable('#likeButton', 10);
  await I.click('#likeButton');
  I.wait(3); // Give more time for the operation to complete

  // Navigate to favorites and verify
  I.amOnPage('/#/favorite');
  I.dontSee('.restaurant-item__not__found');
  await I.waitForElement('card-item', 10);

  // Verify the liked restaurant
  const likedRestaurant = locate('card-item').first();
  await I.waitForElement(likedRestaurant, 10);
  const likedRestaurantId = await I.grabAttributeFrom(likedRestaurant, 'id');
  const likedRestaurantName = await I.grabAttributeFrom(likedRestaurant, 'name');

  assert.strictEqual(restaurantId, likedRestaurantId);
  assert.strictEqual(restaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('card-item', 10);

  I.click(locate('card-item').first());
  I.waitForElement('#detail-content', 10);
  I.waitForElement('#likeButton', 20);

  I.click('#likeButton');
  I.amOnPage('/#/favorite');

  I.waitForElement('card-item', 10);
  I.click(locate('card-item').first());

  I.waitForElement('#likeButton', 20);
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  // Like first restaurant
  I.waitForElement('card-item', 10);
  const firstRestaurant = locate('card-item').first();
  const firstRestaurantName = await I.grabAttributeFrom(firstRestaurant, 'name');

  await I.click(firstRestaurant);
  await I.waitForElement('#likeButton', 20);
  await I.click('#likeButton');

  // Go back and like second restaurant
  I.amOnPage('/');
  I.waitForElement('card-item', 10);
  const secondRestaurant = locate('card-item').at(2);
  const secondRestaurantName = await I.grabAttributeFrom(secondRestaurant, 'name');

  await I.click(secondRestaurant);
  await I.waitForElement('#likeButton', 20);
  await I.click('#likeButton');

  // Go to favorites and search
  I.amOnPage('/#/favorite');
  I.waitForElement('#query', 10);

  const searchQuery = firstRestaurantName.substring(1, 3);
  await I.fillField('#query', searchQuery);

  // Verify search results
  const matchingRestaurants = [firstRestaurantName, secondRestaurantName].filter((name) =>
    name.includes(searchQuery),
  );

  const visibleRestaurants = await I.grabNumberOfVisibleElements('card-item');
  assert.strictEqual(matchingRestaurants.length, visibleRestaurants);
});
