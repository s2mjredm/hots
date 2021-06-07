import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Box, Heading, Text, Icon } from '@chakra-ui/core';
import Masonry from 'react-masonry-component';
import parse from 'html-react-parser';

import Layout from '../components/layout';

import '../css/take-action.css';

export const query = graphql`
  query {
    page: wpPage(id: { eq: "cG9zdDo2NA==" }) {
      ...PageInfo
    }
    items: allWpPost(
      filter: { categories: { nodes: { elemMatch: { slug: { eq: "takeaction" } } } } }
      sort: { fields: title, order: ASC }
    ) {
      nodes {
        id
        title
        content
        link: takeAction {
          url
        }
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fixed(width: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    backgroundImage: file(relativePath: { eq: "take-action.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1440, quality: 0) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const TakeAction = ({
  data: {
    items: { nodes },
    page: {
      title,
      pageMeta: { subtitle },
      featuredImage,
    },
    backgroundImage,
  },
}) => {
  return (
    <Layout>
      <div className="hero">
        <div className="item">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </div>
        <div className="item" style={{ flex: 2, paddingBottom: 0 }}>
          <Img fluid={featuredImage.node.localFile.childImageSharp.fluid} />
        </div>
      </div>

      <Masonry
        className="to-print-masonry"
        style={{
          padding: '60px 40px',
          backgroundImage: `url(${backgroundImage.childImageSharp.fluid.src})`,
          backgroundSize: 'cover',
        }}
      >
        {nodes.map(item => (
          <Box
            className="to-print-masonry-card"
            key={item.id}
            w={['calc(100% - 80px)', 'calc(50% - 80px)', 260]}
            py={30}
            my={35}
            mx={[0, 5, 35]}
            bg="white"
            shadow="lg"
          >
            <Heading className="to-print-card-h4" as="h4" fontSize={18} px={30}>
              {item.title}
            </Heading>
            <Text className="to-print-card-p" fontSize={16} fontFamily="Jubilat" my={5} px={30}>
              {parse(item.content)}
            </Text>
            {item.featuredImage && (
              <Img
                fixed={item.featuredImage.node.localFile.childImageSharp.fixed}
                style={{ margin: '0 30px' }}
              />
            )}

            <Box mt={6} pt={4} px={30} borderTop="1px solid #707070">
              {item.link.url && (
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  display="flex"
                  mt={6}
                  pt={4}
                  px={30}
                  width="100%"
                >
                  <Box
                    className="no-print"
                    position="absolute"
                    right="30px"
                    pl="40px"
                    mt="-4px"
                    bgImage="linear-gradient(90deg, #FFFFFF00 0%, #FFFFFF 64%, #FFFFFF 100%)"
                  >
                    <Icon name="arrow" />
                  </Box>
                  <Text
                    className="to-print-card-p"
                    display="inline-block"
                    w={175}
                    overflow="hidden"
                    whiteSpace="nowrap"
                    mx={1}
                    lineHeight="16px"
                    target="_blank"
                  >
                    <Icon name="globe" mr={1} />
                    {item.link.url.replace(/https?:\/\/(www\.)?(.*)\/?.*/gm, '$2')}
                  </Text>
                </a>
              )}
            </Box>
          </Box>
        ))}
      </Masonry>
    </Layout>
  );
};

TakeAction.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default TakeAction;
