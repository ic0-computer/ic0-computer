/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      colors: {
        dfpurple: '#662584',
        dfpink: '#ee1f7a',
        dfblue: '#2aabe3',
        dforange: '#f05b24',
        dfyellow: '#faaf3d',
        uglyblue: '#3c00bb',
        uglypink: '#eed6f6',
        dflightgray: '#d0d5dd',
        dfdarkgray: '#5b6370',
        bypurple: '#70007a',
        bygreen: '#337971',
        byblue: '#336699',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        internet: {
          ...require("daisyui/src/theming/themes")["forest"],
          primary: '#522785',
          secondary: '#ED1E79',
          accent: '#FBB03B',
          neutral: '#101010',
          custom: {
            background: '#1E1E1E',
            text: '#F5F5F5',
          },
        },
        computer: {
          ...require("daisyui/src/theming/themes")["forest"],
          primary: '#29ABE2',
          secondary: '#F15A24',
          neutral: '#232025',
          custom: {
            background: '#F5F5F5',
            text: '#333333',
          },
        },
        protocol: {
          ...require("daisyui/src/theming/themes")["forest"],
          primary: '#FBB03B',
          secondary: '#d3d3d3',
          accent: '#F15A24',
          neutral: '#0E031F',
          custom: {
            background: '#1E1E1E',
            text: '#F5F5F5',
          },
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'forest',
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    textColor: ['responsive', 'hover', 'focus', 'active'],
    borderColor: ['responsive', 'hover', 'focus', 'active'],
    buttonColor: ['responsive', 'hover', 'focus', 'active'],
  },
};
