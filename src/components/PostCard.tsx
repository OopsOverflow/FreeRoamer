import {
  Image,
  Box,
  Text,
  Flex,
  Button,
  AspectRatio,
  useColorMode,
} from '@chakra-ui/react';
import { FaBicycle, FaHeart, FaHiking, FaWalking } from 'react-icons/fa';
import React from 'react';
import Link from 'next/link';

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  type: string;
}
const PostCard = ({
  id,
  title,
  description,
  imageUrl,
  likes,
  type,
}: PostCardProps) => {
  const { colorMode } = useColorMode();
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(likes);
  const handleLike = (event: any) => {
    event.preventDefault();
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  };

  const icon = () => {
    switch (type) {
      case '2':
        return FaBicycle;
      case '1':
        return FaWalking;
      default:
        return FaHiking;
    }
  };

  return (
    <Link href={`/posts/${id}`} passHref>
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
        as={'a'}
      >
        <AspectRatio ratio={16 / 9}>
          <Image roundedTop={'lg'} src={imageUrl} alt={title} />
        </AspectRatio>
        <Box p={4} pb={0}>
          <Text as="h2" fontWeight="bold" noOfLines={1}>
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
              as={icon()}
              size="25px"
              color="green.500"
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
              onClick={(e) => handleLike(e)}
            >
              <FaHeart color={isLiked ? 'red' : 'lightgray'} />
              <Text mt={1} fontSize="xs">
                {likeCount}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default PostCard;
