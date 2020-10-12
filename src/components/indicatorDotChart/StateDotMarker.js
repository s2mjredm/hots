import React from 'react';
import PropTypes from 'prop-types';
import {
  PseudoBox,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Text,
} from '@chakra-ui/core';

const StateDotMarker = ({
  state,
  indicatorValue,
  indicatorColor,
  indicatorPosition,
  leftPosition,
  isAllwaysVisible,
  placement,
}) => {
  const [isOpen, setIsOpen] = React.useState(isAllwaysVisible);
  const open = () => setIsOpen(!isOpen);
  const close = () => {
    if (!isAllwaysVisible) {
      setIsOpen(false);
    }
  };

  if (!leftPosition) return null;

  return (
    <Popover
      placement={placement}
      closeOnBlur={false}
      transformOrigin="45px"
      isOpen={isOpen}
      onClose={close}
    >
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
          onMouseEnter={open}
          onMouseLeave={close}
        />
      </PopoverTrigger>
      <PopoverContent zIndex={4} marginBottom="40px" w="121px" h="62px" borderRadius="0px">
        <PopoverArrow />
        <Box
          w="48px"
          h="48px"
          bg={indicatorColor}
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
          {indicatorPosition}
        </Box>
        <PopoverBody paddingLeft="28px">
          <Text fontFamily="Montserrat" color="#403F3F" size="16px" fontWeight="800" mb="3px">
            {state}
          </Text>
          <Text fontFamily="Montserrat" color={indicatorColor} size="16px" fontWeight="600">
            {indicatorValue}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

StateDotMarker.defaultProps = {
  placement: 'top',
};

StateDotMarker.propTypes = {
  state: PropTypes.string.isRequired,
  indicatorValue: PropTypes.string.isRequired,
  leftPosition: PropTypes.number.isRequired,
  indicatorColor: PropTypes.string.isRequired,
  indicatorPosition: PropTypes.number.isRequired,
  isAllwaysVisible: PropTypes.bool.isRequired,
  placement: PropTypes.string,
};
export default StateDotMarker;
