import React from 'react';
import DashboardLayout from '@layouts/DashboardLayout';
import { Box, Flex, VStack } from '@chakra-ui/react';
import PageHeading from '@components/PageHeading';
import LiveMap from '@components/Maps/LiveMap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function NewRoute() {
  const { status } = useSession();
  const router = useRouter();
  // if not authenticated, redirect to login page
  if (status === 'unauthenticated') {
    router.push('/login').then((r) => console.log(r));
  }
  return (
    <Box
      width={'full'}
      minH={'100vh'}
      height={'full'}
      mx={'auto'}
      maxW={'6xl'}
      px={{ base: 2, md: 5 }}
      pb={{ base: 16, md: 28 }}
    >
      <Flex
        direction={'column'}
        alignItems={'center'}
        width={'full'}
        height={'full'}
        px={'auto'}
      >
        <PageHeading
          text={'Create a new route'}
          subtext={'Explore the world and leave the rest to us'}
        />
        <VStack
          direction={'column'}
          my={16}
          width={'full'}
          maxW={'full'}
          maxWidth={'4xl'}
          gridAutoRows={'1fr'}
          gap={10}
        >
          <LiveMap />
        </VStack>
      </Flex>
    </Box>
  );
}

NewRoute.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
