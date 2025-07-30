"use client";
import "../style/_mainPage.scss";
import "../style/_chat.scss";
import "../style/_headerChatBox.scss";
import "../style/_chatBox.scss";
import "../style/_headerMessageMenu.scss";
import "../style/_messageMenu.scss";
import "../style/_settings.scss";
import "../style/_profile.scss";
import "../style/_createNewWindow.scss";
import "../style/_bigChat.scss";
import ChatBox from "@/components/chat";
import { Provider } from "react-redux";
import store from "../StateManagment/store";
import { RootState } from "../StateManagment/store";
import { useSelector } from "react-redux";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
export default function Main() {
     const client = new ApolloClient({
          uri: "http://localhost:4000/",
          cache: new InMemoryCache()
     });
     return (
          <Provider store={store}>
               <ApolloProvider client={client}>
                    <ChatBox language={"RUSSIAN"} fullfield={false}></ChatBox>;
               </ApolloProvider>
          </Provider>
     );
}
