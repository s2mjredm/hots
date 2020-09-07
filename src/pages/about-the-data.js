import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import Layout from '../components/layout';

export const query = graphql`
  {
    wpPage(id: { eq: "cG9zdDo3" }) {
      title
      content
    }
  }
`;

const About = ({
  data: {
    wpPage: { title, content },
  },
}) => (
  <Layout>
    <h1>{title}</h1>
    {parse(content)}
  </Layout>
);

About.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default About;
