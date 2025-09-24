"use client";
import AutorizationPage from "./auth";
import store from "../../StateManagment/store";
import { Provider } from "react-redux";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
export default function Main() {
     const client = new ApolloClient({
          uri: "/api/graphql",
          cache: new InMemoryCache()
     });
     return (
          <Provider store={store}>
               <ApolloProvider client={client}>
                    <AutorizationPage></AutorizationPage>
               </ApolloProvider>
          </Provider>
     );
}
