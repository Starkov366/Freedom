"use client";
import AutorizationPage from "./auth";
import store from "../../StateManagment/store";
import { RootState } from "../../StateManagment/store";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
export default function Main() {
     const client = new ApolloClient({
          uri: "http://localhost:4000/",
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
