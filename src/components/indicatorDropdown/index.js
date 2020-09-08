import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Box, Heading, Text, VStack, Stack, Image, Divider } from '@chakra-ui/core';

const IndicatorDropdown = () => {
  return (
    <Box p={20}>
      <Heading textStyle="titles">How is your state doing?</Heading>
      <Text
        my={3}
        color="gray.text"
        fontSize={24}
        fontFamily="Roboto Slab"
        letterSpacing="-0.06rem"
      >
        Map it! Choose a health statistic or outcome to see results mapped for the whole United
        States. Select a state for more detailed information on that state’s health:
      </Text>
      <Stack
        py={16}
        px={[5, 120]}
        color="white"
        direction={['column', 'row']}
        spacing="24px"
        fontSize="sm"
      ></Stack>
    </Box>
  );
};

export default IndicatorDropdown;
