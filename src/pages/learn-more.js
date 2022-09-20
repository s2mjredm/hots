import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

import { Grid } from '@chakra-ui/react';

import Layout from '../components/layout';
import '../css/learn-more.css';
import '../css/wordpress.css';

export const query = graphql`fragment PageInfo on WpPage {
  title
  content
  featuredImage {
    node {
      localFile {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  }
  pageMeta {
    subtitle
  }
}

{
  page: wpPage(id: {eq: "cG9zdDoyNg=="}) {
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
      <div className="item" style={{ flex: 2 }}>
        <GatsbyImage image={featuredImage.node.localFile.childImageSharp.gatsbyImageData} />
      </div>
    </div>
    <Grid
      templateColumns={['1fr', '1fr', '1fr 60%']}
      className="wordpress learn-more to-print-learn-more"
    >
      {parse(content)}
    </Grid>
  </Layout>
);

LearnMore.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default LearnMore;
