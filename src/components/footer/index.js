import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import {
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  Stack,
  Image,
  Divider,
} from "@chakra-ui/core"

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      centerLogo: file(relativePath: { eq: "logos/center-logo.png" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      vcuLogo: file(relativePath: { eq: "logos/vcu-logo.png" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `)

  return (
    <Stack
      py={16}
      px={[5, 120]}
      color="white"
      bg="#184595"
      direction={["column", "row"]}
      spacing="24px"
      fontSize="sm"
    >
      <Box pr={5}>
        <Heading size="md" pb={2}>
          ABOUT
        </Heading>
        <Text fontWeight="semi-bold">
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
        <Text fontWeight="semi-bold">
          We would love to hear from you! <br /> Let us know how you’re using
          this data, or reach out with any comments or questions. <br /> We can
          be reached at: <br /> societyhealth@vcu.edu <br /> 804-628-2462
        </Text>
      </Box>
      <Divider color="#184595" />
      <VStack align="flex-start">
        <Image
          minWidth={200}
          src={data.centerLogo.childImageSharp.fluid.src}
          alt="Center on Society and Health"
        />
        <Image
          minWidth={200}
          src={data.vcuLogo.childImageSharp.fluid.src}
          alt="VCU"
        />
      </VStack>
    </Stack>
  )
}
export default Footer
