import React, { useEffect, useRef, useState } from 'react';
import { select, extent, scaleQuantize, scaleLinear } from 'd3';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/core';

import './index.css';

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
  }, [myRef]);

  return dimensions;
};

const useScale = (width, range) => {
  const [scale, setScale] = useState();

  useEffect(() => {
    setScale(() => scaleLinear().domain(extent(range)).range([0, width]).clamp(true));
  }, [width, range]);

  return scale;
};

const domainToTicks = domain => {
  const ticks = [];
  for (let index = domain[1]; index > domain[0]; index -= 1) {
    ticks.push(Math.trunc(index));
  }
  return ticks;
};

const IndicatorDotChart = ({ indicator, metadata }) => {
  const trackRef = useRef();
  const { width } = useContainerDimensions(trackRef);
  const [range, setRange] = useState(Object.keys(indicator).map(state => indicator[state]));
  const scale = useScale(width, range);

  const renderTicks = domain => {
    const ticks = domainToTicks(domain);

    return ticks.map(tick => {
      return (
        <Box
          key={tick}
          position="absolute"
          left={scale(tick) - 1}
          h="inherit"
          w="1px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box display="table" bg="white" h="68px" w="1px" />
          <Text>{tick}</Text>
        </Box>
      );
    });
  };

  if (!scale) return null;
  return (
    <Box p={[10, 20]} color="gray.text">
      <Box
        ref={trackRef}
        position="relative"
        h="58px"
        width="100%"
        className="indicator-dot-background"
      >
        {scale && renderTicks(scale.domain())}
        <Box
          position="absolute"
          left={scale(82.3) - 7}
          borderRadius="100%"
          bg="black"
          border="1px solid white"
          w="14px"
          h="14px"
        />
      </Box>
    </Box>
  );
};

export default IndicatorDotChart;
