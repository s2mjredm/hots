import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { Grid, Box, PseudoBox, Flex, Text } from '@chakra-ui/core';

const Flag = ({ active, onScrollToMapIt }) => {
  const { about, learnMore, mapIt, takeAction } = useStaticQuery(graphql`
    {
      about: file(relativePath: { eq: "flag/about.png" }) {
        childImageSharp {
          fixed(width: 400, pngQuality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      learnMore: file(relativePath: { eq: "flag/learn-more.png" }) {
        childImageSharp {
          fixed(width: 400, pngQuality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      mapIt: file(relativePath: { eq: "flag/map-it.png" }) {
        childImageSharp {
          fixed(width: 400, pngQuality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      takeAction: file(relativePath: { eq: "flag/take-action.png" }) {
        childImageSharp {
          fixed(width: 400, pngQuality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const hoverStyle = img => ({
    width: 400,
    background: `url(${img.childImageSharp.fixed.src}) !important`,
    backgroundImage: `url(${img.childImageSharp.fixed.src})`,
    cursor: 'pointer',
  });

  // this is necessary as gradient is not supported by chakra-ui "bg" prop
  const linearGradientBackgrounds = {
    gray: {
      background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(229,229,229,1) 100%)',
    },
    blue: {
      background:
        'linear-gradient(180deg, rgba(0,127,235,1) 0%, rgba(115,186,246,1) 59%, rgba(188,224,253,1) 100%)',
    },
    red: { background: 'linear-gradient(180deg, rgba(252,156,153,1) 0%, rgba(235,71,76,1) 100%)' },
  };

  return (
    <Box h={[390, 460]} style={linearGradientBackgrounds.red} className="header-no-print">
      <Grid
        px={['40px', '80px', '120px']}
        w="100%"
        templateColumns={['repeat(7, 1fr)', 'repeat(11, 1fr)']}
        templateRows={['295px 155px', '396px 145px']}
      >
        <Flex
          style={linearGradientBackgrounds.blue}
          h={['295px', '396px']}
          align="center"
          justify="center"
          p={['43px', '100px']}
          gridColumn={['1 / span 4', '1 / span 3']}
          gridRow="1 / 1"
          ml={['-40px', '-80px', '-120px']}
        >
          <Text
            as="div"
            minWidth={['auto', 255]}
            color="white"
            fontFamily="Jubilat"
            fontSize={['23px', '28px']}
            lineHeight={['normal', '35px']}
            letterSpacing="1.14px"
          >
            Health, and the conditions for health, are different in each state
          </Text>
        </Flex>

        <PseudoBox
          w="100%"
          transition="width 500"
          style={active === '/' ? hoverStyle(mapIt) : linearGradientBackgrounds.red}
          _hover={hoverStyle(mapIt)}
          onClick={() => onScrollToMapIt()}
          display={['none', 'block']}
          gridRow="1 / span 2"
        />
        <Box w="100%" h="100%" style={linearGradientBackgrounds.gray} gridRow="1 / span 2" />
        <PseudoBox
          w="100%"
          style={linearGradientBackgrounds.red}
          display={['block', 'none']}
          gridRow="1 / span 2"
        />
        <PseudoBox
          w="100%"
          transition="width 500"
          style={active === 'learn-more' ? hoverStyle(learnMore) : linearGradientBackgrounds.red}
          onClick={() => navigate('/learn-more')}
          _hover={hoverStyle(learnMore)}
          display={['none', 'block']}
          gridRow="1 / span 2"
        />
        <PseudoBox
          w="100%"
          style={linearGradientBackgrounds.gray}
          display={['none', 'block']}
          gridRow="1 / span 2"
        />
        <PseudoBox
          w="100%"
          style={linearGradientBackgrounds.gray}
          display={['block', 'none']}
          gridRow="1 / span 2"
        />
        <PseudoBox
          w="100%"
          transition="width 500"
          style={active === 'take-action' ? hoverStyle(takeAction) : linearGradientBackgrounds.red}
          onClick={() => navigate('/take-action')}
          _hover={hoverStyle(takeAction)}
          display={['none', 'block']}
          gridRow="1 / span 2"
        />
        <PseudoBox
          w="100%"
          style={linearGradientBackgrounds.gray}
          display={['none', 'block']}
          gridRow="1 / span 2"
        />
        <PseudoBox
          w="100%"
          transition="width 500"
          style={active === 'about' ? hoverStyle(about) : linearGradientBackgrounds.red}
          onClick={() => navigate('/about-the-data')}
          _hover={hoverStyle(about)}
          display={['none', 'block']}
          gridRow="1 / span 2"
        />
        <PseudoBox
          w="100%"
          style={linearGradientBackgrounds.gray}
          display={['none', 'block']}
          gridRow="1 / span 2"
        />
        <Box style={linearGradientBackgrounds.gray} />
        <Box style={linearGradientBackgrounds.red} />
        <Box style={linearGradientBackgrounds.gray} />
        <Box style={linearGradientBackgrounds.red} display={['block', 'none']} />
      </Grid>
    </Box>
  );
};

Flag.propTypes = {
  active: PropTypes.string,
  onScrollToMapIt: PropTypes.func.isRequired,
};

Flag.defaultProps = {
  active: null,
};

export default Flag;
