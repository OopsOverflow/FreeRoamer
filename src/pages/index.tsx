import React from 'react';
import Head from 'next/head';
import {Button, Flex, Heading, useColorMode, useColorModeValue} from '@chakra-ui/react';
import Link from "next/link";
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data, status } = useSession();
  const { toggleColorMode: toggleMode } = useColorMode();
  const bg = useColorModeValue('red', 'teal')
  return (
      <Flex
        height={'100%'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={5}
      >
        <Heading as={'h1'} size={'xl'}>
         {status === "authenticated"? <span>{`${data?.user?.name} `} is Logged in</span>: <span>Hello World</span>}
        </Heading>
        <Button
          onClick={toggleMode}
          colorScheme={bg}
        >
          Switch
        </Button>
        <Link href={"/login"}>
          <a>Login</a>
        </Link>
      </Flex>
  );
}
