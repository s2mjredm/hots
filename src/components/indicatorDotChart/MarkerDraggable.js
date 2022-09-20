import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Box } from '@chakra-ui/react';
import { sortBy, mapValues } from 'lodash';
import DotMarkerProbe from './DotMarkerProbe';

const MarkerDraggable = ({ indicator, width, positive, setIsTrackHovered }) => {
  const ranked = sortBy(
    mapValues(indicator, (i, state) => ({ state, value: parseFloat(i) })),
    v => v.value
  );
  const [probeData, setProbeData] = useState({
    indicatorPosition: null,
    stateName: null,
    indicatorValue: null,
    placement: 'top',
  });
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState('50%');

  const onTouchMove = e => {
    if (isDragging) {
      const x = Math.min(width, Math.max(0, e.touches[0].clientX - 70));
      setPosition(`${x}px`);
      const i = Math.round((x / width) * (ranked.length - 1));

      let placement = 'top';
      if (i < 10) placement = 'top-start';
      if (i > 40) placement = 'top-end';

      setProbeData({
        indicatorPosition: Math.abs(positive ? i - ranked.length : i + i),
        stateName: ranked[i].state,
        indicatorValue: ranked[i].value,
        placement,
      });
    }
  };
  return (
    <DotMarkerProbe isOpen={isDragging} {...probeData}>
      <Box
        h="100%"
        left={position}
        ml="-30px"
        position="absolute"
        onTouchStart={() => {
          setDragging(true);
          setIsTrackHovered(true);
        }}
        onTouchEnd={() => {
          setDragging(false);
          setIsTrackHovered(false);
          setPosition('50%');
        }}
        onTouchMove={onTouchMove}
      >
        <Icon name="cursorArrow" w="60px" mt="calc(50% - 8px)" />
      </Box>
    </DotMarkerProbe>
  );
};

MarkerDraggable.propTypes = {
  indicator: PropTypes.PropTypes.shape(),
  width: PropTypes.number,
  positive: PropTypes.string,
  setIsTrackHovered: PropTypes.func,
};

export default MarkerDraggable;
