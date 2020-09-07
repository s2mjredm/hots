import React from "react"
import { Heading, Flex, Button } from "@chakra-ui/core"
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons"

const Header = () => (
  <Flex
    py={4}
    pl={[2, 120]}
    pr={[2, 12]}
    shadow="lg"
    direction="row"
    align="center"
    width="100%"
    justify="space-between"
    fontSize="sm"
    textStyle="header"
  >
    <Button
      display={["block", "none"]}
      leftIcon={<SearchIcon />}
      variant="link"
      size="lg"
      colorScheme="gray.800"
    />
    <Flex direction="row" align="center">
      <Heading textStyle="header">State of Health</Heading>
    </Flex>
    <Button
      display={["none", "block"]}
      textStyle="header"
      variant="link"
      size="sm"
      colorScheme="gray.800"
    >
      MAP IT
    </Button>
    <Button
      display={["none", "block"]}
      textStyle="header"
      variant="link"
      size="sm"
      colorScheme="gray.800"
    >
      LEARN MORE
    </Button>
    <Button
      display={["none", "block"]}
      textStyle="header"
      variant="link"
      size="sm"
      colorScheme="gray.800"
    >
      TAKE ACTION
    </Button>
    <Button
      display={["none", "block"]}
      textStyle="header"
      variant="link"
      size="sm"
      colorScheme="gray.800"
    >
      ABOUT THE DATA
    </Button>
    <Button
      display={["none", "block"]}
      leftIcon={<SearchIcon />}
      variant="link"
      size="md"
      colorScheme="gray.800"
    />
    <Button
      display={["block", "none"]}
      leftIcon={<HamburgerIcon />}
      variant="link"
      size="lg"
      colorScheme="gray.800"
    />
  </Flex>
)

export default Header
