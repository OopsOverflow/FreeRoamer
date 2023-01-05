import React, {ReactElement, ReactNode} from 'react';
import '../styles/globals.css';
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react';
import theme from "../theme";
import {AppProps} from "next/app";
import {NextPage} from "next";
import 'mapbox-gl/dist/mapbox-gl.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({  Component,  pageProps: { session, ...pageProps }}
  : {
    Component: React.FC,
    pageProps: any,
  }) {
  const getLayout = (Component as NextPageWithLayout).getLayout ?? ((page: React.ReactElement) => page)
  return (
    <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
    </SessionProvider>
  )
}
