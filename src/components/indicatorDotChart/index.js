import React, { useEffect, useRef, useState, useCallback } from 'react';
import { select, extent, scaleLinear } from 'd3';

import { Box, PseudoBox, Button, Flex, Heading, Text } from '@chakra-ui/core';

import StateDotMarker from './StateDotMarker';
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
      console.log('slol');

      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef.current]);

  return dimensions;
};

const useScale = (width, range) => {
  const [scale, setScale] = useState(
    scaleLinear().domain(extent(range)).range([0, width]).clamp(true)
  );
  const [tickScale, setTickScale] = useState(
    scaleLinear().domain([0, TICK_COUNT]).range([0, width]).clamp(true)
  );

  useEffect(() => {
    setScale(() => scaleLinear().domain(extent(range)).range([0, width]).clamp(true));
    setTickScale(() => scaleLinear().domain([0, TICK_COUNT]).range([0, width]).clamp(true));
  }, [width, range]);

  return [scale, tickScale];
};

const IndicatorDotChart = ({ indicator, metadata }) => {
  const [trackRef, setTrackRef] = useState({ current: null });
  const { width } = useContainerDimensions(trackRef);
  const [range /* ,setRange */] = useState(Object.keys(indicator).map(state => indicator[state]));
  const [scale, tickScale] = useScale(width, range);

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
          <Text>{scale.invert(tickScale(tick)).toFixed(1)}</Text>
        </Box>
      );
    });
  };

  const renderDots = () => {
    return Object.keys(indicator).map(state => {
      return (
        <StateDotMarker
          key={state}
          state={state}
          indicatorValue={indicator[state]}
          leftPosition={scale(indicator[state]) - 7}
        />
      );
    });
  };

  if (!scale) return null;
  return (
    <Box p={[10, 20]} color="gray.text">
      <Box
        ref={getTrackRef}
        position="relative"
        h="58px"
        width="100%"
        className="indicator-dot-background"
      >
        {scale && renderTicks()}
        {scale && renderDots()}
      </Box>
    </Box>
  );
};

export default IndicatorDotChart;
