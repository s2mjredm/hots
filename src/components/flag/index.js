import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Grid, Box, PseudoBox } from '@chakra-ui/core';

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

  return (
    <Grid
      w="100%"
      h={500}
      templateColumns={['repeat(5, 1fr)', 'repeat(7, 1fr)']}
      gap={[35, 50, 90, 110]}
    >
      <Box w="100%" h="100%" bg="#EB474C" />
      <Box w="100%" h="100%" bg="#EB474C" />
      <PseudoBox
        w="100%"
        h="100%"
        bg="#EB474C"
        transition="width 500"
        style={active === '/' ? hoverStyle(mapIt) : null}
        _hover={hoverStyle(mapIt)}
      />
      <PseudoBox
        w="100%"
        h="100%"
        bg="#EB474C"
        transition="width 500"
        style={active === 'learn-more' ? hoverStyle(learnMore) : null}
        _hover={hoverStyle(learnMore)}
      />
      <PseudoBox
        w="100%"
        h="100%"
        bg="#EB474C"
        transition="width 500"
        style={active === 'take-action' ? hoverStyle(takeAction) : null}
        _hover={hoverStyle(takeAction)}
      />
      <PseudoBox
        w="100%"
        h="100%"
        bg="#EB474C"
        transition="width 500"
        style={active === 'about' ? hoverStyle(learnMore) : null}
        _hover={hoverStyle(about)}
      />
      <PseudoBox w="100%" h="100%" bg="#EB474C" display={['none', 'block']} />
    </Grid>
  );
};

Flag.propTypes = {
  active: PropTypes.string,
};

Flag.defaultProps = {
  active: null,
};

export default Flag;
