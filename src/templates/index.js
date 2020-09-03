import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import Layout from '../components/layout';

const Index = ({ data: { metadata, indicator } }) => (
  <Layout>
    <h1>{metadata.title}</h1>
    {parse(metadata.definition)}
    <ul>
      {Object.keys(indicator).map(state => (
        <li>
          <b>{`${state}: `}</b>
          {indicator[state]}
        </li>
      ))}
    </ul>
  </Layout>
);

Index.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Index;

export const query = graphql`
  query indexPage($id: String, $variable: String ) {
    metadata: metadataCsv(id: {eq: $id}) {
      title
      definition
      high
      low
    }
    indicator: indicatorsCsv(indicator: {eq: $variable}) {
      AL
      AK
      AZ
      AR
      CA
      CO
      CT
      DE
      DC
      FL
      GA
      HI
      ID
      IL
      IN
      IA
      KS
      KY
      LA
      ME
      MD
      MA
      MI
      MN
      MS
      MO
      MT
      NE
      NV
      NH
      NJ
      NM
      NY
      NC
      ND
      OH
      OK
      OR
      PA
      RI
      SC
      SD
      TN
      TX
      UT
      VT
      VA
      WA
      WV
      WI
      WY
    }
  }
`;
