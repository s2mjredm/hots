import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import parse from 'html-react-parser';

import Layout from '../components/layout';
import '../css/learn-more.css';

export const query = graphql`
  fragment PageInfo on WpPage {
    title
    content
    featuredImage {
      node {
        localFile {
          childImageSharp {
            fluid(maxWidth: 800) {
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
      <div className="item" style={{ flex: 2 }}>
        <Img fluid={featuredImage.node.localFile.childImageSharp.fluid} />
      </div>
    </div>
    <div className="learn-more">{parse(content)}</div>
  </Layout>
);

LearnMore.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default LearnMore;
