import React from 'react';
import propTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

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
      <Flex w="100%" h="100vh" top="10" left="0" justify="center" position="fixed" zIndex="1405">
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
                  <ChevronLeftIcon color="#707070" w={7} h={7} />
                  <ChevronRightIcon color="#707070" w={7} h={7} />
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
                    <Icon viewBox='0 0 18 33' color="white" w={8} h={8} >
                      <path
                        d="M16.9 18.994l.938-6.111h-5.864V8.917c0-1.672.819-3.3 3.445-3.3h2.666V.413A32.509 32.509 0 0 0 13.353 0C8.524 0 5.367 2.927 5.367 8.226v4.658H0v6.111h5.368v14.773h6.606V18.994z"
                        fill="currentColor"
                      />
                    </Icon>
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
                    <Icon viewBox='0 0 34 34' color="white" w={8} h={8} >
                      <path
                        d="M33.705 16.853a16.855 16.855 0 0 1-21.84 16.1 18.944 18.944 0 0 0 2.093-4.417c.2-.788 1.046-4.009 1.046-4.009a4.513 4.513 0 0 0 3.86 1.937c5.083 0 8.746-4.675 8.746-10.485 0-5.565-4.546-9.731-10.39-9.731-7.271 0-11.138 4.879-11.138 10.2 0 2.47 1.318 5.552 3.418 6.527.319.149.489.082.564-.224.054-.231.34-1.379.469-1.91a.5.5 0 0 0-.116-.482 6.637 6.637 0 0 1-1.244-3.846A7.293 7.293 0 0 1 16.785 9.2a6.653 6.653 0 0 1 7.04 6.857c0 4.56-2.3 7.72-5.3 7.72a2.444 2.444 0 0 1-2.494-3.044c.476-2 1.393-4.166 1.393-5.613a2.116 2.116 0 0 0-2.134-2.372c-1.692 0-3.051 1.746-3.051 4.091a6.072 6.072 0 0 0 .5 2.5s-1.665 7.054-1.971 8.372a16.313 16.313 0 0 0-.061 4.838 16.854 16.854 0 1 1 23-15.7z"
                        fill="currentColor"
                      />
                    </Icon>
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
                    <Icon viewBox='0 0 29 23' color="white" w={8} h={8} >
                      <path
                        d="M26.237 5.918c.019.26.019.52.019.779 0 7.923-6.03 17.052-17.052 17.052A16.937 16.937 0 0 1 0 21.06a12.4 12.4 0 0 0 1.447.074 12 12 0 0 0 7.441-2.561 6 6 0 0 1-5.6-4.156 7.558 7.558 0 0 0 1.132.093 6.339 6.339 0 0 0 1.577-.2 5.994 5.994 0 0 1-4.806-5.882v-.074a6.036 6.036 0 0 0 2.709.761 6 6 0 0 1-1.855-8.016A17.036 17.036 0 0 0 14.4 7.366a6.766 6.766 0 0 1-.148-1.373 6 6 0 0 1 10.372-4.1 11.8 11.8 0 0 0 3.8-1.447 5.977 5.977 0 0 1-2.635 3.3 12.015 12.015 0 0 0 3.451-.928 12.883 12.883 0 0 1-3.003 3.1z"
                        fill="currentColor"
                      />
                    </Icon>

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
