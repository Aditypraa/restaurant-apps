export default {
  '*.{ts,tsx,js,json}': () => [
    'npm run lint',
    'npm run prettier:check',
    'npm run lint:fix',
    'npm run prettier:write',
  ],
};
