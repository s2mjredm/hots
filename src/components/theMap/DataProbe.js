import React from 'react';
import { Portal } from 'react-portal';

import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/core';

const DataProbe = ({
  selectedStateName,
  indicatorRank,
  indicatorName,
  indicatorValue,
  pos,
  dotColor,
}) => {
  const height = 100;
  const width = 240;
  return (
    <Portal>
      <Flex
        h={height}
        borderRadius="1px"
        zIndex={1}
        py="8px"
        px="20px"
        border="1px solid #E2E8F0"
        align="center"
        pointerEvents="none"
        position="absolute"
        top={pos[1] - height - 10}
        left={pos[0] - width / 2}
        bg="white"
        shadow="lg"
      >
        <Box
          w="64px"
          h="64px"
          bg={dotColor}
          borderRadius="100%"
          top="8px"
          color="white"
          textAlign="center"
          lineHeight="62px"
          fontFamily="Jubilat"
          fontSize="38px"
        >
          {indicatorRank}
        </Box>
        <Box paddingLeft="20px">
          <Text
            fontFamily="News Cycle"
            color="#B4B4B4"
            fontSize="14px"
            fontWeight="800"
            textTransform="uppercase"
            my="-3px"
          >
            {indicatorName}
          </Text>
          <Text fontFamily="proxima-nova" color="#403F3F" fontSize="20px" fontWeight="800">
            {selectedStateName}
          </Text>
          <Text
            my="-7px"
            fontFamily="proxima-nova"
            color="#0083E2"
            fontSize="20px"
            fontWeight="600"
          >
            {indicatorValue}
          </Text>
        </Box>
      </Flex>
    </Portal>
  );
};
DataProbe.propTypes = {
  indicatorRank: PropTypes.number.isRequired,
  selectedStateName: PropTypes.string.isRequired,
  indicatorName: PropTypes.string.isRequired,
  indicatorValue: PropTypes.string.isRequired,
  pos: PropTypes.arrayOf(PropTypes.number).isRequired,
  dotColor: PropTypes.string.isRequired,
};

export default DataProbe;
