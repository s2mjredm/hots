import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Box, Heading, Text } from '@chakra-ui/core';
import Masonry from 'react-masonry-component';
import parse from 'html-react-parser';

import Layout from '../components/layout';
import Arrow from '../svg/arrow.svg';
import Globe from '../svg/globe.svg';

export const query = graphql`
  query {
    page: wpPage(id: { eq: "cG9zdDoxNjc=" }) {
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
        <div className="item" style={{ flex: 2 }}>
          <Img fluid={featuredImage.node.localFile.childImageSharp.fluid} />
        </div>
      </div>
      <Masonry
        style={{
          padding: '60px 40px',
          backgroundImage: `url(${backgroundImage.childImageSharp.fluid.src})`,
          backgroundSize: 'cover',
        }}
      >
        {nodes.map(item => (
          <Box key={item.id} w={260} p={30} m={35} bg="white" shadow="lg">
            <Heading as="h4" fontSize={18}>
              {item.title}
            </Heading>
            <Text fontSize={16} fontFamily="Jubilat" my={5}>
              {parse(item.content)}
            </Text>
            {item.featuredImage && (
              <Img fixed={item.featuredImage.node.localFile.childImageSharp.fixed} />
            )}
            <Box borderTop="1px solid #707070" mt={6} pt={4}>
              <a href={item.link.url}>
                <Globe style={{ display: 'inline-block' }} />
                <Text
                  display="inline-block"
                  w={140}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  mx={1}
                  position="relative"
                  top="6px"
                  target="_blank"
                >
                  {item.link.url.replace(/https?:\/\/(www\.)?(.*)\/?.*/gm, '$2')}
                </Text>
                <Arrow style={{ display: 'inline-block', height: 16 }} />
              </a>
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
