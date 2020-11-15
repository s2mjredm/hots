import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
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

import { slugify } from '../../utils/slugify';

const StateDotMarker = ({
  stateName,
  indicator,
  indicatorValue,
  indicatorColor,
  indicatorPosition,
  leftPosition,
  bottom,
  isAllwaysVisible,
  placement,
  size,
}) => {
  const [isOpen, setIsOpen] = useState(!!isAllwaysVisible);
  const open = () => {
    if (!isAllwaysVisible) {
      setIsOpen(true);
    }
  };

  const close = () => {
    if (!isAllwaysVisible) {
      setIsOpen(false);
    }
  };

  const initialFocusRef = React.useRef();

  if (!leftPosition) return null;

  return (
    <>
      <span ref={initialFocusRef} style={{ position: 'fixed', top: '0' }} />
      <Popover
        placement={placement}
        closeOnBlur={false}
        transformOrigin="45px"
        isOpen={isOpen}
        onClose={close}
        initialFocusRef={initialFocusRef}
      >
        <PopoverTrigger>
          <PseudoBox
            position="absolute"
            left={leftPosition}
            bottom={`${bottom * size}px`}
            borderRadius="100%"
            bg="black"
            border="1px solid white"
            w={`${size}px`}
            h={`${size}px`}
            _hover={{ bg: 'white' }}
            onMouseEnter={open}
            onMouseLeave={close}
            onClick={() => navigate(`/${slugify(indicator)}/${slugify(stateName)}`)}
          />
        </PopoverTrigger>
        <PopoverContent
          zIndex={isAllwaysVisible ? 3 : 4}
          marginBottom="40px"
          w="auto"
          h="62px"
          borderRadius="0px"
          border="none"
        >
          <PopoverArrow
            ml={placement === 'top-start' ? '2px' : 0}
            mr={placement === 'top-end' ? '2px' : 0}
          />
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
            <Text
              fontFamily="proxima-nova"
              color="#403F3F"
              size="16px"
              fontWeight="800"
              display="inline-block"
              w="90px"
              h="20px"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {stateName}
            </Text>
            <Text
              fontFamily="proxima-nova"
              color={indicatorColor}
              size="16px"
              fontWeight="600"
              mt="-2px"
            >
              {indicatorValue}
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

StateDotMarker.propTypes = {
  stateName: PropTypes.string.isRequired,
  indicator: PropTypes.string.isRequired,
  indicatorValue: PropTypes.string.isRequired,
  leftPosition: PropTypes.number.isRequired,
  bottom: PropTypes.number,
  indicatorColor: PropTypes.string.isRequired,
  indicatorPosition: PropTypes.number.isRequired,
  isAllwaysVisible: PropTypes.bool.isRequired,
  placement: PropTypes.string,
  size: PropTypes.number,
};

StateDotMarker.defaultProps = {
  placement: 'top',
  bottom: 0,
  size: 14,
};

export default StateDotMarker;
