import React, { useEffect, useState, useCallback } from 'react';
import { extent, scaleLinear, scaleQuantize, bin } from 'd3';
import { findIndex, some } from 'lodash';
import PropTypes from 'prop-types';

import { Box, Text, Flex, Icon } from '@chakra-ui/core';

import StateDotMarker from './StateDotMarker';
import MarkerDraggable from './MarkerDraggable';
import format from '../../utils/numberFormat';
import useIsMobile from '../../utils/useIsMobile';
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

const useBins = (width, domain, factor, size = 14) =>
  bin()
    .domain(extent(domain).map(r => r * factor))
    .thresholds(Math.ceil(width / (size + 1)) + 1);

const useScale = (width, domain, tickCount, positive, factor) => {
  const range = extent(domain).map(r => r * factor);
  if (positive === 'FALSE') range.reverse();

  const genColorScale = () => {
    const colors = [
      '#042351',
      '#1E306E',
      '#293989',
      '#184FAA',
      '#0066CB',
      '#0083E2',
      '#50BEFA',
      '#A2DCEE',
    ];
    if (positive === 'FALSE') colors.reverse();
    return scaleQuantize().domain(extent(domain)).range(colors).nice();
  };

  const genDotScale = () => {
    return scaleLinear().domain(range).range([0, width]).clamp(true);
  };

  const genTickScale = () => {
    return scaleLinear().domain([0, tickCount]).range([0, width]).clamp(true);
  };

  const bins = useBins(width, domain, factor);

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
  const isMobile = useIsMobile();
  const [trackRef, setTrackRef] = useState({ current: null });
  const [isTrackHoverd, setIsTrackHovered] = useState(false);

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
          pointerEvents="none"
        >
          <Box display="table" bg="white" h="68px" w="1px" />
          <Text fontFamily="proxima-nova" whiteSpace="nowrap">
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
    let size = 14;
    let histo = bins
      .value(d => parseFloat(d.indicatorValue) * metadata.factor)(dotMarkers)
      .filter(h => h.length);

    if (some(histo, h => h.length > 4)) {
      size = 10;
      histo = useBins(width, range, metadata.factor, size)
        .value(d => parseFloat(d.indicatorValue) * metadata.factor)(dotMarkers)
        .filter(h => h.length);
    }

    const values = [...dotMarkers];
    if (metadata.positive === 'FALSE') values.reverse();

    return histo.map((group, index) => {
      const placement = () => {
        if (metadata.positive === 'FALSE') {
          switch (index) {
            case 0:
              return 'top-end';
            case histo.length - 1:
              return 'top-start';
            default:
              return 'top';
          }
        } else {
          switch (index) {
            case 0:
              return 'top-start';
            case histo.length - 1:
              return 'top-end';
            default:
              return 'top';
          }
        }
      };

      return group.map((marker, bottom) => {
        const rank = findIndex(values, d => marker.state === d.state) + 1;
        const isAllwaysVisible = rank === 1 || rank === values.length;

        const leftPosition = () => {
          if (metadata.positive !== 'FALSE') {
            return placement() === 'top-start'
              ? dotScale(group.x0) - size / 2
              : dotScale(group.x1) - size / 2;
          }
          return placement() === 'top-start'
            ? dotScale(group.x1) - size / 2
            : dotScale(group.x0) - size / 2;
        };

        return (
          <StateDotMarker
            isTrackHoverd={isTrackHoverd}
            setIsTrackHovered={setIsTrackHovered}
            key={marker.state}
            state={marker.state}
            stateName={isMobile ? marker.state : states.find(s => s.state === marker.state).name}
            indicator={metadata.title}
            indicatorValue={format(
              marker.indicatorValue,
              metadata.unit,
              metadata.rounding,
              metadata.decimals,
              metadata.factor
            )}
            indicatorPosition={rank}
            leftPosition={leftPosition()}
            bottom={bottom}
            indicatorColor={colorScale(marker.indicatorValue)}
            isAllwaysVisible={isAllwaysVisible}
            placement={placement()}
            size={size}
          />
        );
      });
    });
  };

  if (!dotScale) return null;
  return (
    <Box>
      <Box px={[5, 20]} py="22px" color="gray.text" fontSize="14px">
        <Text bg="white">{metadata.definition}</Text>
      </Box>
      <Box
        className="to-print-dotchart"
        px={[5, 20]}
        pt={[24, 16]}
        pb={16}
        bg="#E5E5E5"
        color="gray.text"
      >
        <Box
          id="track"
          ref={getTrackRef}
          position="relative"
          h="58px"
          width="100%"
          className="indicator-dot-background"
        >
          {isMobile && (
            <MarkerDraggable
              indicator={indicator}
              width={width}
              positive={metadata.positive}
              setIsTrackHovered={setIsTrackHovered}
            />
          )}
          {!isMobile && dotScale && renderTicks()}
          {dotScale && renderDots()}
        </Box>
        {!isMobile && (
          <>
            <Flex color="#403F3F" paddingTop="46px" justify="space-between" align="center">
              <Flex justify="space-between">
                <Icon name="arrow-back" size="24px" />
                <Text w="max-content">
                  {metadata.positive === 'TRUE' ? metadata.low : metadata.high}
                </Text>
              </Flex>
              <hr style={{ width: '100%', borderTop: '2px solid #b6b6b6', margin: '0px 20px' }} />
              <Flex justify="space-between">
                <Text w="max-content">
                  {metadata.positive === 'TRUE' ? metadata.high : metadata.low}
                </Text>
                <Icon name="arrow-forward" size="24px" />
              </Flex>
            </Flex>
          </>
        )}
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
