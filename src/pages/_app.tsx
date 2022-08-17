import { AppProps } from "next/App";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { makeServer } from "../services/mirage";
import { QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import { queryClient } from "../services/queryClient";

//se o ambiente que está rodando a aplicação é de desenvolvimento
if(process.env.NODE_ENV === 'development'){
  makeServer();
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>

    <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default MyApp;
