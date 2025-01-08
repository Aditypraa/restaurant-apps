/* eslint-disable no-undef */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'dist/images');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  console.log(`Processing image: ${image}`);

  // Large version
  sharp(`${target}/${image}`)
    .resize(1200)
    .toFile(path.resolve(destination, `${image.split('.').slice(0, -1).join('.')}-large.jpg`))
    .then(() => {
      console.log(`Processed ${image} to large size`);
    })
    .catch((err) => {
      console.error(`Error processing ${image} to large size:`, err);
    });

  // Medium version
  sharp(`${target}/${image}`)
    .resize(800)
    .toFile(path.resolve(destination, `${image.split('.').slice(0, -1).join('.')}-medium.jpg`))
    .then(() => {
      console.log(`Processed ${image} to medium size`);
    })
    .catch((err) => {
      console.error(`Error processing ${image} to medium size:`, err);
    });

  // Small version
  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(path.resolve(destination, `${image.split('.').slice(0, -1).join('.')}-small.jpg`))
    .then(() => {
      console.log(`Processed ${image} to small size`);
    })
    .catch((err) => {
      console.error(`Error processing ${image} to small size:`, err);
    });
});
