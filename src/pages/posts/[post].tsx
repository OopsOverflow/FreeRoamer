import { Flex } from '@chakra-ui/react';
import PostPage from '@components/PostPage';
import React from 'react';
import DashboardLayout from '@layouts/DashboardLayout';
import { useRouter } from 'next/router';
import type { Post, User } from '@prisma/client';
import prisma from '@lib/client';

export default function Post({ post }: { post: Post & { author: User } }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Flex
      height={'full'}
      width={'full'}
      mx={'auto'}
      maxW={'7xl'}
      px={{ base: 2, md: 5 }}
      pb={{ base: 16, md: 28 }}
      mt={5}
    >
      <PostPage post={post} />
    </Flex>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  // fetch the post data using the post ID passed in the params
  const post = await prisma.post.findUnique({
    where: {
      id: params.post,
    },
    include: {
      author: true,
    },
  });

  // return the post data as a prop for the component
  return {
    props: {
      post,
    },
  };
}

// @ts-ignore
Post.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
