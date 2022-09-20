import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import { Box, useDisclosure, Heading, Text, Icon } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Layout from '../components/layout';
import IndicatorModal from '../components/indicatorModal';
import IndicatorDropdown from '../components/indicatorDropdown';
import TheMap from '../components/theMap';
import IndicatorDotChart from '../components/indicatorDotChart';
import Social from '../components/social';

import Cursor from '../svg/cursor.svg';

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
  const [selectedState, setSelectedState] = useState();

  return (
    <Layout location={location} description={metadata.definition} ogImage>
      <Box
        className="to-print-index-page"
        px={[10, 20, 120]}
        py={[50, 80]}
        zIndex="2"
        style={{
          background:
            'linear-gradient(180deg, rgba(24,69,149,1) 0%, rgba(24,69,149,1) 45%, rgba(255,255,255,1) 100%)',
        }}
      >
        <Box bg="white" shadow="lg">
          <Box px={[5, 20]} pt={[10, 20]} color="gray.text">
            <Heading
              fontFamily="proxima-nova"
              color="#403F3F"
              fontWeight={['900', '800']}
              fontSize={['20px', '1.875rem']}
            >
              How is your state doing?
            </Heading>
            <Text
              my={3}
              fontSize={[15, 24]}
              fontFamily={['proxima-nova', 'Jubilat']}
              color="#403F3F"
            >
              Map it! Choose a health statistic or outcome to see results mapped for the whole
              United States. Select a state for more detailed information on that state’s health:
            </Text>
          </Box>
          <Box px={[5, 20]} paddingBottom={[10]}>
            <IndicatorDropdown
              onShowAll={() => onOpen()}
              initialIndicator={metadata.title}
              onSelectState={state => setSelectedState(state)}
            />
          </Box>
          <IndicatorModal isOpen={isOpen} onClose={() => onClose()} />
          <TheMap
            indicator={indicator}
            onShare={() => socialOnOpen()}
            metadata={metadata}
            selectedState={selectedState}
          />
          <Box
            px={[5, 20]}
            pt={[5, 16]}
            fontFamily="proxima-nova"
            fontSize="18px"
            fontWeight="600"
            display={['none', 'block']}
          >
            <Cursor style={{ display: 'inline-block', marginRight: 15 }} />
            {`Hover to explore how U.S. States rank for ${metadata.title}.`}
          </Box>
          <Box
            px={[5, 20]}
            py={[5, 16]}
            fontFamily="proxima-nova"
            fontSize="12px"
            fontWeight="600"
            display={['block', 'none']}
          >
            {`Tap to explore how U.S. States rank for ${metadata.title}.`}
          </Box>

          <IndicatorDotChart indicator={indicator} metadata={metadata} states={stateName} />
          <Social
            isOpen={socialIsOpen}
            url={location.href}
            pathname={location.pathname}
            onOpen={() => socialOnOpen()}
            onClose={() => socialOnClose()}
          />
        </Box>
        <Heading
          fontFamily="Jubilat"
          fontSize={['38px']}
          color="#403F3F"
          paddingTop={['100px', '120px']}
          w={['100%', '100%', '920px']}
          fontWeight="500"
        >
          Living conditions in states play a large role in shaping opportunities for health.
        </Heading>
        <Link to="/learn-more">
          <Text
            paddingTop={['40px', '90px']}
            fontFamily="proxima-nova"
            fontSize="18px"
            textDecoration="underline"
            w="260px"
          >
            Learn how, and what states can do to improve health
            <ArrowForwardIcon />
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
