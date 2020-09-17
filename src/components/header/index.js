import React from 'react';
import { Heading, Flex, Button, Icon } from '@chakra-ui/core';
// import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';

const Header = () => (
  <Flex
    py={4}
    pl={[2, 120]}
    pr={[2, 12]}
    shadow="lg"
    direction="row"
    align="center"
    width="100%"
    justify="space-between"
    fontSize="sm"
    fontFamily="News Cycle"
    color="#403F3F"
  >
    <Button
      display={['block', 'none']}
      leftIcon="search"
      variant="link"
      size="lg"
      colorScheme="gray.800"
    />
    <Flex direction="row" align="center">
      <Heading fontFamily="News Cycle" color="#403F3F">
        State of Health
      </Heading>
    </Flex>
    <Button
      display={['none', 'block']}
      fontFamily="News Cycle"
      color="#403F3F"
      fontFamily="News Cycle"
      color="#403F3F"
      variant="link"
      size="sm"
      colorScheme="gray.800"
    >
      MAP IT
    </Button>
    <Button
      display={['none', 'block']}
      fontFamily="News Cycle"
      color="#403F3F"
      variant="link"
      size="sm"
      colorScheme="gray.800"
    >
      LEARN MORE
    </Button>
    <Button
      display={['none', 'block']}
      fontFamily="News Cycle"
      color="#403F3F"
      variant="link"
      size="sm"
      colorScheme="gray.800"
    >
      TAKE ACTION
    </Button>
    <Button
      display={['none', 'block']}
      fontFamily="News Cycle"
      color="#403F3F"
      variant="link"
      size="sm"
      colorScheme="gray.800"
    >
      ABOUT THE DATA
    </Button>
    <Button
      display={['none', 'block']}
      leftIcon="search"
      variant="link"
      size="md"
      colorScheme="gray.800"
    />
    <Button
      display={['block', 'none']}
      // leftIcon={<HamburgerIcon />}
      variant="link"
      size="lg"
      colorScheme="gray.800"
    />
  </Flex>
);

export default Header;
