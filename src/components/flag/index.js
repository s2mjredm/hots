import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Grid, Box, PseudoBox, Flex, Text } from '@chakra-ui/core';

const Flag = ({ active }) => {
  const { about, learnMore, mapIt, takeAction } = useStaticQuery(graphql`
    {
      about: file(relativePath: { eq: "flag/about.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      learnMore: file(relativePath: { eq: "flag/learn-more.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mapIt: file(relativePath: { eq: "flag/map-it.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      takeAction: file(relativePath: { eq: "flag/take-action.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const hoverStyle = img => ({
    width: 400,
    backgroundImage: `url(${img.childImageSharp.fluid.src})`,
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
    <Box h={500} bg="#EB474C">
      <Flex
        position="absolute"
        style={linearGradientBackgrounds.blue}
        w={['225px', '405px']}
        h={['225px', '396px']}
        align="center"
        justify="center"
        p={['43px', '100px']}
      >
        <Text
          color="white"
          fontFamily="Jubilat"
          fontSize={['16px', '28px']}
          line-height={['normal', '35px']}
        >
          Health, and the conditions for health, are different in each state
        </Text>
      </Flex>
      <Grid px="120px" h={600} w="100%" templateColumns={['repeat(5, 1fr)', 'repeat(11, 1fr)']}>
        <Box w="100%" h="100%" style={linearGradientBackgrounds.gray} />
        <Box w="100%" h="100%" bg="#EB474C" />
        <Box w="100%" h="100%" style={linearGradientBackgrounds.gray} />
        <PseudoBox
          w="100%"
          h="100%"
          bg="#EB474C"
          transition="width 500"
          style={active === '/' ? hoverStyle(mapIt) : null}
          _hover={hoverStyle(mapIt)}
          display={['none', 'block']}
        />
        <Box w="100%" h="100%" style={linearGradientBackgrounds.gray} />
        <PseudoBox w="100%" h="100%" bg="#EB474C" display={['block', 'none']} />
        <PseudoBox
          w="100%"
          h="100%"
          bg="#EB474C"
          transition="width 500"
          style={active === 'learn-more' ? hoverStyle(learnMore) : null}
          _hover={hoverStyle(learnMore)}
          display={['none', 'block']}
        />
        <PseudoBox w="100%" h="100%" bg="#EB474C" display={['block', 'none']} />
        <PseudoBox
          w="100%"
          h="100%"
          style={linearGradientBackgrounds.gray}
          display={['none', 'block']}
        />
        <PseudoBox w="100%" h="100%" bg="#EB474C" display={['block', 'none']} />
        <PseudoBox
          w="100%"
          h="100%"
          bg="#EB474C"
          transition="width 500"
          style={active === 'take-action' ? hoverStyle(takeAction) : null}
          _hover={hoverStyle(takeAction)}
          display={['none', 'block']}
        />
        <PseudoBox
          w="100%"
          h="100%"
          style={linearGradientBackgrounds.gray}
          display={['none', 'block']}
        />
        <PseudoBox
          w="100%"
          h="100%"
          bg="#EB474C"
          transition="width 500"
          style={active === 'about' ? hoverStyle(about) : null}
          _hover={hoverStyle(about)}
          display={['none', 'block']}
        />
        <PseudoBox
          w="100%"
          h="100%"
          style={linearGradientBackgrounds.gray}
          display={['none', 'block']}
        />
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
