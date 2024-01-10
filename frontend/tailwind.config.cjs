/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      colors: {
        internet: '#29ABE2',
        computer: '#F15A24',
        protocol: '#FBB03B',
        'custom-1': '#522785',
        'custom-2': '#ED1E79',
        'custom-3': '#0E031F',
        'custom-4': '#F5F5F5',
        dark: '#232025',
        light: '#d5cdc4',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        internet: {
          primary: '#522785',
          secondary: '#ED1E79',
          accent: '#FBB03B',
          neutral: '#101010',
          custom: {
            background: '#1E1E1E',
            text: '#F5F5F5',
          },
          components: {
            button: {
              backgroundColor: '#29ABE2',
              color: '#F5F5F5',
              padding: '.5rem 1rem',
              borderRadius: '.25rem',
              fontWeight: 'bold',
              boxShadow: '0px 3px 5px #F5F5F5',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 5px 8px #F5F5F5',
              },
            },
            card: {
              backgroundColor: '#1E1E1E',
              padding: '1rem',
              borderRadius: '.25rem',
              boxShadow: '0px 3px 5px #F5F5F5',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 5px 8px #F5F5F5',
              },
            },
            input: {
              borderRadius: '.25rem',
              padding: '.5rem',
              borderWidth: '1px',
              borderColor: '#F5F5F5',
              '&:focus': {
                borderColor: '#29ABE2',
                boxShadow: '0 0 0 3px #E5F5FB',
              },
            },
          },
        },
        computer: {
          primary: '#29ABE2',
          secondary: '#F15A24',
          neutral: '#232025',
          custom: {
            background: '#F5F5F5',
            text: '#333333',
          },
          components: {
            button: {
              backgroundColor: '#FBB03B',
              color: '#fff',
              padding: '.5rem 1rem',
              borderRadius: '.25rem',
              fontWeight: 'bold',
              boxShadow: '0px 3px 5px #ccc',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 5px 8px #ccc',
              },
            },
            card: {
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '.25rem',
              boxShadow: '0px 3px 5px #ccc',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 5px 8px #ccc',
              },
            },
            input: {
              borderRadius: '.25rem',
              padding: '.5rem',
              borderWidth: '1px',
            },
          },
        },
        protocol: {
          primary: '#FBB03B',
          secondary: '#d3d3d3',
          accent: '#F15A24',
          neutral: '#0E031F',
          custom: {
            background: '#1E1E1E',
            text: '#F5F5F5',
          },
          components: {
            button: {
              backgroundColor: '#F15A24',
              color: '#F5F5F5',
              padding: '.5rem 1rem',
              borderRadius: '.25rem',
              fontWeight: 'bold',
              boxShadow: '0px 3px 5px #F5F5F5',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 5px 8px #F5F5F5',
              },
            },
            card: {
              backgroundColor: '#1E1E1E',
              padding: '1rem',
              borderRadius: '.25rem',
              boxShadow: '0px 3px 5px #F5F5F5',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 5px 8px #F5F5F5',
              },
            },
            input: {
              borderRadius: '.25rem',
              padding: '.5rem',
              borderWidth: '1px',
              borderColor: '#F5F5F5',
              '&:focus': {
                borderColor: '#F15A24',
                boxShadow: '0 0 0 3px #E5F5FB',
              },
            },
          },
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'black',
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    textColor: ['responsive', 'hover', 'focus', 'active'],
    borderColor: ['responsive', 'hover', 'focus', 'active'],
    buttonColor: ['responsive', 'hover', 'focus', 'active'],
  },
};
