import React from 'react';
import '../styles/globals.css';
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react';
import theme from "../theme";
import AppLayout from "../components/AppLayout";


export default function App({  Component,  pageProps: { session, ...pageProps }}
  : {
    Component: React.FC,
    pageProps: any,
  }) {
  return (
    <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ChakraProvider>
    </SessionProvider>
  )
}
