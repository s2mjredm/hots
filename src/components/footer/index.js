import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Box, Heading, Text, Flex } from '@chakra-ui/core';

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      centerLogo: file(relativePath: { eq: "logos/center-logo.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      vcuLogo: file(relativePath: { eq: "logos/vcu-logo.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Flex
      py={16}
      px={[5, 120]}
      color="white"
      bg="#184595"
      direction={['column', 'column', 'row']}
      spacing="24px"
      fontSize="sm"
    >
      <Box pr={5} pb={4}>
        <Heading size="md" pb={2}>
          ABOUT
        </Heading>

        <Text fontWeight="semi-bold" w={['100%', 'md']}>
          State of Health is an initiative conducted by the Center on Society and Health at Virginia
          Commonwealth University, and funded by the Robert Wood Johnson Foundation. Our aim is to
          provide a more complete picture of health, and the conditions that shape health, at the
          state level. Armed with this knowledge, our hope is that this information can help
          policymakers and other change agents better understand the health of the states and
          conditions that could be prioritized to improve health and wellbeing. The Center on
          Society and Health is an academic research center studying the impact of social factors on
          health. Learn more at societyhealth.vcu.edu
        </Text>
      </Box>
      <Box>
        <Heading size="md" pb={2}>
          CONTACT
        </Heading>
        <Text fontWeight="semi-bold" pb={4}>
          We would love to hear from you!
          <br />
          Let us know how you’re using this data, or reach out with any comments or questions.
          <br />
          We can be reached at:
          <br />
          societyhealth@vcu.edu
          <br />
          804-628-2462
        </Text>
      </Box>
      <Box w={['lg']} display={['none', 'none', 'none', 'block']} />
      <Flex align="flex-start" w="md" direction={['row', 'row', 'column']}>
        <Img
          style={{
            minWidth: 100,
            width: 230,
            marginRight: 40,
          }}
          fluid={data.centerLogo.childImageSharp.fluid}
          alt="Center on Society and Health"
        />
        <Img
          style={{
            minWidth: 100,
            width: 230,
            marginTop: 40,
          }}
          fluid={data.vcuLogo.childImageSharp.fluid}
          alt="VCU"
        />
      </Flex>
    </Flex>
  );
};
export default Footer;
