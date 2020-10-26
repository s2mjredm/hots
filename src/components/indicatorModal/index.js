import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';

import Fuse from 'fuse.js';
import { groupBy } from 'lodash';

import {
  Flex,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  CloseButton,
  Text,
  Icon,
  PseudoBox,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
} from '@chakra-ui/core';

import { slugify } from '../../utils/slugify';
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
      <PseudoBox
        key={i}
        py={2}
        px={4}
        bg="white"
        fontFamily="News Cycle"
        textAlign="start"
        fontSize="18px"
        borderBottom="1px solid #E5E5E5"
        color="#707070"
        cursor="pointer"
        _hover={{ fontWeight: 'bold' }}
      >
        <Link to={`/${slugify(i)}`}>{i}</Link>
      </PseudoBox>
    );
  });
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
  const [inputValue, setInputValue] = useState('');

  const [searchResults, setSearchResults] = useState(nodes);

  const [categories, setCategories] = useState(
    groupBy(
      searchResults.map(n => ({ ...n, tags: n.tags.split(';') })),
      'category'
    )
  );

  useEffect(() => {
    setCategories(
      groupBy(
        searchResults.map(n => ({ ...n, tags: n.tags.split(';') })),
        'category'
      )
    );
  }, [searchResults]);

  const handleChange = event => {
    setInputValue(event.target.value);

    const options = {
      includeScore: false,
      keys: ['category'],
    };

    const fuse = new Fuse(nodes, options);

    const results = fuse.search(event.target.value).map(i => i.item);
    const newItemsList = results.length > 0 ? results : nodes;
    setSearchResults(newItemsList);
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay className="blur" bg="#2a69acc9" />
      <Flex w="100%" h="100vh" top="0" left="0" justify="center" position="absolute" zIndex="1301">
        <Box width="600px">
          <Flex justify="space-between" color="white" align="center">
            <Text fontSize="38px" fontFamily="Jubilat">
              Health Statistics & Outcomes
            </Text>
            <CloseButton size="lg" fontSize="32px" onClick={onClose} />
          </Flex>
          <Box bg="#E5E5E5">
            <Flex align="center" justify="center" py={4} borderBottom="3px solid white">
              <InputGroup fontFamily="Jubilat" size="lg" color="gray.300">
                <Input
                  autoComplete="off"
                  onChange={e => handleChange(e)}
                  value={inputValue}
                  placeholder="Search"
                  fontFamily="Jubilat"
                  color="gray.600"
                  h="40px"
                  maxW="285px"
                  borderRadius="100px"
                />
                <InputRightElement>
                  <Icon h="40px" name="search" />
                </InputRightElement>
              </InputGroup>
            </Flex>
            <Tabs variant="unstyled" display="flex">
              <TabList minWidth="276px" flexDirection="column" borderRight="1px solid #F2F2F2">
                {renderTabList(Object.keys(categories))}
              </TabList>
              <TabPanels width="100%" bg="#F7F7F7">
                {Object.values(categories).map(category => {
                  const indicators = category.map(c => c.title);
                  return (
                    <TabPanel key={category[0].category}>{renderTabPanel(indicators)}</TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Flex>
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
