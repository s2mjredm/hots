import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import parse from 'html-react-parser';

import { Grid } from '@chakra-ui/core';

import Layout from '../components/layout';
import '../css/learn-more.css';
import '../css/wordpress.css';

export const query = graphql`
  fragment PageInfo on WpPage {
    title
    content
    featuredImage {
      node {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1125) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    pageMeta {
      subtitle
    }
  }
  query {
    page: wpPage(id: { eq: "cG9zdDo2OQ==" }) {
      ...PageInfo
    }
  }
`;

const LearnMore = ({
  data: {
    page: {
      title,
      content,
      featuredImage,
      pageMeta: { subtitle },
    },
  },
}) => (
  <Layout>
    <div className="hero">
      <div className="item">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="item" style={{ flex: 2, marginTop: 20 }}>
        <Img fluid={featuredImage.node.localFile.childImageSharp.fluid} />
      </div>
    </div>
    <Grid templateColumns={['1fr', '1fr', '1fr 60%']} className="wordpress learn-more">
      {parse(content)}
    </Grid>
  </Layout>
);

LearnMore.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default LearnMore;
