import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Box, Grid, useDisclosure, Heading, Text } from '@chakra-ui/core';
import Layout from '../components/layout';
import IndicatorDropdown from '../components/indicatorDropdown';
import IndicatorMap from '../components/indicatorMap';
import IndicatorModal from '../components/indicatorModal';

const Index = ({ data: { /* metadata, */ indicator } }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      {/* <h1>{metadata.title}</h1>
      {parse(metadata.definition)}
      <ul>
        {Object.keys(indicator).map(state => (
          <li key={state}>
            <b>{`${state}: `}</b>
            {indicator[state]}
          </li>
        ))}
      </ul> */}

      <Grid
        w="100%"
        h={500}
        templateColumns={['repeat(5, 1fr)', 'repeat(7, 1fr)']}
        gap={[35, 50, 90, 110]}
      >
        <Box w="100%" h="100%" bg="#EB474C" />
        <Box w="100%" h="100%" bg="#EB474C" />
        <Box w="100%" h="100%" bg="#EB474C" />
        <Box w="100%" h="100%" bg="#EB474C" />
        <Box w="100%" h="100%" bg="#EB474C" />
        <Box w="100%" h="100%" bg="#EB474C" display={['none', 'block']} />
        <Box w="100%" h="100%" bg="#EB474C" display={['none', 'block']} />
      </Grid>
      <Box
        px={[10, 20, 120]}
        py={120}
        // bg="linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(24,69,149,1) 31%, rgba(24,69,149,1) 70%, rgba(255,255,255,1) 100%)"
        bg="blue.600"
      >
        <Box px={[10, 20]} bg="white">
          <Box pt={[10, 20]} color="gray.text">
            <Heading fontFamily="Montserrat" color="#403F3F">
              How is your state doing?
            </Heading>
            <Text my={3} fontSize={24} fontFamily="Jubilat" letterSpacing="-0.06rem">
              Map it! Choose a health statistic or outcome to see results mapped for the whole
              United States. Select a state for more detailed information on that state’s health:
            </Text>
          </Box>
          <IndicatorDropdown onShowAll={() => onOpen()} />
          <IndicatorModal isOpen={isOpen} onClose={() => onClose()} />
          <IndicatorMap indicator={indicator} />
        </Box>
      </Box>
    </Layout>
  );
};
Index.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Index;

export const query = graphql`
  fragment States on IndicatorsCsv {
    AL
    AK
    AZ
    AR
    CA
    CO
    CT
    DE
    DC
    FL
    GA
    HI
    ID
    IL
    IN
    IA
    KS
    KY
    LA
    ME
    MD
    MA
    MI
    MN
    MS
    MO
    MT
    NE
    NV
    NH
    NJ
    NM
    NY
    NC
    ND
    OH
    OK
    OR
    PA
    RI
    SC
    SD
    TN
    TX
    UT
    VT
    VA
    WA
    WV
    WI
    WY
  }
  query indexPage($id: String) {
    metadata: indicatorsCsv(id: { eq: $id }) {
      title
      definition
      high
      low
    }
    indicator: indicatorsCsv(id: { eq: $id }) {
      ...States
    }
  }
`;
