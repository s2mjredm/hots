import React from 'react';
import propTypes from 'prop-types';

import { Box, CloseButton, Flex, Modal, ModalOverlay, Text, Button } from '@chakra-ui/core';

const Social = ({ onClose, isOpen }) => {
  const link = 'https://stateofhealth.us/life-expectancy-us';

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="#4F5394" />
      <Flex w="100%" h="100vh" top="0" left="0" justify="center" position="absolute" zIndex="1301">
        <Box width="600px">
          <Flex justify="space-between" color="white" align="center">
            <Text fontSize="38px" fontFamily="jubilat">
              Share
            </Text>
            <CloseButton size="lg" fontSize="32px" onClick={onClose} />
          </Flex>
          <Flex bg="white" p={10} direction="column" align="center">
            <Flex justify="space-between" width="330px" p={5}>
              <Text fontSize="12px" fontFamily="jubilat">
                Embed
              </Text>
              <Text fontSize="12px" fontFamily="jubilat">
                Facebook
              </Text>
              <Text fontSize="12px" fontFamily="jubilat">
                Pinterest
              </Text>
              <Text fontSize="12px" fontFamily="jubilat">
                Twitter
              </Text>
            </Flex>
            <Flex p={2} bg="#F7F7F7" borderRadius="4px" justify="space-between" width="100%">
              <Text fontSize="18px" fontFamily="Proxima Nova">
                https://stateofhealth.us/life-expectancy-us
              </Text>
              <Button variantColor="red" variant="link" size="sm" onClick={() => handleCopyLink()}>
                copy link
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  );
};

Social.propTypes = {
  onClose: propTypes.func.isRequired,
  isOpen: propTypes.bool,
};

Social.defaultProps = {
  isOpen: false,
};

export default Social;
