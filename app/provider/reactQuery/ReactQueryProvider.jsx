"use client"
import { QueryClient, QueryClientProvider } from '@node_modules/@tanstack/react-query';
import { ReactQueryDevtools } from '@node_modules/@tanstack/react-query-devtools';

   function ReactQueryProvider ({children}){

    const client = new QueryClient({
      defaultOptions : {
        queries: {
          staleTime : 0,
        }
      }
    });


    return(
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    )



   }   
      
export default ReactQueryProvider;