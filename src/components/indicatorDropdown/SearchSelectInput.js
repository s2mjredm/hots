import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

import './index.css';

import {
  Box,
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

SelectButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
SelectButton.defaultProps = {
  label: null,
};

const useIsMobile = () => {
  const [width, setWidth] = useState();
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  return isMobile;
};

const useIsModalStyles = isOpen => {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState();
  const [padding, setPadding] = useState();
  const [zIndex, setZIndex] = useState();
  const [labelColor, setLabelColor] = useState();

  useEffect(() => {
    if (isMobile && isOpen) {
      setPosition('fixed');
      setPadding('40px');
      setZIndex('3');
      setLabelColor('white');
    } else {
      setPosition('relative');
      setPadding('0px');
      setZIndex('2');
      setLabelColor('#403F3F');
    }
  }, [isOpen]);
  return [position, padding, zIndex, labelColor];
};

const SearchSelectInput = ({ label, placeholder, items, selectedItem, onSelection }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [position, padding, zIndex, labelColor] = useIsModalStyles(isOpen);

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
    <>
      <FormControl
        className="search-dropdown"
        w={['100%', '100%', '20rem']}
        p={padding}
        mb={[3, 0]}
        position={position}
        left="0px"
        top="0px"
        zIndex={zIndex}
      >
        <FormLabel
          textTransform="uppercase"
          fontFamily="Montserrat"
          color={labelColor}
          fontSize={['md', 'sm']}
          fontWeight={['bold', 'normal']}
        >
          {label}
        </FormLabel>
        <InputGroup fontFamily="Roboto Slab" size="lg">
          <InputLeftElement zIndex="3">
            <Icon name="search" color="gray.700" />
          </InputLeftElement>
          <Input
            zIndex="3"
            autoComplete="off"
            value={inputValue}
            onChange={e => handleChange(e)}
            onFocus={() => onOpen()}
            placeholder={placeholder}
            border="1.3px solid #403F3F"
            fontFamily="Roboto Slab"
            h={[20, 12]}
          />
          {isOpen && (
            <InputRightElement zIndex="3" cursor="pointer" onClick={() => onClose()}>
              <Icon name="chevron-up" color="gray.700" />
            </InputRightElement>
          )}
          {!isOpen && (
            <InputRightElement zIndex="3" cursor="pointer" onClick={() => onOpen()}>
              <Icon name="chevron-down" color="gray.700" />
            </InputRightElement>
          )}
        </InputGroup>
        {isOpen && (
          <Flex
            zIndex="9999"
            position={['initial', 'absolute']}
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
                <SelectButton key={item} label={item} onClick={i => handleSelect(i)} />
              ))}
          </Flex>
        )}
      </FormControl>

      {isOpen && (
        <Box
          position="fixed"
          width="100%"
          height="100vh"
          zIndex="1"
          bg={['#2a69acc9', '#2a69ac00']}
          top="0"
          left="0"
          onClick={() => onClose()}
        />
      )}
    </>
  );
};

SearchSelectInput.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  selectedItem: PropTypes.string,
  onSelection: PropTypes.func.isRequired,
};

SearchSelectInput.defaultProps = {
  label: null,
  placeholder: null,
  selectedItem: null,
};

export default SearchSelectInput;
