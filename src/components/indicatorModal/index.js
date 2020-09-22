import React from 'react';

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
        h="auto"
        w="100%"
        minWidth="120px"
        justifyContent="space-between"
        borderBottom="3px solid white"
        _selected={{
          bg: 'white',
          borderLeft: '5px solid #FFD285',
          fontWeight: 'bold',
          fontFamily: 'Jubilat',
        }}
      >
        One
      </CustomTab>
    );
  });
};

const IndicatorModal = () => {
  return (
    <Flex
      w="100%"
      h="100vh"
      bg="#2a69acc9"
      top="0"
      left="0"
      align="center"
      justify="center"
      position="absolute"
    >
      <Box width="500px">
        <Flex justify="space-between" color="white" align="center">
          <Text fontSize="32px" fontFamily="jubilat">
            Health Statistics & Outcomes
          </Text>
          <CloseButton size="lg" fontSize="32px" />
        </Flex>
        <Box bg="#E5E5E5">
          <Flex align="center" justify="center" py={4} borderBottom="3px solid white">
            <Input maxW="200px" borderRadius="100px" />
          </Flex>

          <Tabs variant="unstyled" display="flex">
            <TabList flexDirection="column">{renderTabList()}</TabList>
            <TabPanels width="100%" bg="#F7F7F7">
              <TabPanel>
                <p>two!</p>
                <p>two!</p>
                <p>three!</p>
                <p>one!</p>
                <p>one!</p>
                <p>one!</p>
                <p>one!</p>
                <p>one!</p>
                <p>one!</p>
                <p>three!</p>
              </TabPanel>
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
  );
};

export default IndicatorModal;
