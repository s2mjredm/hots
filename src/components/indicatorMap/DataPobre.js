import React from 'react';
import { Portal } from 'react-portal';

import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/core';

const DataPobre = ({ selectedStateName, indicatorRank, indicatorName, indicatorValue, pos }) => {
  const height = 100;
  const width = 280;
  return (
    <Portal>
      <Flex
        w={width}
        h={height}
        borderRadius="1px"
        zIndex={9999}
        py="8px"
        px="12px"
        border="1px solid  #E2E8F0"
        align="center"
        pointerEvents="none"
        position="absolute"
        top={pos[1] - height - 10}
        left={pos[0] - width / 2}
        bg="white"
      >
        <Box
          w="64px"
          h="64px"
          bg="#0083E2"
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
        <Box paddingLeft={3}>
          <Text fontFamily="proxima-nova" color="#B4B4B4" fontSize="16px" fontWeight="800" mb="1px">
            {indicatorName}
          </Text>
          <Text fontFamily="proxima-nova" color="#403F3F" fontSize="20px" fontWeight="800" mb="2px">
            {selectedStateName}
          </Text>
          <Text fontFamily="proxima-nova" color="#0083E2" fontSize="20px" fontWeight="600">
            {indicatorValue}
          </Text>
        </Box>
      </Flex>
    </Portal>
  );
};
DataPobre.propTypes = {
  indicatorRank: PropTypes.number.isRequired,
  selectedStateName: PropTypes.string.isRequired,
  indicatorName: PropTypes.string.isRequired,
  indicatorValue: PropTypes.string.isRequired,
  pos: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default DataPobre;
