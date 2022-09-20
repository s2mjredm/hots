import React from 'react';
import propTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';

import {
  Box,
  Button,
  CloseButton,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const Social = ({ onClose, isOpen, url, pathname }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl: url
            defaultImage: image
          }
        }
      }
    `
  );

  const { siteUrl, defaultImage } = site.siteMetadata;

  const { isOpen: showEmbed, onOpen: onShowEmbed } = useDisclosure();

  const embedCode = `<iframe src="${url}" />`;
  const image = pathname ? `og-images${pathname.replace(/\/$/, '')}.png` : null;
  const imageUrl = `${siteUrl}${image || defaultImage}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
  };
  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
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
                  onClick={onShowEmbed}
                >
                  <Icon name="chevron-left" color="#707070" fontSize="30px" />
                  <Icon name="chevron-right" color="#707070" fontSize="30px" />
                </Flex>
                <Text fontSize="14px" fontFamily="proxima-nova" paddingTop={2}>
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
                  <Text fontSize="14px" fontFamily="proxima-nova" paddingTop={2}>
                    Facebook
                  </Text>
                </Flex>
              </FacebookShareButton>
              <PinterestShareButton url={url} media={imageUrl}>
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
                  <Text fontSize="14px" fontFamily="proxima-nova" paddingTop={2}>
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
                  <Text fontSize="14px" fontFamily="proxima-nova" paddingTop={2}>
                    Twitter
                  </Text>
                </Flex>
              </TwitterShareButton>
            </Flex>
            <Flex p={2} mb={2} bg="#F7F7F7" borderRadius="4px" justify="space-between" width="100%">
              <Text fontSize="18px" fontFamily="proxima-nova" fontWeight="700">
                {url}
              </Text>

              <Button
                variantColor="red"
                variant="link"
                size="sm"
                onClick={() => handleCopyLink()}
                mx={4}
              >
                copy link
              </Button>
            </Flex>
            {showEmbed && (
              <Flex
                p={2}
                mb={2}
                bg="#F7F7F7"
                borderRadius="4px"
                justify="space-between"
                width="100%"
              >
                <Text fontSize="18px" fontFamily="proxima-nova" fontWeight="700">
                  {embedCode}
                </Text>

                <Button
                  variantColor="red"
                  variant="link"
                  size="sm"
                  onClick={() => handleCopyEmbed()}
                  mx={4}
                >
                  copy link
                </Button>
              </Flex>
            )}
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
  pathname: propTypes.string.isRequired,
};

Social.defaultProps = {
  isOpen: false,
};

export default Social;
