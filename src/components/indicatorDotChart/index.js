import React, { useEffect, useState, useCallback } from 'react';
import { extent, scaleLinear, scaleQuantize } from 'd3';
import PropTypes from 'prop-types';

import { Box, Text, Flex, Divider, Icon } from '@chakra-ui/core';

import StateDotMarker from './StateDotMarker';
import format from '../../utils/numberFormat';

import './index.css';

// The number of tick markers in the chart
const TICK_COUNT = 6;

const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    height: myRef.current.offsetHeight,
  });

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef.current]);

  return dimensions;
};

const useScale = (width, domain, tickCount) => {
  const genColorScale = () => {
    return scaleQuantize()
      .domain(extent(domain))
      .range([
        '#042351',
        '#1E306E',
        '#293989',
        '#184FAA',
        '#0066CB',
        '#0083E2',
        '#50BEFA',
        '#A2DCEE',
      ])
      .nice();
  };

  const genDotScale = () => {
    return scaleLinear().domain(extent(domain)).range([0, width]).clamp(true);
  };

  const genTickScale = () => {
    return scaleLinear().domain([0, tickCount]).range([0, width]).clamp(true);
  };

  const [dotScale, setScale] = useState(genDotScale());
  const [tickScale, setTickScale] = useState(genTickScale());
  const [colorScale, setColorScale] = useState(genColorScale());

  useEffect(() => {
    setScale(() => genDotScale());
    setTickScale(() => genTickScale());
    setColorScale(() => genColorScale());
  }, [width, domain]);

  return [dotScale, tickScale, colorScale];
};

const useGenStateDotMarkers = indicator => {
  const [dotMarkers, setDotMarkers] = useState();

  const genStateDotMarkers = () =>
    Object.keys(indicator)
      .map(state => {
        return {
          state,
          indicatorValue: indicator[state],
        };
      })
      .sort((a, b) => {
        return b.indicatorValue - a.indicatorValue;
      });

  useEffect(() => {
    if (!indicator) return;
    setDotMarkers(() => genStateDotMarkers());
  }, [indicator]);

  return dotMarkers;
};

const IndicatorDotChart = ({ indicator, metadata }) => {
  const [trackRef, setTrackRef] = useState({ current: null });
  const { width } = useContainerDimensions(trackRef);
  const [range /* ,setRange */] = useState(Object.keys(indicator).map(state => indicator[state]));
  const [dotScale, tickScale, colorScale] = useScale(width, range, TICK_COUNT);
  const dotMarkers = useGenStateDotMarkers(indicator, colorScale, dotScale);

  const getTrackRef = useCallback(node => {
    if (node !== null) {
      setTrackRef({ current: node });
    }
  }, []);

  const renderTicks = () => {
    return [...Array(TICK_COUNT).keys()].map(tick => {
      return (
        <Box
          key={tick}
          position="absolute"
          left={tickScale(tick) - 1}
          h="inherit"
          w="1px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box display="table" bg="white" h="68px" w="1px" />
          <Text fontFamily="Montserrat">
            {format(
              dotScale.invert(tickScale(tick)),
              metadata.unit,
              metadata.rounding,
              metadata.decimals
            )}
          </Text>
        </Box>
      );
    });
  };

  const renderDots = () => {
    return dotMarkers.map((marker, index) => {
      const isAllwaysVisible = index === 0 || index === 50;

      const placement = () => {
        switch (index) {
          case 0:
            return 'top-end';
          case 50:
            return 'top-start';
          default:
            return 'top';
        }
      };
      return (
        <StateDotMarker
          key={marker.state}
          state={marker.state}
          indicatorValue={format(marker.indicatorValue, metadata.unit, metadata.rounding)}
          indicatorPosition={index + 1}
          leftPosition={dotScale(marker.indicatorValue) - 7}
          indicatorColor={colorScale(marker.indicatorValue)}
          isAllwaysVisible={isAllwaysVisible}
          placement={placement()}
        />
      );
    });
  };

  if (!dotScale) return null;
  return (
    <Box>
      <Box px={[10, 20]} py={16} bg="#E5E5E5" color="gray.text">
        <Box
          ref={getTrackRef}
          position="relative"
          h="58px"
          width="100%"
          className="indicator-dot-background"
        >
          {dotScale && renderTicks()}
          {dotScale && renderDots()}
        </Box>
        <Flex color="#403F3F" paddingTop="46px" justify="space-between">
          <Flex justify="space-between">
            <Icon name="arrow-back" size="24px" />
            <Text>{metadata.low}</Text>
          </Flex>
          <Divider />
          <Flex justify="space-between">
            <Text>{metadata.high}</Text>
            <Icon name="arrow-forward" size="24px" />
          </Flex>
        </Flex>
      </Box>
      <Box px={[10, 20]} py="22px" color="gray.text" fontSize="14px">
        <Text bg="white">
          <Text fontFamily="Montserrat" as="span" paddingRight="5px">
            VARIABLE DEFINITION
          </Text>
          {metadata.definition}
        </Text>
      </Box>
    </Box>
  );
};

IndicatorDotChart.propTypes = {
  indicator: PropTypes.shape().isRequired,
  metadata: PropTypes.shape().isRequired,
};

export default IndicatorDotChart;
