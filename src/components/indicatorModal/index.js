import React, { useState, useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';

import Fuse from 'fuse.js';
import { groupBy } from 'lodash';

import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  PseudoBox,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/core';

import SearchResults from './SearchResults';
import { slugify } from '../../utils/slugify';
import useIsMobile from '../../utils/useIsMobile';

import './index.css';

const CustomTab = React.forwardRef((props, ref) => {
  return (
    <Tab ref={ref} isSelected={props.isSelected} {...props}>
      {props.children}
      {props.isSelected ? (
        <Icon name="chevron-right" size="24px" color="#FFD285" />
      ) : (
        <Icon name="chevron-right" size="24px" color="white" />
      )}
    </Tab>
  );
});
CustomTab.displayName = 'CustomTab';
CustomTab.propTypes = {
  isSelected: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
CustomTab.defaultProps = {
  isSelected: false,
};

const renderTabList = categories => {
  return categories.map(tab => {
    return (
      <CustomTab
        key={tab}
        h="56px"
        w="100%"
        justifyContent="space-between"
        borderBottom="3px solid white"
        fontFamily="Roboto"
        textAlign="start"
        _selected={{
          bg: 'white',
          borderLeft: '5px solid #FFD285',
          fontWeight: 'bold',
          fontFamily: 'Jubilat',
        }}
      >
        {tab}
      </CustomTab>
    );
  });
};

const renderTabPanel = indicators => {
  return indicators.map(i => {
    return (
      <Link key={i} to={`/${slugify(i)}`}>
        <PseudoBox
          py={2}
          px={4}
          bg="white"
          fontFamily="News Cycle"
          textAlign="start"
          fontSize="18px"
          borderBottom="1px solid #E5E5E5"
          color="#707070"
          cursor="pointer"
          _hover={{ fontWeight: 'bold', bg: '#FFD285', color: 'rgb(26, 32, 44)' }}
        >
          {i}
        </PseudoBox>
      </Link>
    );
  });
};

const SearchInput = ({ inputValue, onChange, onCloseSearch }) => {
  const [isOnFocus, setIsOnFocus] = useState(false);

  const focusedStyles = { paddingLeft: '290px' };

  return (
    <Flex
      transition="0.6s ease-in-out"
      align="center"
      justify="center"
      py={4}
      borderBottom="3px solid white"
      style={isOnFocus ? focusedStyles : null}
    >
      <InputGroup fontFamily="Jubilat" size="lg" color="gray.300">
        <InputLeftElement>
          {isOnFocus && <Icon h="40px" name="search" paddingBottom="7px" />}
        </InputLeftElement>
        <Input
          autoComplete="off"
          onChange={e => onChange(e)}
          onFocus={() => setIsOnFocus(true)}
          onBlur={() => setIsOnFocus(false)}
          value={inputValue}
          placeholder="Search"
          fontFamily="Jubilat"
          color="gray.600"
          h="40px"
          maxW="285px"
          borderRadius="100px"
          focusBorderColor="#FFD285"
        />
        <InputRightElement onClick={() => onCloseSearch()}>
          <Icon h="40px" name={isOnFocus ? 'small-close' : 'search'} paddingBottom="7px" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

SearchInput.displayName = 'SearchInput';
SearchInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onCloseSearch: PropTypes.func.isRequired,
};

const SearchInputMobile = ({ inputValue, onChange }) => {
  return (
    <InputGroup fontFamily="Jubilat" size="lg" color="#403F3F">
      <InputLeftElement>
        <Icon size="20px" h="40px" name="search" paddingBottom="8px" />
      </InputLeftElement>
      <Input
        variant="unstyled"
        autoComplete="off"
        onChange={e => onChange(e)}
        value={inputValue}
        placeholder="Search"
        fontFamily="proxima-nova"
        fontWeight="900"
        fontSize="30px"
        h="40px"
        border="none"
      />
    </InputGroup>
  );
};

SearchInputMobile.displayName = 'SearchInput';
SearchInputMobile.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const IndicatorModal = ({ onClose, isOpen }) => {
  const {
    allIndicatorsJson: { nodes },
  } = useStaticQuery(
    graphql`
      query {
        allIndicatorsJson {
          nodes {
            title
            category
            tags
          }
        }
      }
    `
  );

  const nodesWithTagsAsArray = useRef(nodes.map(n => ({ ...n, tags: n.tags.split(';') })));

  const fuseSearchOptions = {
    includeScore: true,
    keys: ['tags'],
  };

  const nodesWithTagsAsArrayPlusCovid = [
    ...nodesWithTagsAsArray.current,
    { title: 'covid', categories: 'covid', tags: ['covid', 'corona', 'covid-19'] },
  ];
  const fuse = useRef(new Fuse(nodesWithTagsAsArrayPlusCovid, fuseSearchOptions));

  const [inputValue, setInputValue] = useState('');

  const [searchResults, setSearchResults] = useState();

  const [categories /* , setCategories */] = useState(
    groupBy(nodesWithTagsAsArray.current, 'category')
  );

  const [isSearchingCovid, setIsSearchingCovid] = useState(false);

  const isMobile = useIsMobile();

  const handleChange = event => {
    const input = event.target.value;
    setInputValue(input);

    if (input.length > 0) {
      const fuseSearch = fuse.current;

      const results = fuseSearch
        .search(input)
        .filter(i => i.score > 0)
        .map(i => {
          return i.item;
        });
      setSearchResults(results);
      if (results[0].title === 'covid') {
        setIsSearchingCovid(true);
      } else {
        setIsSearchingCovid(false);
      }
    } else {
      setSearchResults();
      setIsSearchingCovid(false);
    }
  };

  const handleCloseSearch = () => {
    setSearchResults();
    setInputValue('');
  };

  if (!isMobile) {
    return (
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay className="blur" bg="#2a69acc9" />
        <Flex
          w="100%"
          h="100vh"
          top="0"
          left="0"
          justify="center"
          position="absolute"
          zIndex="1301"
        >
          <Box width="630px">
            <Flex justify="space-between" color="white" align="center">
              <Text fontSize="38px" fontFamily="Jubilat">
                Health Statistics & Outcomes
              </Text>
              <CloseButton size="lg" fontSize="32px" onClick={onClose} />
            </Flex>
            <Box bg="#E5E5E5">
              <SearchInput
                inputValue={inputValue}
                onChange={e => handleChange(e)}
                onCloseSearch={() => handleCloseSearch()}
              />
              <Tabs variant="unstyled" display="flex">
                <TabList minWidth="276px" flexDirection="column" borderRight="1px solid #F2F2F2">
                  {renderTabList(Object.keys(categories))}
                </TabList>
                <TabPanels width="100%" bg="white">
                  {!searchResults &&
                    Object.values(categories).map(category => {
                      const indicators = category.map(c => c.title);
                      return (
                        <TabPanel key={category[0].category}>{renderTabPanel(indicators)}</TabPanel>
                      );
                    })}

                  {searchResults && (
                    <TabPanel>
                      <SearchResults isSearchingCovid={isSearchingCovid} results={searchResults} />
                    </TabPanel>
                  )}
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </Flex>
      </Modal>
    );
  }
  return (
    <Modal preserveScrollBarGap isOpen={isOpen} onClose={onClose} size="full" isCentered>
      <ModalOverlay bg="#F0F0F0" />
      <ModalContent bg="white" shadow="none" h="100%">
        <Box ml="40px" mt="20px" onClick={onClose}>
          <Icon name="arrow-back" size="26px" />
        </Box>
        <Box mx="32px" my={8}>
          <SearchInputMobile inputValue={inputValue} onChange={e => handleChange(e)} />
        </Box>
        <ModalBody pb={6} display="flex" flexDirection="column" bg="#F0F0F0">
          <SearchResults isSearchingCovid={isSearchingCovid} results={searchResults} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

IndicatorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

IndicatorModal.defaultProps = {
  isOpen: false,
};

export default IndicatorModal;
