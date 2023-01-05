import {
  Image,
  Box,
  Text,
  Flex,
  Button,
  AspectRatio,
  useColorMode,
} from '@chakra-ui/react';
import { FaBicycle, FaHeart } from 'react-icons/fa';
import React from 'react';

interface PostCardProps {
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
}
const PostCard = ({ title, description, imageUrl, likes }: PostCardProps) => {
  const { colorMode } = useColorMode();
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(likes);
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <Box
      rounded="lg"
      boxSize={{ base: 'xs', md: 'sm' }}
      // make the box fit the content
      h={'full'}
      w={'full'}
      bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
      border="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      shadow="md"
      py={0}
      // slide to the top on hover
      _hover={{
        transform: 'translateY(-5px)',
        transition: 'transform 0.4s',
      }}
      transition="transform 0.2s"
    >
      <AspectRatio ratio={16 / 9}>
        <Image roundedTop={'lg'} src={imageUrl} alt={title} />
      </AspectRatio>
      <Box p={4} pb={0}>
        <Text as="h2" fontWeight="bold">
          {title}
        </Text>
        <Box mt={2} fontSize="sm" overflow="hidden" textOverflow="ellipsis">
          <Text noOfLines={[1, 2]}>{description}</Text>
          <Box
            position="relative"
            bottom="0"
            left="0"
            right="0"
            top="0"
            bg="white"
            opacity="0.5"
          />
        </Box>
        <Flex mt={5} align="center" justify={'space-between'}>
          <Box
            as={FaBicycle}
            size="25px"
            color="red.500"
            bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
            rounded="full"
            p={1}
          />
          <Flex
            ml={4}
            direction={'column'}
            as={Button}
            py={1}
            bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
            sx={{
              '&:hover': {
                bg: colorMode === 'light' ? 'red.200' : 'red.900',
              },
            }}
            onClick={() => handleLike()}
          >
            <FaHeart color={isLiked ? 'red' : 'lightgray'} />
            <Text mt={1} fontSize="xs">
              {likeCount}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default PostCard;
