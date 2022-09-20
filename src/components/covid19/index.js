import React, { useState } from 'react';
import { Box, Text, Collapse, Icon } from '@chakra-ui/react';

const Covid19 = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  return (
    <>
      <Box h={65} bg="#F06060" lineHeight="65px">
        <Box
          onClick={handleToggle}
          float="right"
          h="100%"
          bg="none"
          color="white"
          fontSize={40}
          fontWeight={300}
          cursor="pointer"
          w={10}
        >
          <Icon name="plus" />
        </Box>
        <Text
          fontFamily="proxima-nova"
          fontWeight="900"
          fontSize={20}
          color="white"
          textAlign="center"
        >
          <Icon name="attention" mr={1} />
          COVID-19
        </Text>
      </Box>
      <Collapse isOpen={show} bg="#F06060">
        <Text
          px={[10, 20]}
          pb="10"
          color="white"
          fontFamily="proxima-nova"
          fontWeight="500"
          fontSize="16"
        >
          The data featured on this site reflect state outcomes well before the coronavirus pandemic
          began in 2020. While this website therefore does not present COVID-19 statistics, the
          types of social and environmental conditions featured on this site are the major drivers
          of how well or poorly populations are able to weather any natural disaster, from pandemics
          to severe weather events. We encourage states to use this tool to see where they stand on
          these core conditions, and where important improvements could be made.
        </Text>
      </Collapse>
    </>
  );
};

export default Covid19;
