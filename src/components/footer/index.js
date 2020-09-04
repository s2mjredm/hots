import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Image, Divider } from "@chakra-ui/core"

import { Flex, Box, Heading, Text, VStack } from "@chakra-ui/core"

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      csgLogo: file(relativePath: { eq: "logos/csh-logo.png" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      hLogo: file(relativePath: { eq: "logos/h-logo.png" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `)

  return (
    <Flex
      py={16}
      px={[120]}
      color="white"
      bg="#184595"
      direction={["column", "row"]}
      width="100%"
      justify="space-between"
      fontSize="sm"
    >
      <Box pr={5}>
        <Heading size="md" pb={2}>
          ABOUT
        </Heading>
        <Text width="sm" fontWeight="semi-bold">
          State of Health is an initiative conducted by the Center on Society
          and Health at Virginia Commonwealth University, and funded by the
          Robert Wood Johnson Foundation. Our aim is to provide a more complete
          picture of health, and the conditions that shape health, at the state
          level. Armed with this knowledge, our hope is that this information
          can help policymakers and other change agents better understand the
          health of the states and conditions that could be prioritized to
          improve health and wellbeing. The Center on Society and Health is an
          academic research center studying the impact of social factors on
          health. Learn more at societyhealth.vcu.edu
        </Text>
      </Box>
      <Box>
        <Heading size="md" pb={2}>
          CONTACT
        </Heading>
        <Text width={300} fontWeight="semi-bold">
          We would love to hear from you! <br /> Let us know how you’re using
          this data, or reach out with any comments or questions. <br /> We can
          be reached at: <br /> societyhealth@vcu.edu <br /> 804-628-2462
        </Text>
      </Box>
      <Divider color="#184595" />
      <VStack minWidth="200px" w={500} align="flex-start">
        <Image
          src={data.csgLogo.childImageSharp.fluid.src}
          alt="Segun Adebayo"
        />
        <Image src={data.hLogo.childImageSharp.fluid.src} alt="Segun Adebayo" />
      </VStack>
    </Flex>
  )
}
export default Footer
