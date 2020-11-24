import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Box,
  PopoverBody,
  Text,
} from '@chakra-ui/core';

import useIsMobile from '../../utils/useIsMobile';

const DotMarkerProbe = ({
  children,
  placement,
  isOpen,
  close,
  isAllwaysVisible,
  indicatorColor,
  indicatorPosition,
  stateName,
  indicatorValue,
}) => {
  const initialFocusRef = React.useRef();
  const isMobile = useIsMobile();

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
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent
          zIndex={isAllwaysVisible ? 3 : 4}
          marginBottom="40px"
          w={[100, 'auto']}
          h="62px"
          borderRadius="0px"
          border="none"
          ml={isMobile && placement === 'top-start' ? '10px' : 0}
          mr={isMobile && placement === 'top-end' ? '10px' : 0}
        >
          <PopoverArrow
            ml={placement === 'top-start' ? '2px' : 0}
            mr={placement === 'top-end' ? '2px' : 0}
          />
          <Box
            w={['50%', '48px']}
            h={['auto', '48px']}
            bg={['none', indicatorColor]}
            borderRadius={[0, '100%']}
            position="absolute"
            left={[0, '-24px']}
            top="8px"
            color={['#403F3F', 'white']}
            textAlign="center"
            lineHeight={['24px', '49px']}
            fontFamily="Jubilat"
            fontSize="24px"
            borderRight={['1px solid #b4b4b4', 'none']}
          >
            {indicatorPosition}
            {isMobile && (
              <Text fontSize={16} fontFamily="News Cycle" fontWeight={700} color="#b4b4b4">
                RANK
              </Text>
            )}
          </Box>
          <PopoverBody paddingLeft={['calc(50% + 5px)', '28px']}>
            <Text
              fontFamily="proxima-nova"
              color="#403F3F"
              size="16px"
              fontWeight="800"
              display="inline-block"
              w={['auto', '100px']}
              h="20px"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {stateName}
            </Text>
            <Text
              fontFamily={['News Cycle', 'proxima-nova']}
              color={['#B4B4B4', indicatorColor]}
              size="16px"
              fontWeight={[700, 600]}
              mt="-2px"
              w={['auto', '100px']}
            >
              {isMobile ? 'STATE' : indicatorValue}
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
DotMarkerProbe.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  isOpen: PropTypes.bool,
  close: PropTypes.func.isRequired,
  isAllwaysVisible: PropTypes.bool,
  indicatorColor: PropTypes.string.isRequired,
  indicatorPosition: PropTypes.number.isRequired,
  stateName: PropTypes.string.isRequired,
  indicatorValue: PropTypes.string.isRequired,
};

DotMarkerProbe.defaultProps = {
  placement: 'top',
  isOpen: false,
  isAllwaysVisible: false,
};

export default DotMarkerProbe;
