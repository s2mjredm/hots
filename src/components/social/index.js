import React from 'react';
import propTypes from 'prop-types';

import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';

import { Box, Button, CloseButton, Flex, Icon, Modal, ModalOverlay, Text } from '@chakra-ui/core';

const Social = ({ onClose, isOpen, url }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="#014284bd" className="blur" />
      <Flex w="100%" h="100vh" top="10" left="0" justify="center" position="absolute" zIndex="1301">
        <Box width={['360px', '600px']}>
          <Flex justify="space-between" color="white" align="center">
            <Text fontSize="38px" fontFamily="Jubilat">
              Share
            </Text>
            <CloseButton size="lg" fontSize="32px" onClick={onClose} />
          </Flex>
          <Flex bg="white" py={10} px={[5, 10]} direction="column" align="center">
            <Flex justify="space-between" width="360px" p={5}>
              <Flex direction="column" align="center" justify="center" cursor="pointer">
                <Flex
                  w="60px"
                  h="60px"
                  align="center"
                  justify="center"
                  bg="#F7F7F7"
                  borderRadius="100%"
                >
                  <Icon name="chevron-left" color="#707070" fontSize="30px" />
                  <Icon name="chevron-right" color="#707070" fontSize="30px" />
                </Flex>
                <Text fontSize="14px" fontFamily="Proxima Nova" paddingTop={2}>
                  Embed
                </Text>
              </Flex>
              <FacebookShareButton url={url}>
                <Flex direction="column" align="center" justify="center" cursor="pointer">
                  <Flex
                    w="60px"
                    h="60px"
                    align="center"
                    justify="center"
                    bg="#3B5A98"
                    borderRadius="100%"
                  >
                    <Icon name="facebook" color="white" fontSize="30px" />
                  </Flex>
                  <Text fontSize="14px" fontFamily="Proxima Nova" paddingTop={2}>
                    Facebook
                  </Text>
                </Flex>
              </FacebookShareButton>
              <PinterestShareButton url={url}>
                <Flex direction="column" align="center" justify="center" cursor="pointer">
                  <Flex
                    w="60px"
                    h="60px"
                    align="center"
                    justify="center"
                    bg="#BD071C"
                    borderRadius="100%"
                  >
                    <Icon name="pinterest" color="white" fontSize="30px" />
                  </Flex>
                  <Text fontSize="14px" fontFamily="Proxima Nova" paddingTop={2}>
                    Pinterest
                  </Text>
                </Flex>
              </PinterestShareButton>
              <TwitterShareButton url={url}>
                <Flex direction="column" align="center" justify="center" cursor="pointer">
                  <Flex
                    w="60px"
                    h="60px"
                    align="center"
                    justify="center"
                    bg="#1DA1F2"
                    borderRadius="100%"
                  >
                    <Icon name="twitter" color="white" fontSize="30px" />
                  </Flex>
                  <Text fontSize="14px" fontFamily="Proxima Nova" paddingTop={2}>
                    Twitter
                  </Text>
                </Flex>
              </TwitterShareButton>
            </Flex>
            <Flex p={2} bg="#F7F7F7" borderRadius="4px" justify="space-between" width="100%">
              <Text fontSize="18px" fontFamily="Proxima Nova" fontWeight="semi-bold">
                {url}
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
  url: propTypes.string.isRequired,
};

Social.defaultProps = {
  isOpen: false,
};

export default Social;
