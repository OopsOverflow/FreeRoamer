import React from 'react';
import { chakra, Heading } from '@chakra-ui/react';

function PageHeading({ ...props }: { text: string; subtext: string }) {
  return (
    <>
      <Heading
      as={'h1'}
      mt="28"
      fontSize={{base: `3xl`, sm: `4xl`, md: `5xl`, lg: `6xl`}}
      textAlign="center"
    >
      {props.text}
    </Heading>
      <chakra.div
        mt={6}
        textAlign={'center'}
        fontSize={{ base: `3xs`, sm: `xs`, md: `sm`, lg: `md` }}
        fontWeight={'semibold'}
      >
        {props.subtext}
      </chakra.div>
    </>
  );
}

export default PageHeading;
