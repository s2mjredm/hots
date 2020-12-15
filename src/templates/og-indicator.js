import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Box, Grid, Flex, Text } from '@chakra-ui/core';
import { last } from 'lodash';

import TheMap from '../components/theMap';

import './state.css';
import Logo from '../svg/logo.svg';

const Indicator = ({
  data: {
    metadata,
    indicator,
    states: { stateName },
    logo,
  },
}) => {
  const rankings = Object.keys(indicator)
    .map(state => ({
      state,
      value: parseFloat(indicator[state]),
      name: stateName.find(s => s.state === state).name,
    }))
    .sort((a, b) => (a.value - b.value) * (metadata.positive ? -1 : 1));

  return (
    <Grid
      w="1200px"
      h="630px"
      templateColumns="35% 1fr"
      gridColumnGap="29px"
      pl={50}
      fontSize="24px"
    >
      <Box gridArea="1 / 1 / 2 / 2" mt={80} p={['80px', 0]}>
        <Text>stateofhealth.org</Text>
      </Box>
      <Flex
        gridArea="2 / 1 / 4 / 2"
        bg="white"
        direction="column"
        h="100%"
        justify="space-between"
        pb={100}
        p={['40px', 0]}
      >
        <Box>
          <Text fontFamily="Jubilat" pb="20px" fontSize="40px">
            <span style={{ color: '#009FFA' }}>{metadata.title}</span>
            <span>in the United States </span>
          </Text>
          <Text fontFamily="proxima-nova">
            <span>{`Out of 50 states ${rankings[0].name} ranks 1`}</span>
            <sup>st</sup>
            <span>{` and ${last(rankings).name} ranks ${rankings.length - 1}`}</span>
            <sup>th</sup>
            <span>{` for ${metadata.name}`}</span>
          </Text>
        </Box>
        <Box>
          <Flex>
            <Img fixed={logo.childImageSharp.fixed} />
            <Box h="40px" w="80px" px="10px" ml="10px" borderLeft="2px solid black">
              <Logo />
            </Box>
            <Text fontFamily="proxima-nova" lineHeight="40px" fontSize="30px">
              State of Health
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Box gridArea="1 / 2 / 4 / 3">
        <TheMap indicator={indicator} metadata={metadata} hideButtons zoomOut={false} />
      </Box>
    </Grid>
  );
};

Indicator.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Indicator;

export const query = graphql`
  query indexPageOG($id: String) {
    metadata: indicatorsJson(id: { eq: $id }) {
      title
      positive
    }
    indicator: indicatorsJson(id: { eq: $id }) {
      ...States
    }
    states: allStatesJson {
      stateName: nodes {
        name
        state
      }
    }
    logo: file(relativePath: { eq: "logos/center-logo-small.png" }) {
      childImageSharp {
        fixed(width: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
