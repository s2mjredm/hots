import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import Layout from '../components/layout';

export const query = graphql`
  {
    page: wpPage(id: { eq: "cG9zdDoxNjc=" }) {
      title
      content
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
      }
    }
  }
`;

const TakeAction = ({
  data: {
    items: { nodes },
    page: { title, content },
  },
}) => (
  <Layout>
    <h1>{title}</h1>
    {parse(content)}
    {nodes.map(item => (
      <div key={item.id}>
        <h3>{item.title}</h3>
        {parse(item.content)}
        <a href={item.link.url}>{item.link.url}</a>
      </div>
    ))}
  </Layout>
);

TakeAction.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default TakeAction;
