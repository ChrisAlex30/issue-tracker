'use client'
import {QueryClient,QueryClientProvider as ReactQueryProvider} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const QueryClientProvider = ({children}:PropsWithChildren) => {

    const queryClient=new QueryClient()

  return (
    <ReactQueryProvider client={queryClient}>
        {children}
    </ReactQueryProvider>
  )
}

export default QueryClientProvider