import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import { select, extent, scaleQuantize } from 'd3';
import { groupBy } from 'lodash';
import { Box, Button, Icon } from '@chakra-ui/core';

import DataProbe from './DataProbe';
import MapLow from './MapLow';
import MapHigh from './MapHigh';

import { slugify } from '../../utils/slugify';
import format from '../../utils/numberFormat';
import useIsMobile from '../../utils/useIsMobile';
import ZoomButton from '../../svg/zoom.svg';

import './index.css';

const TheMap = ({ indicator, onShare, metadata, selectedState, highRes, zoomOut }) => {
  let {
    allStatesJson: { states },
  } = useStaticQuery(graphql`
    {
      allStatesJson {
        states: nodes {
          state
          name
        }
      }
    }
  `);
  states = groupBy(states, 'state');

  const svgRef = useRef();

  const { state: stateId } = selectedState;

  const [isZoomOut, setIsZoomOut] = useState(!!zoomOut);

  const isMobile = useIsMobile();

  const [colorScale, setColorScale] = useState({ scale: () => '#0083E2' });

  const [dataPobreData, setDataPobreData] = useState(null);

  const values = Object.values(indicator)
    .map(a => parseFloat(a))
    .sort((a, b) => (metadata.positive === 'TRUE' ? b - a : a - b));

  useEffect(() => {
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
    if (metadata.positive === 'FALSE') colors.reverse();
    const scale = scaleQuantize().domain(extent(values)).range(colors).nice();
    setColorScale({ scale });

    const svg = select(svgRef.current);
    Object.keys(indicator).forEach(state => {
      svg
        .select(`#${state}`)
        .join(`#${state}`)
        .attr('fill', scale(indicator[state]))
        .attr('title', state)
        .attr('cursor', 'pointer')
        .on('click', () => {
          let [, path] = window.location.pathname.split('/');
          path = path || 'life-expectancy';
          navigate(`/${path}/${slugify(states[state][0].name)}`);
        })
        .on('mousemove', event => {
          if (isZoomOut) {
            setDataPobreData({
              selectedState: state,
              pos: [event.pageX, event.pageY],
              indicatorRank: values.indexOf(parseFloat(indicator[state])) + 1,
              indicatorName: metadata.title,
              dotColor: scale(indicator[state]),
              indicatorValue: format(
                indicator[state],
                metadata.unit,
                metadata.rounding,
                metadata.decimals,
                metadata.factor
              ),
            });
          }
        })
        .on('mouseleave', () => {
          if (isZoomOut) {
            setDataPobreData(null);
          }
        });
    });
  }, [isZoomOut]);

  function getOffset(element) {
    const bound = element.getBoundingClientRect();
    const html = document.documentElement;

    return {
      top: bound.top + window.pageYOffset - html.clientTop + bound.height / 2,
      left: bound.left + window.pageXOffset - html.clientLeft + bound.width / 2,
    };
  }

  useEffect(() => {
    if (!stateId) return;
    const svg = svgRef.current;

    const state = svg.querySelector(`#${stateId}`);
    const pos = [getOffset(state).left, getOffset(state).top];

    setDataPobreData({
      selectedState: stateId,
      pos,
      indicatorRank: values.indexOf(parseFloat(indicator[stateId])) + 1,
      indicatorName: metadata.title,
      dotColor: colorScale.scale(indicator[stateId]),
      indicatorValue: format(
        indicator[stateId],
        metadata.unit,
        metadata.rounding,
        metadata.decimals,
        metadata.factor
      ),
    });
  }, [stateId]);

  useEffect(() => {
    if (!stateId) return;
    const svg = svgRef.current;

    const zoomPaddingFactor = isZoomOut ? 1.1 : 2.8;
    // state is the state I want to zoom to
    const state = isZoomOut ? svg : svg.querySelector(`#${stateId}`);

    const bbox = state.getBBox();

    const pos = [getOffset(svg).left, getOffset(svg).top];

    if (!isZoomOut) {
      setDataPobreData({
        selectedState: stateId,
        pos,
        indicatorRank: values.indexOf(parseFloat(indicator[stateId])) + 1,
        indicatorName: metadata.title,
        dotColor: colorScale.scale(indicator[stateId]),
        indicatorValue: format(
          indicator[stateId],
          metadata.unit,
          metadata.rounding,
          metadata.decimals,
          metadata.factor
        ),
      });
    } else if (highRes) {
      setDataPobreData(null);
    }

    // the main SVG object and its current viewBox
    const viewBox = svg.getAttribute('viewBox');
    const vbox = viewBox.split(' ');
    vbox[0] = parseFloat(vbox[0]);
    vbox[1] = parseFloat(vbox[1]);
    vbox[2] = parseFloat(vbox[2]);
    vbox[3] = parseFloat(vbox[3]);

    // the current center of the viewBox
    const cx = vbox[0] + vbox[2] / 2;
    const cy = vbox[1] + vbox[3] / 2;

    const matrix = svg.getScreenCTM().inverse().multiply(state.getScreenCTM());

    // the new center
    const newx = (bbox.x + bbox.width / 2) * matrix.a + matrix.e;
    const newy = (bbox.y + bbox.height / 2) * matrix.d + matrix.f;

    // the corresponding top left corner in the current scale
    const absoluteOffsetX = vbox[0] + newx - cx;
    const absoluteOffsetY = vbox[1] + newy - cy;

    // the new scale
    const scale = ((bbox.width * matrix.a) / vbox[2]) * zoomPaddingFactor;

    const scaledOffsetX = absoluteOffsetX + (vbox[2] * (1 - scale)) / 2;
    const scaledOffsetY = absoluteOffsetY + (vbox[3] * (1 - scale)) / 2;
    const scaledWidth = vbox[2] * scale;
    const scaledHeight = vbox[3] * scale;

    svg.setAttribute('viewBox', `${scaledOffsetX} ${scaledOffsetY} ${scaledWidth} ${scaledHeight}`);
  }, [stateId, isZoomOut, colorScale]);

  return (
    <Box w="100%" h="100%" px={highRes ? '0px' : [5, 10]} bg="#E5E5E5" position="relative">
      {dataPobreData && <DataProbe {...dataPobreData} />}
      {!isMobile && (
        <Button
          onClick={() => onShare()}
          position="absolute"
          bottom={['10%']}
          right={['10%']}
          variant="link"
          size={['sm', 'md']}
          bg="#403F3F"
          color="white"
          colorScheme="gray.900"
          py="6px"
          px={2}
          fontFamily="proxima-nova"
          fontSize="12px"
        >
          SHARE
          <Icon name="share" size="36px" color="white" ml={2} />
        </Button>
      )}
      {!isMobile && highRes && (
        <Button
          onClick={() => setIsZoomOut(current => !current)}
          position="absolute"
          mb="60px"
          bottom={['10%']}
          right={['10%']}
          variant="link"
          size={['sm', 'md']}
          color="#403F3F"
          colorScheme="gray.900"
        >
          {!isZoomOut && <ZoomButton />}
          {isZoomOut && (
            <Box bg="#403F3F" borderRadius="100%">
              <Icon name="arrow-back" color="white" size="45px" />
            </Box>
          )}
        </Button>
      )}

      {!highRes ? <MapLow svgRef={svgRef} /> : <MapHigh svgRef={svgRef} zoomedOut={isZoomOut} />}
    </Box>
  );
};

TheMap.propTypes = {
  indicator: PropTypes.shape().isRequired,
  onShare: PropTypes.func,
  metadata: PropTypes.shape().isRequired,
  selectedState: PropTypes.shape(),
  highRes: PropTypes.bool,
  zoomOut: PropTypes.bool,
};

TheMap.defaultProps = {
  selectedState: { stateName: null, stateId: null },
  onShare: () => {},
  highRes: false,
  zoomOut: true,
};

export default TheMap;
