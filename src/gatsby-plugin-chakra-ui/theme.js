import defaultTheme from '@chakra-ui/theme';

const theme = {
  ...defaultTheme,
  colors: {
    gray: {
      text: '#403F3F',
    },
  },
  textStyles: {
    header: {
      fontFamily: 'News Cycle',
      color: '#403F3F',
      fontWeight: 'semi-bold',
    },
    titles: {
      fontFamily: 'Montserrat',
      color: '#403F3F',
      letterSpacing: '-0.06rem',
      fontWeight: 'bold',
    },
  },
  breakpoints: ['40em', '52em', '70em'],
};

export default theme;
