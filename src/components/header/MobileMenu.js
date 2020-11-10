import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  Heading,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/core';

import Logo from '../../svg/logo.svg';

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <Modal preserveScrollBarGap isOpen={isOpen} onClose={onClose} size="full" isCentered>
      <ModalOverlay bg="#184595" />
      <ModalContent bg="#184595" shadow="none" h="100%" color="white">
        <ModalCloseButton color="white" size="lg" />
        <ModalBody
          pb={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Link to="/">
            <Button
              fontFamily="proxima-nova"
              fontSize="24px"
              color="white"
              variant="link"
              size="lg"
              py={2}
            >
              Map It
            </Button>
          </Link>
          <Link to="/learn-more">
            <Button
              fontFamily="proxima-nova"
              fontSize="24px"
              color="white"
              variant="link"
              size="lg"
              py={2}
            >
              What Shapes Health
            </Button>
          </Link>
          <Link to="/take-action">
            <Button
              fontFamily="proxima-nova"
              fontSize="24px"
              color="white"
              variant="link"
              size="lg"
              py={2}
            >
              Take Action
            </Button>
          </Link>
          <Link to="/about-the-data">
            <Button
              fontFamily="proxima-nova"
              fontSize="24px"
              color="white"
              variant="link"
              size="lg"
              py={2}
            >
              About the Data
            </Button>
          </Link>
        </ModalBody>
        <ModalFooter style={{ display: '-webkit-box' }} bg="#F06060" justifyContent="center">
          <Logo style={{ width: 40, margin: '5px 10px 0 0' }} />
          <Heading fontFamily="News Cycle" color="white">
            State of Health
          </Heading>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default MobileMenu;
