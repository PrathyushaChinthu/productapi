'use client';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import Drawer from './drawer/page';

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://test-api.nine.deals/graphql',
    fetchOptions: { cache: 'no-store' },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export default function ApolloWrapper() {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <Drawer />
    </ApolloNextAppProvider>
  );
}
