import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, navigate } from 'gatsby';

import { Box, Button, Flex } from '@chakra-ui/core';

import SearchSelectInput from './SearchSelectInput';
import useNavigate from './useNavigate';
import { slugify } from '../../utils/slugify';

import './index.css';

const IndicatorDropdown = ({
  onShowAll,
  buttonText,
  buttonColor,
  showAllColor,
  initialIndicator,
  initialState,
}) => {
  const [selectedIndicator, setSelectedIndicator] = useState(initialIndicator);
  const [selectedState, setSelectedState] = useState(initialState);
  const [isNavigationEnabled, url] = useNavigate(selectedIndicator, selectedState);

  const { allStatesJson, allIndicatorsJson } = useStaticQuery(graphql`
    query DataQuery {
      allStatesJson {
        nodes {
          name
        }
      }
      allIndicatorsJson {
        nodes {
          title
        }
      }
    }
  `);
  const indicatorList = allIndicatorsJson.nodes.map(indicator => indicator.title);
  const stateList = allStatesJson.nodes.map(state => state.name);

  const handleIndicatorSelection = indicator => {
    const pathParts = window.location.pathname.split('/');
    pathParts[1] = slugify(indicator);
    navigate(pathParts.join('/'));
    setSelectedIndicator(indicator);
  };
  const handleStateSelection = state => {
    setSelectedState(state);
  };

  return (
    <Box color="gray.text">
      <Flex
        py={15}
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
          color={showAllColor}
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
          marginLeft={[0, 5]}
          isDisabled={!isNavigationEnabled}
          bg={buttonColor}
          _hover={{ bg: '#FFB3B3' }}
          color="white"
          size="lg"
          h={[20, 12]}
          w={['-webkit-fill-available', 'auto']}
          flex="0 0 auto"
          fontSize={['large', '16px']}
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
  buttonColor: PropTypes.string,
  showAllColor: PropTypes.string,
  initialIndicator: PropTypes.string,
  initialState: PropTypes.string,
};

IndicatorDropdown.defaultProps = {
  buttonText: 'EXPLORE STATE RANKINGS',
  buttonColor: '#F06060',
  showAllColor: '#F06060',
  initialIndicator: '',
  initialState: '',
};

export default IndicatorDropdown;
