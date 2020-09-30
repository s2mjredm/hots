import React from 'react';
import { Link } from 'gatsby';
import { Heading, Flex, Button } from '@chakra-ui/core';

import Logo from '../../svg/logo.svg';

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
      <Logo style={{ width: 40, margin: '5px 10px 0 0' }} />
      <Heading fontFamily="News Cycle" color="#403F3F">
        State of Health
      </Heading>
    </Flex>
    <Link to="/">
      <Button
        display={['none', 'block']}
        fontFamily="News Cycle"
        color="#403F3F"
        variant="link"
        size="sm"
        colorScheme="gray.800"
      >
        MAP IT
      </Button>
    </Link>
    <Link to="/learn-more">
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
    </Link>
    <Link to="/take-action">
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
    </Link>
    <Link to="/about-the-data">
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
    </Link>
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
