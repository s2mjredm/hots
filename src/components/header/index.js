import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Heading, Box, Flex, Grid, Button, useDisclosure } from '@chakra-ui/core';

import MobileMenu from './MobileMenu';
import IndicatorModal from '../indicatorModal';
import Flag from '../flag';
import Logo from '../../svg/logo.svg';

const Header = ({ flag }) => {
  const [hover, setHover] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMobileMenuOpen,
    onOpen: onOpenMobileMenu,
    onClose: onCloseMobileMenu,
  } = useDisclosure();

  return (
    <>
      <IndicatorModal isOpen={isOpen} onClose={() => onClose()} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => onCloseMobileMenu()} />

      <Grid
        w="100%"
        templateColumns={[
          '80px 1fr 80px',
          '80px 3fr repeat(4, 2fr) 80px',
          '120px 3fr repeat(4, 2fr) 120px',
        ]}
        py={4}
        shadow="lg"
        direction="row"
        align="center"
        width="100%"
        justify="space-between"
        fontSize="sm"
        fontFamily="News Cycle"
        color="#403F3F"
        alignItems="center"
      >
        <Button
          display={['block', 'none']}
          leftIcon="search"
          onClick={onOpen}
          variant="link"
          size="lg"
          colorScheme="gray.800"
        />
        <Box gridColumn={[2, '1 / span 2']}>
          <Link to="/">
            <Flex direction="row" align="center" justify="center" w="100%">
              <Logo style={{ width: 40, margin: '5px 10px 0 0' }} />
              <Heading fontFamily="News Cycle" color="#403F3F" fontSize="26px">
                State of Health
              </Heading>
            </Flex>
          </Link>
        </Box>
        <Box display={['none', 'block']}>
          <Link to="/" onMouseEnter={() => setHover('/')} onMouseLeave={() => setHover(null)}>
            <Button
              w="50%"
              textAlign="center"
              fontFamily="proxima-nova"
              color="#403F3F"
              variant="link"
              size="sm"
              colorScheme="gray.800"
            >
              MAP IT
            </Button>
          </Link>
        </Box>
        <Box display={['none', 'block']}>
          <Link
            to="/learn-more"
            onMouseEnter={() => setHover('learn-more')}
            onMouseLeave={() => setHover(null)}
          >
            <Button
              w="50%"
              textAlign="center"
              fontFamily="proxima-nova"
              color="#403F3F"
              variant="link"
              size="sm"
              colorScheme="gray.800"
            >
              LEARN MORE
            </Button>
          </Link>
        </Box>
        <Box display={['none', 'block']}>
          <Link
            to="/take-action"
            onMouseEnter={() => setHover('take-action')}
            onMouseLeave={() => setHover(null)}
          >
            <Button
              w="50%"
              textAlign="center"
              fontFamily="proxima-nova"
              color="#403F3F"
              variant="link"
              size="sm"
              colorScheme="gray.800"
            >
              TAKE ACTION
            </Button>
          </Link>
        </Box>
        <Box display={['none', 'block']}>
          <Link
            to="/about-the-data"
            onMouseEnter={() => setHover('about')}
            onMouseLeave={() => setHover(null)}
          >
            <Button
              w="50%"
              textAlign="center"
              fontFamily="proxima-nova"
              color="#403F3F"
              variant="link"
              size="sm"
              colorScheme="gray.800"
            >
              ABOUT THE DATA
            </Button>
          </Link>
        </Box>
        <Button
          display={['none', 'block']}
          leftIcon="search"
          variant="link"
          size="md"
          colorScheme="gray.800"
          onClick={onOpen}
        />
        <Button
          display={['block', 'none']}
          leftIcon="bars"
          variant="link"
          size="lg"
          colorScheme="gray.800"
          onClick={onOpenMobileMenu}
        />
      </Grid>
      {flag && <Flag active={hover} />}
    </>
  );
};

Header.propTypes = {
  flag: PropTypes.bool,
};

Header.defaultProps = {
  flag: false,
};

export default Header;
