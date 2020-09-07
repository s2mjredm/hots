import defaultTheme from '@chakra-ui/theme';

const theme = {
  ...defaultTheme,
  textStyles: {
    header: {
      fontFamily: 'News Cycle',
      color: '#403F3F',
      fontWeight: 'semi-bold',
    },
  },
  breakpoints: ['40em', '52em', '70em'],
};

export default theme;
