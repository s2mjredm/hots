import React, { useEffect, useState, useCallback } from 'react';
import { extent, scaleLinear, scaleQuantize, bin } from 'd3';
import { findIndex } from 'lodash';
import PropTypes from 'prop-types';

import { Box, Text, Flex, Divider, Icon } from '@chakra-ui/core';

import StateDotMarker from './StateDotMarker';
import format from '../../utils/numberFormat';
import './index.css';

// The number of tick markers in the chart
const TICK_COUNT = 6;

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
  }, [myRef.current]);

  return dimensions;
};

const useScale = (width, domain, tickCount, positive, factor) => {
  const range = extent(domain).map(r => r * factor);
  if (positive === 'FALSE') range.reverse();

  const genColorScale = () => {
    return scaleQuantize()
      .domain(range)
      .range([
        '#042351',
        '#1E306E',
        '#293989',
        '#184FAA',
        '#0066CB',
        '#0083E2',
        '#50BEFA',
        '#A2DCEE',
      ])
      .nice();
  };

  const genDotScale = () => {
    return scaleLinear().domain(range).range([0, width]).clamp(true);
  };

  const genTickScale = () => {
    return scaleLinear().domain([0, tickCount]).range([0, width]).clamp(true);
  };

  const bins = bin()
    .domain(extent(domain).map(r => r * factor))
    .thresholds(Math.ceil(width / 15) + 1);

  const [dotScale, setScale] = useState(genDotScale());
  const [tickScale, setTickScale] = useState(genTickScale());
  const [colorScale, setColorScale] = useState(genColorScale());

  useEffect(() => {
    setScale(() => genDotScale());
    setTickScale(() => genTickScale());
    setColorScale(() => genColorScale());
  }, [width, domain]);

  return [dotScale, tickScale, colorScale, bins];
};

const useGenStateDotMarkers = indicator => {
  const [dotMarkers, setDotMarkers] = useState();

  const genStateDotMarkers = () =>
    Object.keys(indicator)
      .map(state => {
        return {
          state,
          indicatorValue: indicator[state],
        };
      })
      .sort((a, b) => {
        return b.indicatorValue - a.indicatorValue;
      });

  useEffect(() => {
    if (!indicator) return;
    setDotMarkers(() => genStateDotMarkers());
  }, [indicator]);

  return dotMarkers;
};

const IndicatorDotChart = ({ indicator, metadata, states }) => {
  const [trackRef, setTrackRef] = useState({ current: null });
  const { width } = useContainerDimensions(trackRef);
  const [range /* ,setRange */] = useState(
    Object.keys(indicator)
      .map(state => parseFloat(indicator[state]))
      .filter(d => d)
  );
  const [dotScale, tickScale, colorScale, bins] = useScale(
    width,
    range,
    TICK_COUNT,
    metadata.positive,
    metadata.factor
  );
  const dotMarkers = useGenStateDotMarkers(indicator, colorScale, dotScale);
  if (dotMarkers && metadata.positive === 'FALSE') dotMarkers.reverse();

  const getTrackRef = useCallback(node => {
    if (node !== null) {
      setTrackRef({ current: node });
    }
  }, []);

  const renderTicks = () => {
    const tickCountPlusLastTick = TICK_COUNT + 1;
    return [...Array(tickCountPlusLastTick).keys()].map(tick => {
      return (
        <Box
          key={tick}
          position="absolute"
          left={tickScale(tick) - 1}
          h="inherit"
          w="1px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box display="table" bg="white" h="68px" w="1px" />
          <Text fontFamily="proxima-nova">
            {format(
              dotScale.invert(tickScale(tick)),
              metadata.unit,
              metadata.rounding,
              metadata.decimals
            )}
          </Text>
        </Box>
      );
    });
  };

  const renderDots = () => {
    const histo = bins
      .value(d => parseFloat(d.indicatorValue) * metadata.factor)(dotMarkers)
      .filter(h => h.length);

    return histo.map((group, index) => {
      const isAllwaysVisible = index === 0 || index === histo.length - 1;

      const placement = () => {
        switch (index) {
          case 0:
            return 'top-end';
          case histo.length - 1:
            return 'top-start';
          default:
            return 'top';
        }
      };

      return group.map((marker, bottom) => (
        <StateDotMarker
          key={marker.state}
          state={marker.state}
          stateName={states.find(s => s.state === marker.state).name}
          indicator={metadata.title}
          indicatorValue={format(
            marker.indicatorValue,
            metadata.unit,
            metadata.rounding,
            metadata.decimals,
            metadata.factor
          )}
          indicatorPosition={findIndex(dotMarkers, d => marker.state === d.state) + 1}
          leftPosition={
            placement() === 'top-start' ? dotScale(group.x1) - 7 : dotScale(group.x0) - 7
          }
          bottom={bottom}
          indicatorColor={colorScale(marker.indicatorValue)}
          isAllwaysVisible={isAllwaysVisible}
          placement={placement()}
        />
      ));
    });
  };

  if (!dotScale) return null;
  return (
    <Box>
      <Box px={[5, 20]} py="22px" color="gray.text" fontSize="14px">
        <Text bg="white">{metadata.definition}</Text>
      </Box>
      <Box px={[5, 20]} py={16} bg="#E5E5E5" color="gray.text">
        <Box
          ref={getTrackRef}
          position="relative"
          h="58px"
          width="100%"
          className="indicator-dot-background"
        >
          {dotScale && renderTicks()}
          {dotScale && renderDots()}
        </Box>
        <Flex color="#403F3F" paddingTop="46px" justify="space-between">
          <Flex justify="space-between">
            <Icon name="arrow-back" size="24px" />
            <Text>{metadata.positive === 'TRUE' ? metadata.low : metadata.high}</Text>
          </Flex>
          <Divider />
          <Flex justify="space-between">
            <Text>{metadata.positive === 'TRUE' ? metadata.high : metadata.low}</Text>
            <Icon name="arrow-forward" size="24px" />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

IndicatorDotChart.propTypes = {
  indicator: PropTypes.shape().isRequired,
  metadata: PropTypes.shape().isRequired,
  states: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default IndicatorDotChart;
