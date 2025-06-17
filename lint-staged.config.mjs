export default {
  '*.{js,jsx}': [
    'prettier --write', // Format file yang di-stage
    'eslint --fix', // Fix lint issues pada file yang di-stage
  ],
  '*.{json,css,scss,md}': [
    'prettier --write', // Format non-JS files
  ],
};
