import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, navigate } from 'gatsby';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/core';

import SearchSelectInput from './SearchSelectInput';
import useNavigate from './useNavigate';

import './index.css';

const IndicatorDropdown = ({ onShowAll }) => {
  const [selectedIndicator, setSelectedIndicator] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [isNavigationEnabled, url] = useNavigate(selectedIndicator, selectedState);

  const { allStatesCsv, allIndicatorsCsv } = useStaticQuery(graphql`
    query DataQuery {
      allStatesCsv {
        nodes {
          name
        }
      }
      allIndicatorsCsv {
        nodes {
          title
        }
      }
    }
  `);
  const indicatorList = allIndicatorsCsv.nodes.map(indicator => indicator.title);
  const stateList = allStatesCsv.nodes.map(state => state.name);

  const handleIndicatorSelection = indicator => {
    setSelectedIndicator(indicator);
  };
  const handleStateSelection = state => {
    setSelectedState(state);
  };

  return (
    <Box p={[10, 20]} color="gray.text">
      <Heading fontFamily="Montserrat" color="#403F3F">
        How is your state doing?
      </Heading>
      <Text my={3} fontSize={24} fontFamily="Roboto Slab" letterSpacing="-0.06rem">
        Map it! Choose a health statistic or outcome to see results mapped for the whole United
        States. Select a state for more detailed information on that state’s health:
      </Text>
      <Flex
        py={25}
        direction={['column', 'column', 'row']}
        fontSize="sm"
        alignItems="flex-end"
        justify={['start', 'space-between']}
      >
        <SearchSelectInput
          label="Health Statistics & Outcomes"
          placeholder="Select or Search"
          selectedItem={selectedIndicator}
          items={indicatorList}
          onSelection={indicator => handleIndicatorSelection(indicator)}
        />
        <Button
          display={['none', 'block']}
          variant="link"
          size="md"
          color="#F06060"
          minW="100px"
          mb={3}
          onClick={() => onShowAll()}
        >
          SHOW ALL
        </Button>
        <SearchSelectInput
          label="State"
          placeholder="Select or Search"
          selectedItem={selectedState}
          items={stateList}
          onSelection={state => handleStateSelection(state)}
        />
        <Button
          isDisabled={!isNavigationEnabled}
          bg="#F06060"
          _hover={{ bg: '#FFB3B3' }}
          color="white"
          size="lg"
          h={[20, 12]}
          w={['100%', '100%', 'xs']}
          minWidth={['100&', '190px']}
          fontSize={['26px', '16px']}
          onClick={() => navigate(url)}
        >
          EXPLORE STATE RANKINGS
        </Button>
      </Flex>
    </Box>
  );
};

IndicatorDropdown.propTypes = {
  onShowAll: PropTypes.func.isRequired,
};

export default IndicatorDropdown;
