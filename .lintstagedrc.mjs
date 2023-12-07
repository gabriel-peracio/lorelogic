export default {
  "*.{js,jsx,ts,tsx,css,scss}": ["prettier --write"],
  "*.{ts,tsx}": [() => "tsc --skipLibCheck --noEmit"],
  "*.scss": ["stylelint"],
};
