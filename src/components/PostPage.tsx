import {
  Box,
  Link,
  Text,
  Flex,
  Avatar,
  Button,
  HStack,
  Tag,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import Carousel from '@components/Carousel';
import NextLink from 'next/link';
import Stats from '@components/Stats';
import Comments from '@components/Comments';
import type { Post } from '@prisma/client';
import { User } from '@prisma/client';
import PostMap from '@components/Maps/PostMap';
const PostPage: React.FC<{ post: Post & { author: User } }> = ({ post }) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      pt={20}
      width={'full'}
      minH={'100vh'}
      mx={'auto'}
      maxW={'3xl'}
    >
      <NextLink href={'/'} passHref>
        <Link
          _hover={{
            textDecoration: 'underline',
          }}
        >
          <HStack spacing={2} color={'gray.500'} align="center" mt={4} ml={4}>
            <FaArrowLeft size={'10px'} />
            <Text fontSize={'sm'}>See All Posts</Text>
          </HStack>
        </Link>
      </NextLink>
      <Flex
        mt={6}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
      >
        <Carousel cards={post.images} />
      </Flex>
      <Text
        as="h1"
        fontWeight="bold"
        mt={6}
        fontSize={{ base: '3xl', md: '4xl' }}
      >
        {post.title}
      </Text>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent={'space-between'}
        alignItems={{ base: 'center', md: 'flex-start' }}
        maxW={'4xl'}
        mx={'auto'}
        mb={12}
        mt={5}
        width={'full'}
      >
        <Flex alignItems={'center'} my={'auto'}>
          <Tag size={'lg'} colorScheme={'brand'} borderRadius={'full'}>
            <Avatar
              name={post.author.name ?? 'Anon'}
              size={'xs'}
              ml={-2}
              mr={2}
              src={post.author.image ?? ''}
            />
            {post.author.name ?? 'Anon'}
          </Tag>
          <Text color={useColorModeValue('gray.700', 'gray.300')} ml={1}>
            {' • '}
            {'Jan 05 2023'}
          </Text>
        </Flex>
        <HStack
          ml={4}
          as={Button}
          py={1}
          bg={useColorModeValue('gray.100', 'gray.800')}
          sx={{
            '&:hover': {
              bg: useColorModeValue('red.200', 'red.900'),
            },
          }}
        >
          <FaHeart />
          <Text mt={1} fontSize="xs">
            {post.likes}
          </Text>
        </HStack>
      </Flex>
      <Box
        fontSize={{ base: 'sm', md: 'md' }}
        color={useColorModeValue('gray.700', 'gray.400')}
      >
        <Text>{post.description}</Text>
      </Box>
      <Divider mt={10} mb={10} mx={'auto'} />
      <PostMap mapUrl={post.mapUrl} />
      <Stats
        time={post.timeToComplete ?? 'ERR'}
        distance={post.distance ?? 'ERR'}
        elevation={post.elevationGain ?? 'ERR'}
      />
      <Divider mt={10} mb={10} mx={'auto'} />
      <Comments />
    </Box>
  );
};

export default PostPage;
