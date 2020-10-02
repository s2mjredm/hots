import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  PseudoBox,
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Text,
} from '@chakra-ui/core';

const StateDotMarker = ({ state, indicatorValue, leftPosition }) => {
  if (!leftPosition) return null;

  return (
    <Popover placement="top" closeOnBlur={false} transformOrigin="45px">
      <PopoverTrigger>
        <PseudoBox
          position="absolute"
          left={leftPosition}
          bottom="1px"
          borderRadius="100%"
          bg="black"
          border="1px solid white"
          w="14px"
          h="14px"
          _hover={{ bg: 'white' }}
        />
      </PopoverTrigger>
      <PopoverContent
        zIndex={4}
        marginBottom="40px"
        w="121px"
        h="62px"
        borderRadius="0px"
        // position="relative"
        // display="flex"
      >
        <PopoverArrow />
        <Box
          w="48px"
          h="48px"
          bg="blue.600"
          borderRadius="100%"
          position="absolute"
          left="-24px"
          top="8px"
          color="white"
          textAlign="center"
          lineHeight="49px"
          fontFamily="Jubilat"
          fontSize="24px"
        >
          54
        </Box>
        <PopoverBody paddingLeft="28px">
          <Text fontFamily="Montserrat" color="#403F3F" size="16px" fontWeight="800" mb="3px">
            {state}
          </Text>
          <Text fontFamily="Montserrat" color="#009FFA" size="16px" fontWeight="600">
            {indicatorValue}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
StateDotMarker.propTypes = {
  state: PropTypes.string.isRequired,
  indicatorValue: PropTypes.string.isRequired,
  leftPosition: PropTypes.string.isRequired,
};
export default StateDotMarker;
