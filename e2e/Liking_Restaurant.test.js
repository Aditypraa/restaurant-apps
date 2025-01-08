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

  try {
    // Wait and verify restaurants loaded
    I.waitForElement('card-item', 30);
    I.seeElement('card-item');

    // Get first restaurant info
    const firstCard = locate('card-item').first();
    I.waitForElement(firstCard, 10);

    // Get restaurant details from card wrapper
    const cardWrapper = locate('.card-wrapper').first();
    const restaurantId = await I.grabAttributeFrom(cardWrapper, 'id');
    const restaurantName = await I.grabTextFrom(locate('h3 a').first());
    console.log('Restaurant before liking:', { restaurantId, restaurantName });

    // Click the restaurant title link
    I.click(locate('h3 a').first());

    // Wait for detail page and like button
    I.waitForElement('#detail-content', 30);
    I.waitForElement('#likeButtonContainer', 30);
    I.waitForElement('#likeButton', 30);

    // Click like button and wait for state update
    I.click('#likeButton');
    I.wait(2);

    // Go to favorites page
    I.amOnPage('/#/favorite');
    I.waitForElement('card-item', 30);

    // Verify restaurant appears in favorites
    I.dontSee('Tidak ada restaurant untuk ditampilkan');

    // Get liked restaurant details
    const likedCardWrapper = locate('.card-wrapper').first();
    const likedId = await I.grabAttributeFrom(likedCardWrapper, 'id');
    const likedName = await I.grabTextFrom(locate('h3 a').first());
    console.log('Restaurant after liking:', { likedId, likedName });

    // Verify it's the same restaurant
    assert.strictEqual(likedId, restaurantId, 'Restaurant IDs should match');
    assert.strictEqual(likedName.trim(), restaurantName.trim(), 'Restaurant names should match');
  } catch (error) {
    console.error('Test failed with error:', error);
    console.log('Current URL:', await I.grabCurrentUrl());
    throw error;
  }
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
  // Add first restaurant to favorites
  I.amOnPage('/');
  I.waitForElement('card-item', 30);

  const firstRestaurant = locate('card-item').first();
  const firstRestaurantName = await I.grabAttributeFrom(firstRestaurant, 'name');

  I.click(firstRestaurant);
  I.waitForElement('#likeButton', 30);
  I.click('#likeButton');
  I.wait(2);

  // Add second restaurant to favorites
  I.amOnPage('/');
  I.waitForElement('card-item', 30);

  const secondRestaurant = locate('card-item').at(2);
  const secondRestaurantName = await I.grabAttributeFrom(secondRestaurant, 'name');

  I.click(secondRestaurant);
  I.waitForElement('#likeButton', 30);
  I.click('#likeButton');
  I.wait(2);

  // Perform search
  I.amOnPage('/#/favorite');
  I.waitForElement('#query', 30);

  const searchQuery = firstRestaurantName.substring(1, 3).toLowerCase();
  I.fillField('#query', searchQuery);
  I.wait(2);

  // Count visible restaurants that match search
  const visibleCards = await I.grabNumberOfVisibleElements('card-item');
  const expectedMatches = [firstRestaurantName, secondRestaurantName].filter((name) =>
    name.toLowerCase().includes(searchQuery),
  ).length;

  assert.strictEqual(
    visibleCards,
    expectedMatches,
    'Number of visible restaurants should match search results',
  );
});
