import { theme } from '@chakra-ui/core';

const ctheme = {
  ...theme,
  // colors: {
  //   transparent: 'transparent',
  //   black: '#000',
  //   white: '#fff',
  //   gray: {
  //     50: '#f7fafc',
  //     900: '#1a202c',
  //   },
  // },
  textStyles: {
    header: {
      fontFamily: 'News Cycle',
      color: '#403F3F',
      fontWeight: 'semi-bold',
    },
    titles: {
      fontFamily: 'Montserrat',
      color: '#403F3F',
      letterSpacing: '-0.03rem',
      fontWeight: 'bold',
    },
  },
  breakpoints: ['40em', '52em', '70em'],
};

export default ctheme;
