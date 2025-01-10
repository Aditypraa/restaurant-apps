export default {
  '*.{ts,tsx,js,json}': () => [
    'npm run prettier:check',
    'npm run prettier:write',
    'npm run lint',
    'npm run lint:fix',
  ],
};
