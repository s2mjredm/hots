import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { select, extent, scaleQuantize } from 'd3';

import { Box, Button } from '@chakra-ui/core';

import DataPobre from './DataPobre';

const StateMap = ({
  indicator,
  onShare,
  selectedState,
  indicatorRank,
  selectedStateName,
  indicatorName,
  indicatorValue,
}) => {
  const svgRef = useRef();
  const [dataPobreLeftPos, setDataPobreLeftPos] = useState();

  useEffect(() => {
    const values = Object.keys(indicator).map(state => indicator[state]);

    const scale = scaleQuantize()
      .domain(extent(values))
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

    const svg = select(svgRef.current);
    Object.keys(indicator).forEach(state => {
      svg.select(`#${state}`).join(`#${state}`).attr('fill', scale(indicator[state]));
    });
  }, [indicator]);

  useEffect(() => {
    const svg = svgRef.current;

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

    // state is the state I want to zoom to
    const state = svg.querySelector(`#${selectedState}`);
    const bbox = state.getBBox();

    const matrix = svg.getScreenCTM().inverse().multiply(state.getScreenCTM());

    // the new center
    const newx = (bbox.x + bbox.width / 2) * matrix.a + matrix.e;
    const newy = (bbox.y + bbox.height / 2) * matrix.d + matrix.f;

    // the corresponding top left corner in the current scale
    const absoluteOffsetX = vbox[0] + newx - cx;
    const absoluteOffsetY = vbox[1] + newy - cy;

    // the new scale
    const scale = ((bbox.width * matrix.a) / vbox[2]) * 2.8;

    const scaledOffsetX = absoluteOffsetX + (vbox[2] * (1 - scale)) / 2;
    const scaledOffsetY = absoluteOffsetY + (vbox[3] * (1 - scale)) / 2;
    const scaledWidth = vbox[2] * scale;
    const scaledHeight = vbox[3] * scale;

    svg.setAttribute('viewBox', `${scaledOffsetX} ${scaledOffsetY} ${scaledWidth} ${scaledHeight}`);
  }, [selectedState]);

  const mapContainerRef = useCallback(node => {
    if (node !== null) {
      setDataPobreLeftPos(node.getBoundingClientRect().width / 2);
    }
  }, []);

  return (
    <Box bg="#E5E5E5" ref={mapContainerRef} position="relative">
      <DataPobre
        leftPosition={dataPobreLeftPos}
        indicatorRank={indicatorRank}
        selectedStateName={selectedStateName}
        indicatorName={indicatorName}
        indicatorValue={indicatorValue}
      />
      <Button
        onClick={() => onShare()}
        position="absolute"
        bottom={['20px', '45px', '100px']}
        right={['30px', '70px', '100px']}
        variant="link"
        size={['sm', 'md']}
        color="#403F3F"
        colorScheme="gray.900"
      >
        SHARE
        <Button
          as="div"
          marginLeft={2}
          leftIcon="share"
          fontSize={['30px', '60px']}
          variant="link"
          size="md"
          color="#403F3F"
          colorScheme="gray.900"
        />
      </Button>
      <svg
        ref={svgRef}
        version="1.1"
        id="states"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        x="0px"
        y="0px"
        viewBox="0 0 1224 792"
      >
        <path
          id="TX"
          d="M422.3,637.8c11.9,0,24,0,36.6,0c5.9,12.9,11.8,25.7,17.5,38.6c3.7,8.2,7.2,16.5,10.7,24.8
	c0.7,1.6,1.8,2.5,3.4,3.4c13.5,7.6,27.5,14.4,42,21.6c0-17.6,0-34.4,0-51.5c12.3-12.3,24.6-24.6,36.3-36.2c0-37.9,0-74.9,0-111.5
	c-38.9-12.2-77.3-24.3-116.5-36.7c0-11.9,0-24,0-36.4c-10.1,0-19.5,0-29.5,0c0,36.6,0,72.8,0,109.8c-17.2,0-57.3,0-65.1,0
	C357.7,563.6,400.7,613.3,422.3,637.8z"
        />
        <path
          id="NY"
          d="M1033.5,84.7c0,0-25.1,0-37.8,0c-10.9,10.9-35.7,36.2-36.1,37.4c-0.4,1.4-0.5,34.5-0.5,50.5
	c-24.1,0-48.3,0-72.8,0c0,10.4,0,19.8,0,29.2c-4.9,3.4-10.2,5.4-15.4,8.3c0,4.5,0,9.2,0,14.3c41.5,0,122.6,0,122.6,0l38.9,46.1
	L1033.5,84.7z"
        />
        <path
          id="ID"
          d="M281.8,283.7l0.7-73.8H253L194.6,94.3c0,0,0-19.8,0-24.4c-5.1,0-9.6,0-14.4,0c0,71.3,0,142.2,0,213.8
	H281.8z"
        />
        <path
          id="FL"
          d="M841.7,732.8c7.2-10.4,12.7-21.9,20-32.3c1.4-2,1.5-4.7,0.4-8.1c-8.7-27.8-18.9-55.2-27.3-83.2
	c-3.1-1.3-74.2-0.5-74.2-0.5l-1-8.2c0,0-32.3,0-42.5,0c0,7.6,0,14.5,0,21.8c19.4,0,38.4,0,57.5,0c5.4,7.1,10,14.5,14.7,21.8
	c2.9,4.4,1.7,9.6,2.3,14.2c1.8,15.2,4.1,30.4,5.6,45.9c14.6,9.7,29.2,19.5,43.8,29.2L841.7,732.8z"
        />
        <path
          id="WA"
          d="M85.8,177.9c15.4-3,30.4-5.5,45.6-9.3c9.3-2.3,18.4-1.9,27.6-2.3c4.3-0.2,8.5,0,13.4,0
	c0-32.4,0-64.2,0-96.3c-26.9,0-53.7,0-81.2,0c0,4.8,0,9.3,0,14.8c-15,0-29.3,0-44.1,0c5.1,27.7,10.1,54.3,15.1,81.6
	c7.3,0,14.5,0,21.6,0C85.4,171,85.8,177.9,85.8,177.9z"
        />
        <path
          id="ND"
          d="M503.3,69.9c-36.8,0-73.1,0-109.6,0c0,29.4,0,89,0,89h116.5C510.1,158.9,504,83.2,503.3,69.9z"
        />
        <path
          id="MN"
          d="M510.8,71.6l4.8,57.7l2.6,87.6h82.3l-16.6-42.6c0,0,0.1-34.9,0.1-52.8c16-17.1,49.8-50.5,49.8-50.5
	l-122.9-0.1V71.6z"
        />
        <polygon
          id="VA"
          points="974.4,423.3 907.6,372.6 861.3,416 815.7,416 792.8,438.1 959.2,438.1 "
        />
        <polygon
          id="WI"
          points="630.9,121.3 593.3,121.3 591.8,171 621.1,246.5 665.2,246.5 667.4,179.1 684.8,152.6 "
        />
        <polygon
          id="MD"
          points="1006.2,387.2 966.9,387.1 966.9,335.7 871.2,335.7 871.2,364.6 911.5,364.6 979.8,416.5 "
        />
        <path
          id="KY"
          d="M812.2,409.5l-13.9-20.2L743,372.2l-84.9,51.3l-3.6,14.9c41.5,0,128.5,0,128.5,0L812.2,409.5z"
        />
        <path
          id="GA"
          d="M841.8,568.3c-16.8-24.2-53.4-77.9-53.4-77.9s-27.9,0-35.2,0c5,36.4,11.7,73,16.7,109.8
	c21.9,0,42.2,0,64.5,0c2.5-9.7,4.1-19.3,7.2-28.5L841.8,568.3z"
        />
        <path
          id="IA"
          d="M620.8,268.9c-6.8-14.8-18.5-44-18.5-44h-83.5l0.2,29.4l24.1,58.2h66.4l11.2-43V268.9z"
        />
        <polygon
          id="MA"
          points="1127.7,224.6 1128.8,261.5 1157.6,254.2 1157.6,203.3 1143.7,202.3 1136.9,209.5 1107.5,196.5
	1040.7,196.5 1040.7,224.6 "
        />
        <path
          id="AL"
          d="M760.5,594.9c-2-14.5-3.7-32.2-6.1-46.7c-2.4-14.1-3.7-28.3-6.4-42.4c-0.9-4.8-1.4-9.8-2.4-15.4
	c-16.9,0-33.9,0-51.2,0c0,41.4,0,124.7,0,124.7l14.8,7v-27.2L760.5,594.9z"
        />
        <path
          id="NC"
          d="M900.8,518.7l65.5-51.3c0,0,5.5-16.3,7.5-21.2c-49.1,0-101.2,0-150.6,0c-13.4,11.2-43.7,36.9-43.7,36.9
	s70,0,83.3,0c13.1,10.9,24.2,24.2,37.3,35.6H900.8z"
        />
        <polygon
          id="PA"
          points="849.3,237 849.1,327.4 969.8,327.4 996.8,298.2 979.1,265.8 1002.3,247.8 988.3,231.7
	863.7,231.7 862.5,219.9 "
        />
        <path
          id="LA"
          d="M627.6,542.8l-50.7-0.8c0,0,0,58.8,0,88.5c29.1,7.3,57.9,14.5,88.4,22.1c-5.1-22.7-9.9-44.1-14.9-66.1
	c-9.3,0-18.7,0-29,0c2.2-14.8,4.2-28.9,6.3-43V542.8z"
        />
        <polygon
          id="NJ"
          points="1006.4,297.3 994.4,313.4 1016.4,357.4 1040.4,340.7 1041.5,292.1 1007.2,255.2 988.8,268.9
	"
        />
        <path
          id="TN"
          d="M810.2,445.5c-2.6-1-157.1,0-157.1,0l-8,37.7c0,0,86.2-0.1,121.1-0.1c5.6-3.3,28-24.1,44.1-36.3V445.5z
	"
        />
        <path
          id="ME"
          d="M1158.1,55.6l5.2,75.1l-49.4,49.2l-22.3-102.6c0,0,18.6-34,29.3-50.7L1158.1,55.6z"
        />
        <path
          id="WV"
          d="M818.9,356.9c-4.9,7.4-17.3,25.4-17.3,25.4s12.5,16.9,18.9,26.6c12.3,0,24.9,0,35.3,0
	c12.4-12.4,41.4-37.8,41.4-37.8l-33.8,0.8c0,0,0-23.9,0-36.5c-7.7,0-19.7,0-19.7,0l-0.5-15.4L818.9,356.9z"
        />
        <polygon id="DE" points="973.8,336 974,379.4 1010.6,379.4 1010.7,362.8 988.8,320 " />
        <polygon id="NH" points="1084,83.7 1106.4,187 1063.6,187 " />
        <path
          id="IL"
          className="st10"
          d="M629,269.2c0,0-15.7,64.5-15.5,65.9c14.5,26.8,43.8,80.6,43.8,80.6l14.6-9.2c0,0,0-88,0-130.3
	c-4.5,0-9,0-13.8,0c0-7.6,0-22.4,0-22.4h-34.6L629,269.2z"
        />
        <path
          id="SC"
          className="st10"
          d="M824.3,528.7l25.2,34.8l48.2-33.2l-39.1-40.5c0,0-57,0-61.3,0L824.3,528.7z"
        />
        <g id="AK">
          <path
            id="AK_1_"
            d="M91.9,608.6c-8.6,5.4-14.2,14-22.2,20.6c6,7.3,14.6,10,21.9,16.4c-13.3,11.1-22.9,25.6-36.5,36.2
	c0,0,16.9-10.7,18.8-12c20.3-13.1,40.7-26,61.6-39.2c6.7,4.4,13.7,8.9,21.3,13.9c0-24.9,0-48.8,0-73.3c-15.5-6.8-31.3-14-47.4-20.8
	c-2-0.9-4.6-0.4-6.7,1.8c-8.5,9-17.7,17.3-25.6,27.1c4.2,6.5,8.4,13.1,13,20.2c-7.1-0.5-12.7-3.8-19.2-5.1
	c-2.2,4.5-0.3,9.2-1.3,13.6c6.1,1.9,12.4-0.5,18.3,1.4L91.9,608.6z"
          />
          <path
            id="AK_2_"
            d="M554.6,445.1l0.1,66.5l21.2,7.8l1.5,15.1c0,0,33.4,0,51,0c4.8-24,9.7-48.4,14.7-73.5
	c-7,0-13.9,0-21.5,0c0-5.4,0-10.1,0-15.4L554.6,445.1z"
          />
        </g>
        <g id="MI">
          <polygon
            id="MI_2_"
            points="757.7,120.8 717.5,83.6 657.8,77.2 625.2,110 687.1,143.7 708.1,121.2 	"
          />
          <polygon
            id="MI_1_"
            points="728.9,126.2 704.3,157.7 702.1,269.3 759.9,269.3 782,217.2 783.3,157.5 764.5,180.3 	"
          />
        </g>
        <path
          id="MT"
          d="M203.3,69.6c0,2.9,0.4,25,0.4,25l54.8,107.5c0,0,19.1,0.4,24,0.4c0-6.9,0.5-13.9,0.5-21.5
	c34.5,0,67.7,0,102.2,0c0-37.4,0-74.1,0-111.4C324.8,69.6,203.3,69.6,203.3,69.6z"
        />
        <path
          id="VT"
          d="M1041.6,187.4c3.7,0,8,0,13.3,0c7.1-33.5,14.4-67.6,21.9-103c-11.3,0-35.2,0-35.2,0
	S1040.4,186.6,1041.6,187.4z"
        />
        <polygon id="SD" points="393.9,166.2 394.3,246.6 455.7,246.7 510.8,252.7 509.7,166.2 " />
        <path
          id="OR"
          d="M63.7,172.9c0,0-13,53.5-16.4,72.6c-2.2,12.1-0.4,25-0.4,37.9c42.1,0,83.5,0,125.5,0
	c0-36.8,0-73.3,0-110.3c-32.7-2.2-95.2,14.4-95.2,14.4l-1.4-14.5c0,0-7.7,0-11.5,0H63.7z"
        />
        <polygon id="WY" points="291.9,187.7 290.3,304.9 385.2,305.5 385.2,187.7 " />
        <path
          id="CT"
          d="M1040.4,232v37.3l8.2,6.5l35.4-6.8c0,0,0-24.2,0-37C1070.4,232,1040.4,232,1040.4,232z"
        />
        <path
          id="RI"
          d="M1091.4,232c0,0,0,24.4,0,36.7c10.6-2.3,20.3-4.4,29.2-7.7c0-10,0-19.2,0-29
	C1111.6,232,1091.4,232,1091.4,232z"
        />
        <path
          id="OH"
          d="M840.4,240.7c-14.5,11.9-29,23.8-43.9,35.9c-16.3,0-50.1,0-50.1,0v87.8l48.8,15.2l46.1-69.4
	c0,0-0.4-67.8-0.3-69.4H840.4z"
        />
        <path
          id="NE"
          d="M393.9,254.2c-0.9,0.2-0.6,34.5-0.6,51.4c14.8,0,28.9,0,43.6,0c0,7.3,0,14.2,0,21.5
	c34.5,0,68.2,0,102.7,0c-6.6-18.7-26.8-66.8-26.8-66.8l-55.1-6.2L393.9,254.2z"
        />
        <path id="IN" d="M681.3,276.3l0.2,121.5l56.5-32.7c0,0,0-58.9,0-88.9H681.3z" />
        <path
          id="CA"
          d="M46.9,291.1c0,0,0.1,28.6-0.1,40.3c0,2.8,0.9,5.1,2.1,7.4c25.1,50.1,50.2,100.2,75,150.4
	c3,6.1,6.8,9.9,12.9,12.8c16.8,8,33.3,16.7,49.7,25c1.5,5,0.2,9.9,0.9,14.9c9.9,0,19.3,0,29,0c0-29.4,0-58.5,0-88.6
	c-26.6-29.1-53.9-59-81.2-88.9c0-24.3,0-48.5,0-73.3C106.4,291.1,46.9,291.1,46.9,291.1z"
        />
        <path
          id="NV"
          d="M142.9,291.1c0,0-0.1,47.9-0.1,68c26.6,29.2,78.6,86.4,78.6,86.4h9c0,0,0-102.7,0-154.4
	C201.7,291.1,142.9,291.1,142.9,291.1z"
        />
        <path
          id="UT"
          d="M238.5,291.1v125.1c0,0,53.7,0,80.6,0c0-34.3,0-69,0-103.3c-12.2,0-24.1,0-36.6,0c0-7.3,0-14.2,0-21.8
	C268,291.1,238.5,291.1,238.5,291.1z"
        />
        <path id="CO" d="M327.2,312.6v103c33.7,0,102,0,102,0v-103H327.2z" />
        <path
          id="MO"
          d="M546.1,320.6l2.4,10.7l6,37c0,0-0.1,67.6-0.1,70.5c24.8,0,49,0,73.8,0c0,5.1,0,9.6,0,14.4
	c4.9,0,13.9,0,13.9,0l7.8-34l-44.1-82c0,0,0.9-13,0.9-16.5C587.5,320.6,546.1,320.6,546.1,320.6z"
        />
        <path
          id="KS"
          d="M437.3,335.4c0,0-0.4,79.8-0.3,80.2c0.1,0.4,108.9,0,108.9,0l0.2-41.9l-6.3-38.3H437.3z"
        />
        <path
          id="AZ"
          d="M238.2,424c0,0,0,22.4,0,29.5c-4.9,0-9.2,0-13.8,0c0,30,0,59.3,0,88.7c15.8,9.1,31.9,18.3,48,27.5
	c1.5,0.8,2.6,2.1,4.7,2.1c13.9-0.1,27.8-0.1,42-0.1c0-49.5,0-98.2,0-147.7C292.6,424,238.2,424,238.2,424z"
        />
        <path
          id="NM"
          d="M326.3,424l0.6,146.9h20.4v-14c0,0,45.3,0,67.1,0c0-44.5,0-132.9,0-132.9H326.3z"
        />
        <path
          id="OK"
          d="M422.8,424c0,0,0,15.2,0,21.5c12.3,0,36.3,0,36.3,0l0.8,38.8l87.5,26.2V424H422.8z"
        />
        <path
          id="MS"
          d="M644.2,490.6c0,0-11.7,65-15.7,87.1c9.1,0,27.9,0,27.9,0l9.1,38.3c0,0,14.9,0,21.1,0
	c0-42.1,0-82.6,0-125.4H644.2z"
        />
        <g id="HI">
          <path
            id="HI_3_"
            d="M298,725.4c11.8-5.5,22.1-13.5,33.5-19.5c1.4-0.7,3.1-2.5,3.3-4c1.5-11.7,5.5-23,6.5-35
		c-7.2-4.7-14.3-9.4-21.8-14.3c-14.8,12.4-29.2,24.5-43.8,36.7c6.6,12.3,14.1,24.2,21.6,36H298z"
          />
          <polygon id="HI_2_" points="238.1,667 238.1,689 257.9,678 	" />
          <polygon id="HI_1_" points="201.4,663 209.4,689 183.2,678 183.9,663 	" />
        </g>
        <polygon id="DC" points="1063,412.5 1093.6,443.1 1120.3,418.8 1089.4,388.1 " />
      </svg>
    </Box>
  );
};

StateMap.propTypes = {
  indicator: PropTypes.shape().isRequired,
  onShare: PropTypes.func.isRequired,
  indicatorRank: PropTypes.number.isRequired,
  selectedStateName: PropTypes.string.isRequired,
  indicatorName: PropTypes.string.isRequired,
  indicatorValue: PropTypes.number.isRequired,
  selectedState: PropTypes.string.isRequired,
};

export default StateMap;