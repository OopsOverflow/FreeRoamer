import React from 'react';
import Head from 'next/head';
import {Button, Flex, Heading, useColorMode, useColorModeValue} from '@chakra-ui/react';
import Link from "next/link";

export default function Home() {
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
          Hello World!
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
