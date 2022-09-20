import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Box, Heading, Text, Icon } from '@chakra-ui/react';
import { getSrc } from 'gatsby-plugin-image';
import { ArrowForwardIcon } from '@chakra-ui/icons'

import Masonry from 'react-masonry-component';
import parse from 'html-react-parser';

import Layout from '../components/layout';

import '../css/take-action.css';

export const query = graphql`{
  page: wpPage(id: {eq: "cG9zdDo2NA=="}) {
    ...PageInfo
  }
  items: allWpPost(
    filter: {categories: {nodes: {elemMatch: {slug: {eq: "takeaction"}}}}}
    sort: {fields: title, order: ASC}
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
              gatsbyImageData(width: 200, layout: FIXED)
            }
          }
        }
      }
    }
  }
  backgroundImage: file(relativePath: {eq: "take-action.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 0, layout: FULL_WIDTH)
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
          <GatsbyImage image={featuredImage.node.localFile.childImageSharp.gatsbyImageData} />
        </div>
      </div>

      <Masonry
        className="to-print-masonry"
        style={{
          padding: '60px 40px',
          backgroundImage: `url(${getSrc(backgroundImage.childImageSharp.gatsbyImageData)})`,
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
              <GatsbyImage
                image={item.featuredImage.node.localFile.childImageSharp.gatsbyImageData}
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
                    <ArrowForwardIcon h={6} w={6} />
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
                    <Icon viewBox='0 0 16 16' name="globe" mr={1} >
                      <path
                        d="M2.4,2.4A7.263,7.263,0,0,1,8,0a7.263,7.263,0,0,1,5.6,2.4A7.263,7.263,0,0,1,16,8a7.263,7.263,0,0,1-2.4,5.6A7.263,7.263,0,0,1,8,16a7.263,7.263,0,0,1-5.6-2.4A7.984,7.984,0,0,1,0,8,7.263,7.263,0,0,1,2.4,2.4Zm6.667,12a3.276,3.276,0,0,0,2-1.2A5.824,5.824,0,0,0,12,10.4a2.208,2.208,0,0,0-.667-1.6A2.347,2.347,0,0,0,9.6,8H8.267a3.893,3.893,0,0,1-1.2-.267,1.21,1.21,0,0,1-.4-.933.693.693,0,0,1,.267-.533A1.011,1.011,0,0,1,7.467,6a.91.91,0,0,1,.667.4c.267.133.4.267.533.267A.8.8,0,0,0,9.2,6.533.8.8,0,0,0,9.333,6a2.122,2.122,0,0,0-.667-1.333,5.515,5.515,0,0,0,.667-2.533.287.287,0,0,0-.267-.267A4.122,4.122,0,0,0,8,1.6,6.67,6.67,0,0,0,4.533,2.667a3.357,3.357,0,0,0-1.2,2.667A3.414,3.414,0,0,0,4.4,7.867,3.643,3.643,0,0,0,6.933,8.933h0v.533A1.712,1.712,0,0,0,7.467,10.8a1.942,1.942,0,0,0,1.2.8V14c0,.133,0,.133.133.267S8.933,14.4,9.067,14.4Z"
                        fill="currentColor"
                      />
                    </Icon>

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
