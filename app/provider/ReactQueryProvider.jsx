"use client"
import { QueryClient, QueryClientProvider } from '@node_modules/@tanstack/react-query';
import { ReactQueryDevtools } from '@node_modules/@tanstack/react-query-devtools';
import {Provider} from 'react-redux';
import store from './Store';

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
        <Provider store={store}>
         { /*<ReactQueryDevtools initialIsOpen={false}/> */}
        {children}
        </Provider>
      </QueryClientProvider>
    )



   }   
      
export default ReactQueryProvider;