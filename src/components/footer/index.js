import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Box, Heading, Text, Flex } from '@chakra-ui/core';

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      centerLogo: file(relativePath: { eq: "logos/center-logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 230) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      vcuLogo: file(relativePath: { eq: "logos/vcu-logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 230) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Flex
      py={16}
      px={[10, 20, 120]}
      color="white"
      bg="#184595"
      direction={['column', 'column', 'row']}
      spacing="24px"
      fontSize="sm"
      className="to-print-footer"
    >
      <Box pr={5} pb={4}>
        <Heading size="md" pb={2} fontFamily="proxima-nova" fontWeight="500">
          ABOUT
        </Heading>
        <Text w={['100%', 'md']} fontFamily="proxima-nova" fontWeight="500">
          State of Health is an initiative conducted by the Center on Society and Health at Virginia
          Commonwealth University, and funded by the Robert Wood Johnson Foundation. Our aim is to
          provide a more complete picture of health, and the conditions that shape health, at the
          state level. Armed with this knowledge, our hope is that this information can help
          policymakers and other change agents better understand the health of the states and
          conditions that could be prioritized to improve health and wellbeing.
          <br />
          <span style={{ paddingTop: '8px' }} />
          <br />
          The Center on Society and Health is an academic research center studying the impact of
          social factors on health. Learn more at
          <a
            href="https://societyhealth.vcu.edu/"
            style={{ textDecoration: 'underline', paddingLeft: '5px' }}
          >
            societyhealth.vcu.edu
          </a>
        </Text>
      </Box>
      <Box>
        <Heading size="md" pb={2} fontFamily="proxima-nova" fontWeight="500">
          CONTACT
        </Heading>
        <Text pb={4} fontFamily="proxima-nova" fontWeight="500">
          We would love to hear from you! Let us know how you’re using this data, or reach out with
          any comments or questions. We can be reached at:
          <a
            href="mailto:societyhealth@vcu.edu"
            style={{ textDecoration: 'underline', padding: '0 5px' }}
          >
            societyhealth@vcu.edu
          </a>
          804-628-2462
        </Text>
      </Box>
      <Box w={['lg']} display={['none', 'none', 'none', 'block']} />
      <Flex align="flex-start" w={['100%', 'md']} direction={['column', 'row', 'column']}>
        <a href="https://societyhealth.vcu.edu/">
          <Img
            style={{
              minWidth: 100,
              width: 230,
              marginRight: 40,
            }}
            fluid={data.centerLogo.childImageSharp.fluid}
            alt="Center on Society and Health"
          />
        </a>
        <a href="https://www.vcu.edu">
          <Img
            style={{
              minWidth: 100,
              width: 230,
              marginTop: 40,
            }}
            fluid={data.vcuLogo.childImageSharp.fluid}
            alt="VCU"
          />
        </a>
      </Flex>
    </Flex>
  );
};
export default Footer;
