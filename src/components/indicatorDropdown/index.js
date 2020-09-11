import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import Fuse from 'fuse.js';

import './index.css';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  PseudoBox,
  Text,
  useDisclosure,
} from '@chakra-ui/core';

const SelectButton = ({ label, onClick }) => {
  return (
    <PseudoBox
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
    </PseudoBox>
  );
};

const SearchSelectInput = ({ label, placeholder, items, selectedItem, onSelection }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputValue, setInputValue] = useState(selectedItem);
  const [itemsList, setItemsList] = useState(items);

  const handleChange = event => {
    setInputValue(event.target.value);
    const fuse = new Fuse(items);
    const searchResults = fuse.search(event.target.value).map(i => i.item);
    const newItemsList = searchResults.length > 0 ? searchResults : items;
    setItemsList(newItemsList);
  };

  const handleSelect = item => {
    setInputValue(item);
    onSelection(item);
    onClose();
  };

  return (
    <FormControl className="search-dropdown" w={['100%', '100%', '20rem']} position="relative">
      <FormLabel textTransform="uppercase" fontFamily="Montserrat" color="#403F3F" fontSize="sm">
        {label}
      </FormLabel>
      <InputGroup fontFamily="Roboto Slab" size="lg">
        <InputLeftElement children={<Icon name="search" color="gray.700" />} />
        <Input
          autoComplete="off"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => onOpen()}
          placeholder={placeholder}
          border="1.3px solid #403F3F"
          fontFamily="Roboto Slab"
          h={[20, 12]}
        />
        <InputRightElement children={<Icon name="chevron-down" color="gray.700" />} />
      </InputGroup>
      {isOpen && (
        <Flex
          zIndex="9999"
          position="absolute"
          bg="white"
          w="100%"
          shadow="md"
          overflowY="auto"
          maxHeight="340px"
          border="1px solid #F2F2F2"
          direction="column"
        >
          {itemsList &&
            itemsList.length > 0 &&
            itemsList.map(item => (
              <SelectButton label={item} onClick={item => handleSelect(item)} />
            ))}
        </Flex>
      )}
    </FormControl>
  );
};

const useNavigate = (indicator, state) => {
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(false);
  const [url, setUrl] = useState();

  function slugify(string) {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  useEffect(() => {
    if (indicator && state) {
      setIsNavigationEnabled(true);
      setUrl(`/${slugify(indicator)}/${slugify(state)}`);
    } else {
      setIsNavigationEnabled(false);
    }
  }, [indicator, state]);

  return [isNavigationEnabled, url];
};

const IndicatorDropdown = () => {
  const [selectedIndicator, setSelectedIndicator] = useState();
  const [selectedState, setSelectedState] = useState();
  const [isNavigationEnabled, url] = useNavigate(selectedIndicator, selectedState);

  const { allStatesCsv, allIndicatorsCsv } = useStaticQuery(graphql`
    query DataQuery {
      allStatesCsv {
        nodes {
          name
        }
      }
      allIndicatorsCsv {
        nodes {
          title
        }
      }
    }
  `);
  const indicatorList = allIndicatorsCsv.nodes.map(indicator => indicator.title);
  const stateList = allStatesCsv.nodes.map(state => state.name);

  const handleIndicatorSelection = indicator => {
    setSelectedIndicator(indicator);
  };
  const handleStateSelection = state => {
    setSelectedState(state);
  };

  return (
    <Box p={[10, 20]} color="gray.text">
      <Heading fontFamily="Montserrat" color="#403F3F">
        How is your state doing?
      </Heading>
      <Text my={3} fontSize={24} fontFamily="Roboto Slab" letterSpacing="-0.06rem">
        Map it! Choose a health statistic or outcome to see results mapped for the whole United
        States. Select a state for more detailed information on that state’s health:
      </Text>
      <Flex
        py={25}
        direction={['column', 'column', 'row']}
        fontSize="sm"
        alignItems="flex-end"
        justify={['start', 'space-between']}
      >
        <SearchSelectInput
          label="Health Statistics & Outcomes"
          placeholder="Select"
          selectedItem={selectedIndicator}
          items={indicatorList}
          onSelection={indicator => handleIndicatorSelection(indicator)}
        />
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
        <SearchSelectInput
          label="State"
          placeholder="Select"
          selectedItem={selectedState}
          items={stateList}
          onSelection={state => handleStateSelection(state)}
        />
        <Button
          isDisabled={!isNavigationEnabled}
          bg="#F06060"
          color="white"
          size="lg"
          h={[20, 12]}
          w={['100%', '100%', 'xs']}
          minWidth={['100&', '190px']}
          fontSize={['26px', '16px']}
          onClick={() => navigate(url)}
        >
          EXPLORE STATE RANKINGS
        </Button>
      </Flex>
    </Box>
  );
};

export default IndicatorDropdown;
