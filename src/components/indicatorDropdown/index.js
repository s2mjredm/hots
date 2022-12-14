import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, navigate } from 'gatsby';

import { Box, Button, Flex } from '@chakra-ui/react';

import chroma from 'chroma-js';

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
  onSelectState,
}) => {
  const [selectedIndicator, setSelectedIndicator] = useState(initialIndicator);
  const [selectedState, setSelectedState] = useState(initialState);
  const [isNavigationEnabled, url] = useNavigate(selectedIndicator, selectedState);

  const { allStatesJson, allIndicatorsJson } = useStaticQuery(graphql`
    query DataQuery {
      allStatesJson {
        nodes {
          state
          name
        }
      }
      allIndicatorsJson {
        nodes {
          title
          shortlist
        }
      }
    }
  `);
  const indicatorList = allIndicatorsJson.nodes.map(indicator => indicator.title);
  const indicatorShortList = allIndicatorsJson.nodes
    .filter(indicator => indicator.shortlist === 'TRUE')
    .map(indicator => indicator.title);
  const stateList = allStatesJson.nodes.map(state => state.name);

  const handleIndicatorSelection = indicator => {
    const pathParts = window.location.pathname.split('/');
    pathParts[1] = slugify(indicator);
    navigate(pathParts.join('/'));
    setSelectedIndicator(indicator);
  };
  const handleStateSelection = state => {
    setSelectedState(state);
    onSelectState(allStatesJson.nodes.find(_state => _state.name === state));
  };

  return (
    <Box color="gray.text">
      <Flex
        py={15}
        direction={['column', 'column', 'row']}
        fontSize="sm"
        alignItems={['center', 'center', 'flex-end']}
        justify={['start', 'start', 'space-between']}
      >
        <Box zIndex="3" width="100%">
          <SearchSelectInput
            label="Health Statistics & Outcomes"
            placeholder="Select or Search"
            selectedItem={selectedIndicator}
            items={indicatorList}
            itemsShortList={indicatorShortList}
            onSelection={indicator => handleIndicatorSelection(indicator)}
            onShowAll={onShowAll}
          />
        </Box>
        <Button
          width="228px"
          m={3}
          display={['none', 'block']}
          variant="link"
          size="md"
          fontFamily="proxima-nova"
          fontWeight="800"
          fontSize="14px"
          color={showAllColor}
          onClick={() => onShowAll()}
        >
          SHOW ALL
        </Button>
        <Box zIndex="2" width="100%">
          <SearchSelectInput
            label="State"
            placeholder="Select or Search"
            selectedItem={selectedState}
            items={stateList}
            onSelection={state => handleStateSelection(state)}
          />
        </Box>
        <Button
          marginLeft={[0, 0, 5]}
          mt={[3, 3, 0]}
          isDisabled={!isNavigationEnabled}
          bg={buttonColor}
          _hover={{ bg: chroma(buttonColor).brighten(1).hex() }}
          color="white"
          size="lg"
          h={[12, 12]}
          w={['100%', '100%', 'auto']}
          flex="0 0 auto"
          fontSize={['10px', '16px']}
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
  onSelectState: PropTypes.func,
};

IndicatorDropdown.defaultProps = {
  buttonText: 'EXPLORE STATE RANKINGS',
  buttonColor: '#F06060',
  showAllColor: '#F06060',
  initialIndicator: '',
  initialState: '',
  onSelectState: () => {},
};

export default IndicatorDropdown;
