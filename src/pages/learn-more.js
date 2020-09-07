import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import Layout from '../components/layout';

export const query = graphql`
  {
    page: wpPage(id: { eq: "cG9zdDo2OQ==" }) {
      title
      content
    }
    items: allWpPost(
      filter: { categories: { nodes: { elemMatch: { slug: { eq: "learnmore" } } } } }
      sort: { fields: title, order: ASC }
    ) {
      nodes {
        id
        content
      }
    }
  }
`;

const LearnMore = ({
  data: {
    items: { nodes },
    page: { title, content },
  },
}) => (
  <Layout>
    <h1>{title}</h1>
    {parse(content)}
    {nodes.map(item => (
      <div key={item.id}>{parse(item.content)}</div>
    ))}
  </Layout>
);

LearnMore.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default LearnMore;
