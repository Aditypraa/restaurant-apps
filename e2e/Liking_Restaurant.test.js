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

  try {
    // Wait and verify restaurants loaded
    I.waitForElement('card-item', 30);
    I.seeElement('card-item');

    // Get first restaurant info before liking
    const firstCard = locate('card-item').first();
    I.waitForElement(firstCard, 10);

    const cardWrapper = locate('.card-wrapper').first();
    const restaurantId = await I.grabAttributeFrom(cardWrapper, 'id');
    const restaurantName = await I.grabTextFrom(locate('h3 a').first());
    console.log('Restaurant before unliking:', { restaurantId, restaurantName });

    // Like the restaurant first
    I.click(locate('h3 a').first());
    I.waitForElement('#likeButton', 30);
    I.click('#likeButton');
    I.wait(2);

    // Verify restaurant is in favorites
    I.amOnPage('/#/favorite');
    I.waitForElement('card-item', 30);
    I.dontSee('Tidak ada restaurant untuk ditampilkan');

    // Get restaurant details from favorites
    const likedCard = locate('card-item').first();
    const likedName = await I.grabTextFrom(locate('h3 a').first());
    assert.strictEqual(
      likedName.trim(),
      restaurantName.trim(),
      'Restaurant should be in favorites',
    );

    // Unlike the restaurant
    I.click(locate('h3 a').first());
    I.waitForElement('#likeButton', 30);
    I.click('#likeButton');
    I.wait(2);

    // Verify restaurant is removed from favorites
    I.amOnPage('/#/favorite');
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  } catch (error) {
    console.error('Test failed with error:', error);
    console.log('Current URL:', await I.grabCurrentUrl());
    throw error;
  }
});
