import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {},
  plugins: [require('@tailwindcss/forms')],
};
export default config;
