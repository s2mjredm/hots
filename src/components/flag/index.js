import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { Grid, Box, PseudoBox, Flex, Text } from '@chakra-ui/core';

const Flag = ({ active }) => {
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
    backgroundImage: `url(${img.childImageSharp.fixed.src})`,
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
  };

  return (
    <Box h={[390, 460]} bg="#EB474C">
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
          bg="#EB474C"
          transition="width 500"
          style={active === '/' ? hoverStyle(mapIt) : null}
          _hover={hoverStyle(mapIt)}
          display={['none', 'block']}
          gridRow="1 / span 2"
        />
        <Box w="100%" h="100%" style={linearGradientBackgrounds.gray} gridRow="1 / span 2" />
        <PseudoBox w="100%" bg="#EB474C" display={['block', 'none']} gridRow="1 / span 2" />
        <PseudoBox
          w="100%"
          bg="#EB474C"
          transition="width 500"
          style={active === 'learn-more' ? hoverStyle(learnMore) : null}
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
          bg="#EB474C"
          transition="width 500"
          style={active === 'take-action' ? hoverStyle(takeAction) : null}
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
          bg="#EB474C"
          transition="width 500"
          style={active === 'about' ? hoverStyle(about) : null}
          onClick={() => navigate('/about')}
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
        <Box bg="#EB474C" />
        <Box style={linearGradientBackgrounds.gray} />
        <Box bg="#EB474C" display={['block', 'none']} />
      </Grid>
    </Box>
  );
};

Flag.propTypes = {
  active: PropTypes.string,
};

Flag.defaultProps = {
  active: null,
};

export default Flag;
