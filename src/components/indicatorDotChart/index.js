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

const IndicatorDotChart = ({ indicator, metadata }) => {
  const trackRef = useRef();
  const { width } = useContainerDimensions(trackRef);
  const [range, setRange] = useState(Object.keys(indicator).map(state => indicator[state]));
  const scale = useScale(width, range);

  console.log(extent(range));
  try {
    // scale.range();
    console.log('wdi', width, scale(81.4));
    // console.log(scale(81.4));
  } catch (error) {
    // console.log(error);
  }

  // const renderTicks = () => {};
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
        <Box
          position="absolute"
          left={scale(82.3) - 7}
          borderRadius="100%"
          bg="black"
          border="1px solid white"
          w="14px"
          h="14px"
        />

        <Box
          position="absolute"
          left={scale(80) - 1}
          h="inherit"
          w="1px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box display="table" bg="white" h="68px" w="1px" />
          <Text>80</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default IndicatorDotChart;
