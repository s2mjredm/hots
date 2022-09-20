import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import { Box, Grid, Heading, Text, Link } from '@chakra-ui/react';

import Layout from '../components/layout';
import Covid19 from '../components/covid19';
import '../css/wordpress.css';
import File from '../svg/file.svg';

export const query = graphql`
  {
    wpPage(id: { eq: "cG9zdDo3" }) {
      ...PageInfo
      download {
        dataintro
        datatitle
        file1 {
          localFile {
            url
          }
        }
        filetextone
        file2 {
          localFile {
            url
          }
        }
        filetexttwo
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
    <Covid19 />
    <div className="hero">
      <div className="item">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="item" style={{ flex: 2, padding: 0 }}>
        <GatsbyImage image={featuredImage.node.localFile.childImageSharp.gatsbyImageData} />
      </div>
    </div>
    <Grid
      templateColumns={['40px 1fr 40px', '1fr 320px']}
      templateRows={['1fr 520px', '1fr']}
      gap={[0, 100, 220]}
      px={[0, 120]}
      paddingTop={[130]}
      paddingBottom={[0, 130]}
      bg="#F0F0F0"
    >
      <Box
        fontFamily="Jubilat"
        fontSize={18}
        gridArea={['1 / 2 / 2 / 3', '1 / 1 / 2 / 2']}
        mb="30px"
        display="grid"
        gridGap="20px"
      >
        {parse(content)}
      </Box>
      <Box
        bg="#FFD285"
        p={30}
        shadow="lg"
        gridArea={['2 / 1 / 3 / 4', '1 / 2 / 2 / 3']}
        maxHeight="570px"
      >
        <Heading as="h4" fontSize={24} fontWeight={900} mb={4}>
          {download.datatitle}
        </Heading>
        <Text mb={5} fontFamily="Jubilat">
          {parse(download.dataintro)}
        </Text>
        <Box bg="white" px={15} py={4} mb={10}>
          <File style={{ float: 'right' }} />
          <Text fontSize={12} fontWeight={500}>
            {parse(download.filetextone)}
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
            <div className="wordpress">{parse(download.filetexttwo)}</div>
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
