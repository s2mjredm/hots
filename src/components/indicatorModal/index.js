import React from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';

import './index.css';
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

const renderTabList = () => {
  return [1, 2, 3].map(tab => {
    return (
      <CustomTab
        key={tab}
        h="46px"
        w="100%"
        justifyContent="space-between"
        borderBottom="3px solid white"
        fontFamily="Roboto"
        _selected={{
          bg: 'white',
          borderLeft: '5px solid #FFD285',
          fontWeight: 'bold',
          fontFamily: 'Jubilat',
        }}
      >
        placeholder
      </CustomTab>
    );
  });
};

const renderTabPanel = () => {
  return [1, 2, 3].map(i => {
    return (
      <PseudoBox
        py={2}
        px={4}
        bg="white"
        fontFamily="News Cycle"
        fontSize="18px"
        borderBottom="1px solid #E5E5E5"
        color="#707070"
        cursor="pointer"
        _hover={{ fontWeight: 'bold' }}
      >
        placeholder
      </PseudoBox>
    );
  });
};

const IndicatorModal = ({ onClose, isOpen }) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay className="blur" bg="#2a69acc9" />
      <Flex
        w="100%"
        h="100vh"
        top="0"
        left="0"
        align="center"
        justify="center"
        position="absolute"
        zIndex="1301"
      >
        <Box width="600px">
          <Flex justify="space-between" color="white" align="center">
            <Text fontSize="38px" fontFamily="jubilat">
              Health Statistics & Outcomes
            </Text>
            <CloseButton size="lg" fontSize="32px" onClick={onClose} />
          </Flex>
          <Box bg="#E5E5E5">
            <Flex align="center" justify="center" py={4} borderBottom="3px solid white">
              <InputGroup fontFamily="Roboto Slab" size="lg" color="gray.300">
                <Input
                  autoComplete="off"
                  placeholder="Search"
                  fontFamily="Roboto Slab"
                  color="gray.600"
                  h="40px"
                  maxW="285px"
                  borderRadius="100px"
                />
                <InputRightElement children={<Icon h="40px" name="search" />} />
              </InputGroup>
            </Flex>
            <Tabs variant="unstyled" display="flex">
              <TabList minWidth="256px" flexDirection="column" borderRight="1px solid #F2F2F2">
                {renderTabList()}
              </TabList>
              <TabPanels width="100%" bg="#F7F7F7">
                <TabPanel>{renderTabPanel()}</TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Flex>
    </Modal>
  );
};

export default IndicatorModal;
