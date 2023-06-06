/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./index.html",
    "./resources/js/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite/**/*.{vue,js,jsx,ts,tsx}',
    'node_modules/flowbite-vue/**/*.{vue,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '100%': { right: 0 },
        },
      },
      animation: {
        'slide-from-right': 'slide 0.5s forwards',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          // values from config and defaults you wish to use most
          values: Object.assign(
            theme('bgGradientDeg', {}), // name of config key. Must be unique
            {
              10: '10deg', // bg-gradient-10
              15: '15deg',
              20: '20deg',
              25: '25deg',
              30: '30deg',
              45: '45deg',
              60: '60deg',
              90: '90deg',
              120: '120deg',
              135: '135deg',
            }
          )
        }
      )
    })
  ],
}
