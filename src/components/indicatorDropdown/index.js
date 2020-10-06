import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, navigate } from 'gatsby';

import { Box, Button, Flex } from '@chakra-ui/core';

import SearchSelectInput from './SearchSelectInput';
import useNavigate from './useNavigate';

import './index.css';

const IndicatorDropdown = ({ onShowAll, buttonText }) => {
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
    <Box px={[10, 20]} paddingBottom={[10]} color="gray.text">
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
          w="auto"
          flex="0 0 auto"
          fontSize={['26px', '16px']}
          onClick={() => navigate(url)}
        >
          {buttonText}
        </Button>
      </Flex>
    </Box>
  );
};

IndicatorDropdown.propTypes = {
  onShowAll: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

IndicatorDropdown.defaultProps = {
  buttonText: 'EXPLORE STATE RANKINGS',
};

export default IndicatorDropdown;
