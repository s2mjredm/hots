import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Text,
} from '@chakra-ui/core';

const DataPobre = ({
  indicatorRank,
  selectedStateName,
  indicatorName,
  indicatorValue,
  leftPosition,
}) => {
  return (
    <Popover isOpen placement="top">
      <PopoverTrigger>
        <Box position="absolute" bg="white" shadow="sm" left={leftPosition} top="55%" />
      </PopoverTrigger>
      <PopoverContent zIndex={4} marginBottom="40px" borderRadius="0px">
        <PopoverArrow />
        <PopoverBody display="flex" alignItems="center">
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
            <Text fontFamily="Montserrat" color="#B4B4B4" fontSize="16px" fontWeight="800" mb="1px">
              {indicatorName}
            </Text>
            <Text fontFamily="Montserrat" color="#403F3F" fontSize="20px" fontWeight="800" mb="2px">
              {selectedStateName}
            </Text>
            <Text fontFamily="Montserrat" color="#0083E2" fontSize="20px" fontWeight="600">
              {indicatorValue}
            </Text>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

DataPobre.propTypes = {
  indicatorRank: PropTypes.number.isRequired,
  selectedStateName: PropTypes.string.isRequired,
  indicatorName: PropTypes.string.isRequired,
  indicatorValue: PropTypes.string.isRequired,
  leftPosition: PropTypes.number.isRequired,
};

export default DataPobre;
