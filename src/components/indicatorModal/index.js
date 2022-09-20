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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import SearchResults from './SearchResults';
import { slugify } from '../../utils/slugify';
import useIsMobile from '../../utils/useIsMobile';

import './index.css';
import { ChevronRightIcon, SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';

const CustomTab = React.forwardRef((props, ref) => {
  return (
    <Tab ref={ref} isSelected={props.isSelected} {...props}>
      {props.children}
      {props.isSelected ? (
        <ChevronRightIcon w={6} h={6} color="#FFD285" />
      ) : (
        <ChevronRightIcon w={6} h={6} color="white" />
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
        fontFamily="proxima-nova"
        textAlign="start"
        color="rgb(112, 112, 112)"
        lineHeight="22px"
        _selected={{
          color: '#403F3F',
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
        <Box
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
        </Box>
      </Link>
    );
  });
};

const SearchInput = ({ inputValue, onChange, onCloseSearch }) => {
  const [isOnFocus, setIsOnFocus] = useState(false);

  const focusedStyles = { paddingLeft: '270px' };

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
        {isOnFocus && (
          <InputLeftElement>
            <SearchIcon w={8} h={8} name="search" paddingBottom="7px" />
          </InputLeftElement>
        )}
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
          {isOnFocus ? (
            <SmallCloseIcon w={8} h={8} paddingBottom="7px" />
          ) : (
            <SearchIcon w={8} h={8} paddingBottom="7px" />
          )}

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
        <SearchIcon w={8} h={8} name="search" paddingBottom="7px" />
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
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay className="blur" bg="#2a69acc9" />
        <ModalContent bg="none" shadow="none">
          <Box>
            <Flex justify="space-between" color="white" align="center">
              <Text fontSize="38px" fontFamily="Jubilat">
                Health Statistics & Outcomes
              </Text>
              <CloseButton size="lg" fontSize="32px" onClick={onClose} />
            </Flex>
            <Box bg="#E5E5E5" shadow="0px 2px 15px 1px #124d8e;">
              <SearchInput
                inputValue={inputValue}
                onChange={e => handleChange(e)}
                onCloseSearch={() => handleCloseSearch()}
              />
              <Tabs variant="unstyled" display="flex">
                <TabList minWidth="276px" flexDirection="column" borderRight="1px solid #F2F2F2">
                  {renderTabList(Object.keys(categories))}
                </TabList>
                <TabPanels width="100%" bg="#F7F7F7">
                  {!searchResults &&
                    Object.values(categories).map(category => {
                      const indicators = category.map(c => c.title);
                      return (
                        <TabPanel key={category[0].category}>{renderTabPanel(indicators)}</TabPanel>
                      );
                    })}

                  {searchResults && (
                    <Box overflow="auto" overflowX="hidden" h="615px" w="300px" bg="white">
                      <SearchResults isSearchingCovid={isSearchingCovid} results={searchResults} />
                    </Box>
                  )}
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </ModalContent>
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
