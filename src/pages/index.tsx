import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import DashboardLayout from '@layouts/DashboardLayout';
import PostCard from '@components/PostCard';
import PageHeading from '@components/PageHeading';
import { useRouter } from 'next/router';
import type { Post } from '@prisma/client';
import prisma from '@lib/client';

export default function Home({
  posts,
}: {
  posts: (Post & { author: { name: string | null; image: string | null } })[];
}) {
  const { data, status } = useSession();
  const router = useRouter();
  // if not authenticated, redirect to login page
  if (status === 'unauthenticated') {
    router.push('/login').then((r) => console.log(r));
  }

  return (
    <>
      <PageHeading
        text={`Hello ${data?.user?.name}`}
        subtext={'Discover what others are doing...'}
      />
      <Flex
        height={'full'}
        width={'full'}
        mx={'auto'}
        maxW={'7xl'}
        px={{ base: 2, md: 5 }}
        pb={{ base: 16, md: 28 }}
        mt={16}
      >
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          justifyContent={{ md: 'center', xl: 'space-between' }}
          alignItems={'center'}
          gap={10}
          width={'full'}
          height={'full'}
          wrap={'wrap'}
        >
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={post.description}
                imageUrl={post.images[0]}
                id={post.id}
                likes={post.likes}
                type={post.activityType ?? '2'}
              />
            ))
          ) : (
            <div>No posts found</div>
          )}

          <PostCard
            id={'clcjjznbr0000a7wi1jr2vxiy'}
            title={'My trip in the Alps'}
            description={
              'Lorem Ipsum dolor sit amet long text jibberish something Lorem Ipsum dolor sit amet long text jibberish something Lorem Ipsum dolor sit amet long text jibberish something'
            }
            imageUrl={
              'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
            }
            likes={11}
            type={'1'}
          />
          <PostCard
            id={'clcjjznbr0000a7wi1jr2vxiy'}
            title={'My trip in the Alps'}
            description={
              'Lorem Ipsum dolor sit amet long text jibberish something Lorem Ipsum dolor sit amet long text jibberish something Lorem Ipsum dolor sit amet long text jibberish something'
            }
            imageUrl={
              'https://images.unsplash.com/photo-1484100356142-db6ab6244067?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1067&q=80'
            }
            likes={11}
            type={'3'}
          />
        </Flex>
      </Flex>
    </>
  );
}

export async function getStaticProps() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
