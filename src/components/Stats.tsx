import React from 'react';
import {
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  SimpleGrid,
  Container,
  Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';
import { FaClock, FaMap, FaWeight } from 'react-icons/fa';

interface StatData {
  id: number;
  label: string;
  score: string;
  icon: any;
  percentage: string;
}

const statData = (
  time: string,
  distance: string,
  elevation: string,
): StatData[] => [
  {
    id: 1,
    label: 'Distance (km)',
    score: distance,
    icon: FaMap,
    percentage: '10%',
  },
  {
    id: 2,
    label: 'Total Time',
    score: time,
    icon: FaClock,
    percentage: Math.floor(Math.random() * 100).toString() + '%',
  },
  {
    id: 3,
    label: 'Avg. Elevation (m)',
    score: elevation,
    icon: FaWeight,
    percentage: Math.floor(Math.random() * 100).toString() + '%',
  },
];

const Stats = ({
  time,
  distance,
  elevation,
}: {
  time: string;
  distance: string;
  elevation: string;
}) => {
  return (
    <Container minWidth={'full'} mx={'auto'} p={{ base: 5, md: 10 }}>
      <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={5} mt={6} mb={4}>
        {statData(time, distance, elevation).map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

const Card = ({ data }: { data: StatData }) => {
  return (
    <motion.div whileHover={{ translateY: -5 }}>
      <Stack
        direction="column"
        rounded="md"
        boxShadow={useColorModeValue(
          '0 4px 6px rgba(160, 174, 192, 0.6)',
          '2px 4px 6px rgba(9, 17, 28, 0.9)',
        )}
        border={useColorModeValue('1px solid #e2e8f0', '1px solid #2d3748')}
        w="100%"
        textAlign="left"
        align="start"
        spacing={0}
        role="group"
        overflow="hidden"
      >
        <HStack
          py={4}
          px={3}
          spacing={4}
          bg={useColorModeValue('gray.100', 'gray.800')}
          w="100%"
        >
          <Flex
            justify="center"
            alignItems="center"
            rounded="lg"
            p={2}
            bg={useColorModeValue('teal.400', 'teal.300')}
            position="relative"
            w={12}
            h={12}
            overflow="hidden"
            lineHeight={0}
            boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)"
          >
            <Icon as={data.icon} w={6} h={6} color="white" />
          </Flex>
          <VStack spacing={0} align="start" maxW="lg" h="100%">
            <Text as="h3" fontSize="sm" noOfLines={2} color="gray.400">
              {data.label}
            </Text>
            <HStack spacing={2}>
              <Text as="h2" fontSize="lg" fontWeight="extrabold">
                {data.score}
              </Text>
              <Flex>
                {Number(data.score) > 100 ? (
                  <Icon as={BsArrowUpShort} w={6} h={6} color="green.400" />
                ) : (
                  <Icon as={BsArrowDownShort} w={6} h={6} color="red.400" />
                )}
                <Text as="h2" fontSize="md">
                  {data.percentage}
                </Text>
              </Flex>
            </HStack>
          </VStack>
        </HStack>
      </Stack>
    </motion.div>
  );
};

export default Stats;
