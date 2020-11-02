import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import { Box, useDisclosure, Heading, Text, Icon } from '@chakra-ui/core';
import Layout from '../components/layout';
import IndicatorDropdown from '../components/indicatorDropdown';
import IndicatorMap from '../components/indicatorMap';
import IndicatorModal from '../components/indicatorModal';
import IndicatorDotChart from '../components/indicatorDotChart';
import Social from '../components/social';

const Index = ({
  location,
  data: {
    metadata,
    indicator,
    allStatesJson: { stateName },
  },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: socialIsOpen, onOpen: socialOnOpen, onClose: socialOnClose } = useDisclosure();

  return (
    <Layout location={location}>
      <Box
        px={[10, 20, 120]}
        py={90}
        // bg="blue.600"
        zIndex="2"
        style={{
          background:
            'linear-gradient(180deg, rgba(24,69,149,1) 0%, rgba(24,69,149,1) 45%, rgba(255,255,255,1) 100%)',
        }}
      >
        <Box bg="white">
          <Box px={[10, 20]} pt={[10, 20]} color="gray.text">
            <Heading fontFamily="proxima-nova" color="#403F3F">
              How is your state doing?
            </Heading>
            <Text my={3} fontSize={24} fontFamily="Jubilat" letterSpacing="-0.06rem">
              Map it! Choose a health statistic or outcome to see results mapped for the whole
              United States. Select a state for more detailed information on that state’s health:
            </Text>
          </Box>
          <Box px={[10, 20]} paddingBottom={[10]}>
            <IndicatorDropdown onShowAll={() => onOpen()} initialIndicator={metadata.title} />
          </Box>
          <IndicatorModal isOpen={isOpen} onClose={() => onClose()} />
          <IndicatorMap indicator={indicator} onShare={() => socialOnOpen()} />
          <Box px={[10, 20]} py={16} fontFamily="proxima-nova" fontSize="18px" fontWeight="600">
            {`Click to explore how U.S. States rank for ${metadata.title}.`}
          </Box>
          <IndicatorDotChart indicator={indicator} metadata={metadata} states={stateName} />
          <Social
            isOpen={socialIsOpen}
            url={location.href}
            onOpen={() => socialOnOpen()}
            onClose={() => socialOnClose()}
          />
        </Box>
        <Heading fontFamily="Jubilat" color="#403F3F" paddingTop="120px" w="920px">
          Living conditions in states play a large role in shaping opportunities for health.
        </Heading>
        <Link to="/learn-more">
          <Text
            paddingTop="90px"
            fontFamily="proxima-nova"
            fontSize="18px"
            textDecoration="underline"
            w="260px"
          >
            Learn how, and what states can do to improve health
            <Icon name="arrow-forward" />
          </Text>
        </Link>
      </Box>
    </Layout>
  );
};
Index.propTypes = {
  data: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

export default Index;

export const query = graphql`
  fragment States on IndicatorsJson {
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
    metadata: indicatorsJson(id: { eq: $id }) {
      title
      definition
      unit
      rounding
      decimals
      factor
      positive
      high
      low
    }
    indicator: indicatorsJson(id: { eq: $id }) {
      ...States
    }
    allStatesJson {
      stateName: nodes {
        name
        state
      }
    }
  }
`;
