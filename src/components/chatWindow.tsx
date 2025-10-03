import React from "react";
import HeaderChatBox from "./headerChatBox";
import ChatBox from "./chatBox";
import { UserInterface } from "@/StateManagment/appSlice";
import { useParams } from "next/navigation";
import { DuoChat } from "@/StateManagment/appSlice";
import BigChatInfo from "./bigChatInfo";
import gql from "graphql-tag";
import type { Chats } from "@/StateManagment/appSlice";
import { useMutation } from "@apollo/client";
import { RootDispatch } from "@/StateManagment/store";
import { useGetTargetChatQuery } from "@/StateManagment/appApi";
import { useDispatch } from "react-redux";
import { useSendChatToSavedMutation } from "@/StateManagment/appApi";
import { setDataByChatId } from "@/StateManagment/appSlice";
import { useRouter } from "next/navigation";
const UPDATE_CHAT = gql`
     mutation updateChatDB($targetChat: JSON) {
          updateChatDB(targetChat: $targetChat)
     }
`;
const UPDATE_DUOCHAT = gql`
     mutation updateDuoChat($ownUserId: String, $myId: String, $newChat: DuoChatInput) {
          updateDuoChat(ownUserId: $ownUserId, myId: $myId, newChat: $newChat) {
               myKey
               ownUserKey
               myChatKey
               ownChatKey
          }
     }
`;
type typeChatBox = {
     user: UserInterface;
     fullfield: boolean;
     key: number;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     isOpen: boolean;
     language: string;
     setIsProfileFlag: React.Dispatch<React.SetStateAction<boolean>>;
     isProfileFlag: boolean;
};
const ChatWindow: React.FC<typeChatBox> = ({
     user,
     fullfield,
     userIsDarkTheme,
     userThemeColorScheme,
     setIsOpen,
     isOpen,
     language,
     setIsProfileFlag,
     isProfileFlag
}) => {
     const id = useParams();
     const router = useRouter();
     const [userKey, setUserKey] = React.useState<string>("");
     const dispatch: RootDispatch = useDispatch();
     const keyRefs: any = React.useRef(null);
     const [bigChatInfoOpen, setBigChatInfoOpen] = React.useState<boolean>(isOpen);
     console.log(id);
     const [keys, setkeys] = React.useState<any>({
          myKey: "",
          ownUserKey: "",
          myChatKey: "",
          ownChatKey: ""
     });
     const [updateChatDB, { data, loading, error }] = useMutation(UPDATE_CHAT);
     const [updateDuoChat, { data: dataDuo, loading: loadingDuo, error: errorDuo }] =
          useMutation(UPDATE_DUOCHAT);
     const [sendSaveMessage] = useSendChatToSavedMutation();
     const {
          data: dataS,
          isLoading,
          refetch
     } = useGetTargetChatQuery(undefined, {
          refetchOnMountOrArgChange: false,
          refetchOnFocus: false,
          pollingInterval: 0
     });

     const isFirstLoad = React.useRef<boolean>(true);
     function returnFriendName(user: UserInterface): {
          targetChat: Chats[];
          outName: number;
          ownUser: UserInterface;
     } {
          let outName: number = 0;
          const targetChat: any = user.userChats.filter((chat: any) => chat?.chatId === id.chatId);
          console.log("ЧАТ ИЗ БД", targetChat);

          if (targetChat?.[0]?.joinUsers && !Array.isArray(targetChat[0].joinUsers!)) {
               const targetNameIDOne: string = targetChat?.[0]?.joinUsers?.one?.userId!;
               const targetNameIDTwo: string = targetChat?.[0]?.joinUsers?.two?.userId!;

               if (targetNameIDOne === user?.userId) {
                    outName = 1;
               } else if (targetNameIDTwo === user?.userId) {
                    outName = 0;
               }
          }
          const users = targetChat?.[0]?.joinUsers as { one: UserInterface; two: UserInterface };
          const ownUser: UserInterface = outName === 1 ? users?.two : users?.one;
          console.log(targetChat, outName, ownUser);
          return { targetChat, outName, ownUser };
     }
     const outName = returnFriendName(user!).outName;
     const targetChat = returnFriendName(user!).targetChat?.[0];

     const container = React.useRef<null | HTMLDivElement>(null);
     const ownUser = returnFriendName(user!).ownUser;
     React.useEffect(() => {
          const handleClose = (event: any) => {
               const element = event.target as HTMLElement;
               if (
                    !element.closest(".bigChatInfo") &&
                    !element.closest(".contactMenu") &&
                    !element.closest(".headerChatBox") &&
                    !element.closest(".profile") &&
                    !element.closest(".createNewWindow")
               ) {
                    setBigChatInfoOpen(false);
               }
          };
          console.log(user.userChats, "ЧАТЫЫЫ!!!");
          document.addEventListener("click", handleClose);
          return () => document.removeEventListener("click", handleClose);
     }, []);

     React.useEffect(() => {
          (async () => {
               if (!targetChat) return;
               const response = await fetch(
                    "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
                    {
                         headers: { "Content-Type": "application/json" },
                         method: "GET"
                    }
               );
               const data = await response.json();

               for (const [k, value] of Object.entries(data) as [string, UserInterface][]) {
                    if (value.userName === user.userName) {
                         setUserKey(k);

                         break;
                    }
               }
               if (
                    id.chatId &&
                    targetChat &&
                    targetChat.type !== "SAVED" &&
                    targetChat.type !== "DUO"
               ) {
                    if (!dataS || !id || !id.chatId) {
                         console.log("id.chatId или dataS ещё нет");
                         return;
                    }

                    const chats = Object.values(dataS);
                    const filteredChats = chats.filter((chat: any) => chat.chatId === id.chatId);

                    if (filteredChats[0]) {
                         const cleanChat = JSON.parse(JSON.stringify(filteredChats[0]));
                         console.log(cleanChat, "ВОТ ОН ЗАСРАНЕЦ");

                         dispatch(
                              setDataByChatId({
                                   ID: cleanChat.chatId as string,
                                   newChat: cleanChat
                              })
                         );

                         try {
                              await updateChatDB({ variables: { targetChat: cleanChat } });
                         } catch (err) {
                              console.error("ApolloError при обновлении чата:", err);
                         }
                    } else {
                         console.log("Чат ещё не появился");
                         window.location.reload();
                    }
               } else if (id.chatId && targetChat && targetChat.type === "DUO") {
                    /*
                    const response = await fetch(
                         "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers.json",
                         {
                              headers: { "Content-Type": "application/json" },
                              method: "GET"
                         }
                    );
                    const data = await response.json();
                    let key: string = "";
                    for (const [k, value] of Object.entries(data) as [string, UserInterface][]) {
                         if (value.userName === user.userName) {
                              setUserKey(k);
                              key = k;
                              break;
                         }
                    }
                    const responseChat = await fetch(
                         `https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers/${key}.json`,
                         {
                              headers: { "Content-Type": "application/json" },
                              method: "GET"
                         }
                    );
                    const dataChat = await responseChat.json();
                    const chats = [];
                    for (const value of Object.values(dataChat)) {
                         chats.push(value);
                    }
                    const targetChat: any = chats.filter((chat: any) => chat?.chatId === id.chatId);

                    dispatch(setDataByChatId({ ID: id.chatId as string, newChat: targetChat[0] }));
                    */
                    // ПОД ВОПРОСОМ
               }
          })();
     }, [id.chatId, dispatch, dataS]);

     React.useEffect(() => {
          (async () => {
               if (!targetChat || !targetChat.chatId) return;
               if (targetChat?.type === "GROUP" || targetChat?.type === "CHANNEL") {
                    const { data } = await updateChatDB({ variables: { targetChat } });
                    console.log(data, "обновление группы/канала");
                    setkeys(data?.updateChat);
               } else if (targetChat?.type === "SAVED" && userKey.length > 1) {
                    sendSaveMessage({ userId: userKey, newMesssages: targetChat.messages });
               } else if (targetChat?.type === "DUO") {
                    const targetChatWithoutTrash: DuoChat = {
                         messages: targetChat.messages,
                         pinnedMessage: targetChat.pinnedMessage || [],
                         chatDateInitialization: targetChat.chatDateInitialization,
                         chatOperation: targetChat.chatOperation,
                         chatId: targetChat.chatId,
                         imagesChat: targetChat.imagesChat,
                         info: targetChat.info,
                         type: targetChat.type,
                         joinUsers: {
                              one: {
                                   userId: targetChat.joinUsers.one.userId,
                                   userName: targetChat.joinUsers.one.userName,
                                   userEmail: targetChat.joinUsers.one.userEmail,
                                   userPassword: targetChat.joinUsers.one.userPassword,
                                   userDateRegistred: targetChat.joinUsers.one.userDateRegistred,
                                   userTelegramInfo: targetChat.joinUsers.one.userTelegramInfo,
                                   userInstagramInfo: targetChat.joinUsers.one.userInstagramInfo,
                                   userIsOnline: targetChat.joinUsers.one.userIsOnline,
                                   userFriends: targetChat.joinUsers.one.userFriends,
                                   userImage: targetChat.joinUsers.one.userImage,
                                   userGroups: targetChat.joinUsers.one.userGroups,
                                   userDescription: targetChat.joinUsers.one.userDescription,
                                   userChatID: targetChat.joinUsers.one.userChatID,
                                   userRole: targetChat.joinUsers.one.userRole
                              },
                              two: {
                                   userId: targetChat.joinUsers.two.userId,
                                   userName: targetChat.joinUsers.two.userName,
                                   userEmail: targetChat.joinUsers.two.userEmail,
                                   userPassword: targetChat.joinUsers.two.userPassword,
                                   userDateRegistred: targetChat.joinUsers.two.userDateRegistred,
                                   userTelegramInfo: targetChat.joinUsers.two.userTelegramInfo,
                                   userInstagramInfo: targetChat.joinUsers.two.userInstagramInfo,
                                   userIsOnline: targetChat.joinUsers.two.userIsOnline,
                                   userFriends: targetChat.joinUsers.two.userFriends,
                                   userImage: targetChat.joinUsers.two.userImage,
                                   userGroups: targetChat.joinUsers.two.userGroups,
                                   userDescription: targetChat.joinUsers.two.userDescription,
                                   userChatID: targetChat.joinUsers.two.userChatID,
                                   userRole: targetChat.joinUsers.two.userRole
                              }
                         }
                    };
                    const { data } = await updateDuoChat({
                         variables: {
                              ownUserId: ownUser.userId,
                              myId: user.userId,
                              newChat: targetChatWithoutTrash
                         }
                    });
                    console.log(data.updateDuoChat, "нууу пжжж");
                    keyRefs.current = data?.updateDuoChat;
                    setkeys(data?.updateDuoChat);
               }
          })();
     }, [targetChat, userKey, id.chatId]);
     const currentTargetChatRef = React.useRef(targetChat);
     React.useEffect(() => {
          if (!isProfileFlag) {
               if (targetChat?.type !== "SAVED" && targetChat?.type !== "DUO") {
                    const idd = id.chatId as string;
                    const inter = setInterval(async () => {
                         refetch();
                         const response = await fetch(
                              "https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomChats.json",
                              { headers: { "Content-Type": "application/json" }, method: "GET" }
                         );
                         const data = await response.json();
                         const chats = Object.values(data);
                         const targetChatNew: any = chats.find(
                              (chat: any) => chat?.chatId === id.chatId
                         );
                         const currentMessages = currentTargetChatRef.current?.messages || [];
                         const newMessages = targetChatNew?.messages || [];
                         if (JSON.stringify(currentMessages) !== JSON.stringify(newMessages)) {
                              dispatch(setDataByChatId({ ID: idd, newChat: targetChatNew }));
                         }
                    }, 15000);
                    return () => clearInterval(inter);
               }
          }
     }, []);
     React.useEffect(() => {
          if (!isProfileFlag) {
               if (targetChat?.type === "DUO" && keys) {
                    const idd = id.chatId as string;
                    const inter = setInterval(async () => {
                         refetch();
                         console.log(keyRefs.current, keys, "КЛЮЧИКИ");
                         const response = await fetch(
                              `https://telegrambotfishcombat-default-rtdb.firebaseio.com/freedomUsers/${keys.myKey}/userChats/${keys.myChatKey}.json`,
                              { headers: { "Content-Type": "application/json" }, method: "GET" }
                         );
                         const targetChatNew = await response.json();
                         const currentMessages = currentTargetChatRef.current?.messages || [];
                         const newMessages = targetChatNew?.messages || [];
                         console.log(targetChatNew, "НОВЫЙ");
                         targetChatNew.pinnedMessage = targetChatNew?.pinnedMessage || [];
                         if (JSON.stringify(currentMessages) !== JSON.stringify(newMessages)) {
                              dispatch(
                                   setDataByChatId({
                                        ID: id.chatId as string,
                                        newChat: targetChatNew
                                   })
                              );
                         }
                    }, 15000);
                    return () => clearInterval(inter);
               }
          }
     }, [keys]);

     return (
          <div
               style={{
                    color: user.userIsDarkTheme
                         ? user.userThemeColorShceme.dark[4]
                         : user.userThemeColorShceme.light[4]
               }}
               className="chat"
          >
               <HeaderChatBox
                    userIsDarkTheme={user.userIsDarkTheme}
                    userThemeColorScheme={user.userThemeColorShceme}
                    targetChat={targetChat}
                    targetNumberOutUser={outName}
                    ownUser={ownUser}
                    fullfield={fullfield}
                    setBigInfoChatOpen={setBigChatInfoOpen}
                    language={user.userLanguage}
                    container={container}
               ></HeaderChatBox>
               {!fullfield ? (
                    <div
                         style={{ background: userIsDarkTheme ? "gray" : "white" }}
                         className="chat__info"
                    >
                         <p style={{ color: userIsDarkTheme ? "white" : "black" }}>
                              {language === "RUSSIAN"
                                   ? "Выберите чат дабы начать общение"
                                   : "Select chat to start a messaging"}
                         </p>
                    </div>
               ) : null}
               <ChatBox
                    userIsDarkTheme={user.userIsDarkTheme}
                    userThemeColorScheme={user.userThemeColorShceme}
                    targetChat={targetChat}
                    fullfield={fullfield}
                    container={container}
                    language={user.userLanguage}
               ></ChatBox>
               {(bigChatInfoOpen && targetChat?.type === "GROUP") ||
               (targetChat?.type === "CHANNEL" && bigChatInfoOpen) ? (
                    <BigChatInfo
                         language={user.userLanguage}
                         isOpen={isOpen}
                         targetChat={targetChat}
                         setIsOpen={setIsOpen}
                         setBigChatIsOpen={setBigChatInfoOpen}
                         userIsDarkTheme={userIsDarkTheme}
                         userThemeColorScheme={userThemeColorScheme}
                         members={targetChat?.joinUsers}
                         groupName={targetChat?.info.chatName}
                         chatDescription={targetChat?.info.chatDescription}
                         targetChatID={targetChat?.chatId}
                         chatImage={targetChat?.imagesChat}
                         type={targetChat?.type}
                    ></BigChatInfo>
               ) : null}
          </div>
     );
};
export default ChatWindow;
