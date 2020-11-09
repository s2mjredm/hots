import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import { Flex, Box, Text, Icon, PseudoBox } from '@chakra-ui/core';

import { slugify } from '../../utils/slugify';
import './index.css';

const SearchResults = ({ results, isSearchingCovid }) => {
  const renderSearchResults = () => {
    return results.map(i => {
      return (
        <PseudoBox
          key={i.title}
          my={[0, 6]}
          mx={[4, 8]}
          py={4}
          bg={['none', 'white']}
          textAlign="start"
          display="flex"
          borderBottom="1px solid #E5E5E5"
        >
          <Box
            w="30px"
            h="30px"
            lineHeight="31px"
            borderRadius="100%"
            background="#184595"
            textAlign="center"
            color="white"
            marginRight="12px"
          >
            1
          </Box>
          <Box>
            <Text
              fontSize="18px"
              color="#184595"
              fontFamily="News Cycle"
              fontWeight="600"
              paddingBottom="5px"
            >
              {i.title}
            </Text>
            <Link to={`/${slugify(i.title)}`}>
              <Text fontStyle="italic" color="red.500" cursor="pointer">
                <span style={{ fontWeight: 'bold', paddingRight: '4px' }}>on</span>
                Map it
                <Icon name="arrow-forward" size="24px" paddingLeft="8px" />
              </Text>
            </Link>
          </Box>
        </PseudoBox>
      );
    });
  };

  if (!results) {
    return null;
  }

  if (isSearchingCovid) {
    return (
      <Flex
        align="center"
        justify="center"
        h="600px"
        w="100%"
        textAlign="center"
        direction="column"
        px={8}
        color="red.500"
      >
        <Icon name="warning" fontSize="79px" />
        <Text py={6} fontSize="14px">
          Content for this site was developed prior to COVID-19. Please contact your health
          department for current COVID-19 data.
        </Text>
      </Flex>
    );
  }

  return <>{renderSearchResults()}</>;
};
SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSearchingCovid: PropTypes.bool.isRequired,
};

export default SearchResults;
