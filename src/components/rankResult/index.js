import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Stack, Box, Icon } from '@chakra-ui/react';

import { slugify } from '../../utils/slugify';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const RankResult = ({ state, indicator, rank, value, best }) => {
  return (
    <Link to={`/${slugify(indicator)}/${slugify(state)}`} className="arrow">
      <Stack shadow="lg" h={130} mb={25} bg="white">
        <Box
          h={100}
          w={100}
          borderRadius={50}
          position="absolute"
          ml={-50}
          mt={15}
          bg={best ? '#184595' : '#F06060'}
          lineHeight="100px"
          textAlign="center"
          color="white"
          fontSize={50}
          fontFamily="Jubilat"
        >
          {rank}
        </Box>
        <Box pl={60} d="flex" alignItems="center" h="100%" w="100%" color="black">
          <div>
            <b>{indicator}</b>
            <p>{value}</p>
          </div>
          <ArrowForwardIcon
            name="arrow"
            w={6}
            h={6}
            ml="auto"
            mr="40px"
            color={best ? '#184595' : '#F06060'}
          />
        </Box>
      </Stack>
    </Link>
  );
};

RankResult.propTypes = {
  state: PropTypes.string.isRequired,
  indicator: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  best: PropTypes.bool,
};

RankResult.defaultProps = {
  best: false,
};

export default RankResult;
