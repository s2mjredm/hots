import React, { useState } from 'react';
import Fuse from 'fuse.js';

import './index.css';

import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  PseudoBox,
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

export default SearchSelectInput;
