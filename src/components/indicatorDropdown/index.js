import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import './index.css';

import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Select,
  Stack,
  Text,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  useDisclosure,
} from '@chakra-ui/core';

const SearchSelectInput = ({ label, placeholder }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [value, setValue] = useState('');
  const handleChange = event => setValue(event.target.value);

  const handleSelect = label => {
    console.log(label);
    setValue(label);
    onClose();
  };

  const SelectButton = ({ label, onClick }) => {
    return (
      <Box
        as="button"
        onClick={() => onClick(label)}
        w="100%"
        lineHeight="3.2rem"
        borderBottom="1px solid #F2F2F2"
        fontFamily="Roboto Slab"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        fontSize="18px"
        fontWeight="semibold"
        bg="white"
        borderColor="white"
        color="#7F7F7F"
        textAlign="start"
        px={5}
        _hover={{ bg: '#FFD285', color: '#2D3748' }}
        _active={{
          bg: '#FFD285',
          transform: 'scale(0.99)',
          border: 'none',
        }}
        _focus={{
          border: 'none',
        }}
      >
        {label}
      </Box>
    );
  };

  return (
    <FormControl id="email" className="search-dropdown">
      <FormLabel textTransform="uppercase" textStyle="titles" fontSize="sm">
        {label}
      </FormLabel>
      <InputGroup fontFamily="Roboto Slab" size="lg">
        {/* <InputLeftElement color="gray.300" fontSize="1.2em" children={<SearchIcon />} /> */}
        <Input
          autoComplete="off"
          value={value}
          onChange={handleChange}
          onFocus={() => onOpen()}
          placeholder="Enter amount"
          border="1.3px solid #403F3F"
          fontFamily="Roboto Slab"
        />
        <InputRightElement children={<ChevronDownIcon />} />
      </InputGroup>
      {isOpen && (
        <VStack
          spacing="0"
          zIndex="9999"
          position="absolute"
          bg="white"
          width="100%"
          shadow="md"
          overflowY="auto"
          maxHeight="340px"
          border="1px solid #F2F2F2"
        >
          <SelectButton label="Select" onClick={label => handleSelect(label)} />
        </VStack>
      )}
    </FormControl>
  );
};

const IndicatorDropdown = () => {
  return (
    <Box p={20} color="gray.text">
      <Heading textStyle="titles">How is your state doing?</Heading>
      <Text my={3} fontSize={24} fontFamily="Roboto Slab" letterSpacing="-0.06rem">
        Map it! Choose a health statistic or outcome to see results mapped for the whole United
        States. Select a state for more detailed information on that state’s health:
      </Text>
      <Stack
        py={25}
        direction={['column', 'column', 'row']}
        fontSize="sm"
        alignItems="flex-end"
        spacing={21}
      >
        <SearchSelectInput label="Health Statistics & Outcomes" placeholder="Select" />
        <Button
          display={['none', 'block']}
          variant="link"
          size="md"
          color="#F06060"
          minW="100px"
          mb={3}
        >
          SHOW ALL
        </Button>
        <SearchSelectInput label="State" placeholder="Select" />
        <Button
          bg="#F06060"
          colorScheme="#184595"
          size="lg"
          w="100%"
          minWidth="190px"
          fontSize="25px"
        >
          EXPLORE STATE RANKINGS
        </Button>
      </Stack>
    </Box>
  );
};

export default IndicatorDropdown;
