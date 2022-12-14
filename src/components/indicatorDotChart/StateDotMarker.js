import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { Box } from '@chakra-ui/react';

import DotMarkerProbe from './DotMarkerProbe';
import { slugify } from '../../utils/slugify';
import useIsMobile from '../../utils/useIsMobile';

const StateDotMarker = props => {
  const {
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
    isTrackHoverd,
    setIsTrackHovered,
  } = props;
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!!isAllwaysVisible);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const open = () => {
    setIsMouseOver(true);
    setIsTrackHovered(true);
    if (!isAllwaysVisible) {
      setIsOpen(true);
    }
  };

  const close = () => {
    setIsMouseOver(false);
    setIsTrackHovered(false);
    if (!isAllwaysVisible) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isTrackHoverd && isAllwaysVisible && !isMouseOver) {
      setIsOpen(false);
    } else if (!isTrackHoverd && isAllwaysVisible) {
      setIsOpen(true);
    }
  }, [isTrackHoverd, isMouseOver]);

  if (!leftPosition) return null;

  return (
    <DotMarkerProbe
      placement={placement}
      isOpen={isOpen}
      close={close}
      isAllwaysVisible={isAllwaysVisible}
      indicatorColor={indicatorColor}
      indicatorPosition={indicatorPosition}
      stateName={stateName}
      indicatorValue={indicatorValue}
    >
      <Box
        visibility={['hidden', 'visible']}
        position="absolute"
        left={leftPosition}
        bottom={`${bottom * size}px`}
        borderRadius="100%"
        bg="black"
        border="1px solid white"
        w={['40px', `${size}px`]}
        h={['100%', `${size}px`]}
        ml={['-15px', 0]}
        _hover={{ bg: 'white' }}
        onMouseEnter={open}
        onMouseLeave={close}
        onClick={() => !isMobile && navigate(`/${slugify(indicator)}/${slugify(stateName)}`)}
      />
    </DotMarkerProbe>
  );
};

StateDotMarker.propTypes = {
  stateName: PropTypes.string,
  indicator: PropTypes.string,
  indicatorValue: PropTypes.string,
  leftPosition: PropTypes.number,
  bottom: PropTypes.number,
  indicatorColor: PropTypes.string,
  indicatorPosition: PropTypes.number,
  isAllwaysVisible: PropTypes.bool,
  placement: PropTypes.string,
  size: PropTypes.number,
  isTrackHoverd: PropTypes.bool,
  setIsTrackHovered: PropTypes.func,
};

StateDotMarker.defaultProps = {
  placement: 'top',
  bottom: 0,
  size: 14,
};

export default StateDotMarker;
