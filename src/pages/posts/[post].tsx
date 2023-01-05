import { Flex } from '@chakra-ui/react';
import PostPage from '@components/PostPage';
import React from 'react';
import DashboardLayout from '@layouts/DashboardLayout';
import { useRouter } from 'next/router';
import type { Post, User, Image } from '@prisma/client';
import prisma from '@lib/client';

export default function Post({
  post,
}: {
  post: Post & { author: User; images: Image[] };
}) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // get all the image srcs from the post
  const images = post.images.map((image) => image.src);

  return (
    <Flex
      height={'full'}
      width={'full'}
      mx={'auto'}
      maxW={'7xl'}
      px={{ base: 2, md: 5 }}
      pb={{ base: 16, md: 28 }}
      mt={165}
    >
      <PostPage
        title={post.title}
        description={post.description}
        likes={11}
        author={post.author.name as string}
        images={images}
        avatarUrl={post.author.image ?? ''}
        time={post.timeToComplete ?? ''}
      />
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
      images: true,
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