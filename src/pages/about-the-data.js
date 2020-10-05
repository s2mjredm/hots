import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import parse from 'html-react-parser';
import { Box, Grid, Heading, Text, Link } from '@chakra-ui/core';

import Layout from '../components/layout';
import File from '../svg/file.svg';

export const query = graphql`
  {
    wpPage(id: { eq: "cG9zdDo3" }) {
      ...PageInfo
      download {
        dataIntro
        dataTitle
        file1 {
          localFile {
            url
          }
        }
        fileText
        file2 {
          localFile {
            url
          }
        }
        fileText2
      }
    }
  }
`;

const About = ({
  data: {
    wpPage: {
      title,
      content,
      featuredImage,
      pageMeta: { subtitle },
      download,
    },
  },
}) => (
  <Layout>
    <div className="hero" style={{ marginBottom: -160 }}>
      <div className="item">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="item" style={{ flex: 2 }}>
        <Img fluid={featuredImage.node.localFile.childImageSharp.fluid} />
      </div>
    </div>
    <Grid templateColumns="1fr 320px" gap={300} px={100} py={200} bg="#F0F0F0">
      <Box fontFamily="Jubilat" fontSize={18}>
        {parse(content)}
      </Box>
      <Box bg="#FFD285" p={30} shadow="lg">
        <Heading as="h4" fontSize={24} fontWeight={900} mb={4}>
          {download.dataTitle}
        </Heading>
        <Text mb={5} fontFamily="Jubilat">
          {parse(download.dataIntro)}
        </Text>
        <Box bg="white" px={15} py={4} mb={10}>
          <File style={{ float: 'right' }} />
          <Text fontSize={12} fontWeight={500}>
            {parse(download.fileText)}
          </Text>
          <Link
            fontSize={12}
            textTransform="uppercase"
            fontWeight={900}
            href={download.file1.localFile.url}
            target="_blank"
          >
            Download
          </Link>
        </Box>
        <Box bg="white" px={15} py={4}>
          <File style={{ float: 'right' }} />
          <Text fontSize={12} fontWeight={500}>
            {parse(download.fileText2)}
          </Text>
          <Link
            fontSize={12}
            textTransform="uppercase"
            fontWeight={900}
            href={download.file2.localFile.url}
            target="_blank"
          >
            Download
          </Link>
        </Box>
      </Box>
    </Grid>
  </Layout>
);

About.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default About;
