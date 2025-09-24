"use client";
import React, { useRef } from "react";
import app from "../../src/firebase";
import "../../style/_autorization.scss";
import { FaRegEye } from "react-icons/fa";
import { useLazyQuery, gql, useMutation } from "@apollo/client";
import { setPasswordAndEmail } from "@/StateManagment/appSlice";
import { setUserData } from "@/StateManagment/appSlice";
import { useSelector } from "react-redux";
import { RootState, RootDispatch } from "@/StateManagment/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchUserData } from "@/StateManagment/appSlice";
import type { UserInterface } from "@/StateManagment/appSlice";
import {
     signInWithPopup,
     linkWithPopup,
     getAuth,
     GoogleAuthProvider,
     GithubAuthProvider
} from "firebase/auth";
import logo from "../../../public/icons/DeWatermark.ai_1748696872353 2.png";
import { FaRegEyeSlash } from "react-icons/fa";
const ADD_USER = gql`
     mutation addUser($user: UserInterfaceInput!) {
          addUser(user: $user) {
               userName
               userChats
               userId
          }
     }
`;
const GET_USER = gql`
     query getUserById($userId: String!) {
          getUserById(userId: $userId) {
               userId
               userName
               userEmail
               userPassword
               userDateRegistred
               userTelegramInfo
               userInstagramInfo
               userIsOnline
               userChats
               userFriends
               userImage
               userContacts
               userGroups
               userDescription
               userThemeColorShceme
               userIsDarkTheme
               userLanguage
          }
     }
`;

const AutorizationPage = () => {
     const router = useRouter();
     const dispatch: RootDispatch = useDispatch();
     const [isRegistration, setIsRegistration] = React.useState<boolean>(false);
     const login = useRef<HTMLInputElement | null>(null);
     const password = useRef<HTMLInputElement | null>(null);
     const [accountData, setAccountData] = React.useState<{
          login: string;
          password: string;
     }>({ login: "", password: "" });
     const [isPassword, setIsPassword] = React.useState<boolean>(true);
     const [user, setUser] = React.useState<any>();
     const users = useSelector((store: RootState) => store.User);
     const [valid, setValid] = React.useState<{
          login: boolean;
          password: boolean;
     }>({ login: false, password: false });
     const handleRegistration = (
          event: React.ChangeEvent<HTMLInputElement>,
          type: "LOGIN" | "PASSWORD"
     ) => {
          const value: string = event.currentTarget.value;
          setAccountData({
               ...accountData!,
               [type.toLowerCase()]: value
          });
          if (type === "LOGIN") {
               const letters: number = (value.match(/[A-Za-zА-Яа-я]/g) || []).length;
               const digits: number = (value.match(/[0-9]/g) || []).length;

               if (letters >= 5 && digits >= 3 && letters + digits >= 9) {
                    event.currentTarget.style.border = "3px solid green";
                    setValid((prev) => {
                         const newState = { ...prev, [type.toLocaleLowerCase()]: true };
                         return newState;
                    });
               } else {
                    event.currentTarget.style.border = "2px solid red";
                    setValid((prev) => {
                         const newState = { ...prev, [type.toLocaleLowerCase()]: false };
                         return newState;
                    });
               }
          } else if (type === "PASSWORD") {
               const letters: number = (value.match(/[A-Za-zА-Яа-я]/g) || []).length;
               const digits: number = (value.match(/[0-9]/g) || []).length;
               const specialChars: number = (value.match(/[^А-Яа-яA-Za-z0-9]/g) || []).length;

               if (
                    letters >= 2 &&
                    digits >= 8 &&
                    specialChars >= 2 &&
                    letters + specialChars + digits >= 12
               ) {
                    event.currentTarget.style.border = "3px solid green";
                    setValid((prev) => {
                         const newState = { ...prev, [type.toLocaleLowerCase()]: true };
                         return newState;
                    });
               } else {
                    event.currentTarget.style.border = "2px solid red";
                    setValid((prev) => {
                         const newState = { ...prev, [type.toLocaleLowerCase()]: false };
                         return newState;
                    });
               }
          }
     };
     const handleLogin = (
          event: React.ChangeEvent<HTMLInputElement>,
          type: "LOGIN" | "PASSWORD"
     ) => {
          const value: string = event.currentTarget.value;
          setAccountData({
               ...accountData!,
               [type.toLowerCase()]: value
          });
     };
     const [addUser, { data: dataU, loading: loadingU, error: errorU }] = useMutation(ADD_USER);
     const [getUser, { data: userData, loading: userLoading, error: userError }] =
          useLazyQuery(GET_USER);
     const handleCheckIsUniqueLogin = async (
          login: string,
          type: "SIMPLE" | "SERVICE"
     ): Promise<boolean> => {
          const res = await getUser({ variables: { userId: login } });
          let name: string = "";

          name = res?.data?.getUserById?.userName;

          console.log(res);
          if (name === login) {
               return false;
          } else {
               return true;
          }
     };
     const handleSubmit = async (type: "LOGIN" | "REGISTRATION") => {
          const userToAdd: UserInterface = {
               userId: users.userId,
               userName: accountData.login,
               userEmail: "",
               userPassword: accountData.password,
               userDateRegistred: new Date().toString(),
               userTelegramInfo: "",
               userInstagramInfo: "",
               userIsOnline: users.userIsOnline,
               userChats: [
                    {
                         type: "SAVED",
                         // SavedMessagesChat
                         pinnedMessage: [],
                         chatOperation: 0,
                         messages: [
                              {
                                   value: "My note",
                                   date: new Date().toString(),
                                   isEdit: false,
                                   author: "Me",
                                   checkFlag: true,
                                   isLike: false,
                                   id: Math.floor(Math.random() * 10000),
                                   type: "SAVED",
                                   countView: 0
                              }
                         ],
                         joinUsers: null,

                         chatId: "saved",
                         chatDateInitialization: new Date().toString(),
                         imagesChat: "",
                         info: {
                              chatDescription: "Saved notes",
                              chatImage: "",
                              chatName: "Закладки",
                              lastSendImg: "",
                              title: "aaaaaaa",
                              lastUserName: "trema",
                              value: "что-то",
                              lastMessageDate: new Date().toString(),
                              flagCheck: false,
                              messageImage: ""
                         }
                    }
               ],
               userFriends: [],
               userImage: "",
               userContacts: [],
               userIsDarkTheme: users.userIsDarkTheme,
               userLanguage: "ENGLISH",
               userDescription: "",
               userGroups: 0,
               userThemeColorShceme: users.userThemeColorShceme
          };
          if (type === "REGISTRATION") {
               if (valid.login && valid.password) {
                    const response = await handleCheckIsUniqueLogin(accountData.login, "SIMPLE");
                    if (response) {
                         await dispatch(
                              setPasswordAndEmail({
                                   login: accountData.login,
                                   password: accountData.password
                              })
                         );
                         await dispatch(setUserData({ user: userToAdd }));
                         await handlePostUserData(userToAdd);

                         router.push("/");
                         await localStorage.setItem("USERNAME", accountData.login);
                    } else {
                         if (login.current && password.current) {
                              login.current.style.border = "3px solid red";
                              password.current.style.border = "3px solid red";
                              login.current.value = "";
                              accountData.login = "";
                              accountData.password = "";
                              login.current.placeholder = "ДАННЫЙ АККАУНТ УЖЕ СУЩЕСТВУЕТ";
                         }
                    }
               }
          } else if (type === "LOGIN") {
               const { data } = await getUser({ variables: { userId: accountData.login } });
               const res = await getUser({ variables: { userId: accountData.login } });
               const userData: UserInterface = data?.getUserById;
               console.log(res);
               if (
                    userData?.userName === accountData.login &&
                    userData?.userPassword === accountData.password
               ) {
                    await dispatch(
                         setPasswordAndEmail({
                              login: accountData.login,
                              password: accountData.password
                         })
                    );
                    userToAdd.userChats = userData.userChats;
                    userToAdd.userContacts = userData.userContacts;
                    userToAdd.userDateRegistred = userData.userDateRegistred;
                    userToAdd.userDescription = userData.userDescription;
                    userToAdd.userEmail = userData.userEmail;
                    userToAdd.userFriends = userData.userFriends;
                    userToAdd.userGroups = userData.userGroups;
                    userToAdd.userId = userData.userId;
                    userToAdd.userImage = userData.userImage;
                    userToAdd.userInstagramInfo = userData.userInstagramInfo;
                    userToAdd.userIsDarkTheme = userData.userIsDarkTheme;
                    userToAdd.userIsOnline = userData.userIsOnline;
                    userToAdd.userLanguage = userData.userLanguage;
                    userToAdd.userName = userData.userName;
                    userToAdd.userPassword = userData.userPassword;
                    userToAdd.userTelegramInfo = userData.userTelegramInfo;
                    userToAdd.userThemeColorShceme = userData.userThemeColorShceme;
                    await dispatch(setUserData({ user: userToAdd }));
                    await localStorage.setItem("USERNAME", accountData.login);
                    dispatch(fetchUserData());
                    router.push("/");
               } else {
                    if (login.current && password.current) {
                         login.current.style.border = "3px solid red";
                         password.current.style.border = "3px solid red";
                         login.current.value = "";
                         accountData.login = "";
                         accountData.password = "";
                         login.current.placeholder = "ДАННОГО АККАУНТА НЕ СУЩЕСТВУЕТ";
                    }
               }
          }
     };

     const handleAuthWithGoogle = async (type: "REGISTRATION" | "SIGNIN") => {
          if (type === "REGISTRATION") {
               const auth = getAuth(app);
               const googleProvider = new GoogleAuthProvider();
               try {
                    const result = await signInWithPopup(auth, googleProvider);

                    console.log(result.user);
                    const userToAdd: UserInterface = {
                         userId: "@" + result.user.email!,
                         userName: result.user.displayName!,
                         userEmail: result.user.email!,
                         userPassword: accountData.password,
                         userDateRegistred: new Date().toString(),
                         userTelegramInfo: "",
                         userInstagramInfo: "",
                         userIsOnline: users.userIsOnline,
                         userChats: [
                              {
                                   type: "SAVED",
                                   // SavedMessagesChat
                                   pinnedMessage: [],
                                   chatOperation: 0,
                                   messages: [
                                        {
                                             value: "My note",
                                             date: new Date().toString(),
                                             isEdit: false,
                                             author: "Me",
                                             checkFlag: true,
                                             isLike: false,
                                             id: Math.floor(Math.random() * 10000),
                                             type: "SAVED",
                                             countView: 0
                                        }
                                   ],
                                   joinUsers: null,

                                   chatId: "saved",
                                   chatDateInitialization: new Date().toString(),
                                   imagesChat: "",
                                   info: {
                                        chatDescription: "Saved notes",
                                        chatImage: "",
                                        chatName: "Заметки",
                                        lastSendImg: "",
                                        title: "Заметки",
                                        lastUserName: "Me",
                                        value: "Записи отсутствуют",
                                        lastMessageDate: new Date().toString(),
                                        flagCheck: false,
                                        messageImage: ""
                                   }
                              }
                         ],
                         userFriends: [],
                         userImage: result.user.photoURL!,
                         userContacts: [],
                         userIsDarkTheme: users.userIsDarkTheme,
                         userLanguage: "ENGLISH",
                         userDescription: "",
                         userGroups: 0,
                         userThemeColorShceme: users.userThemeColorShceme
                    };

                    const response = await handleCheckIsUniqueLogin(
                         result.user.displayName!,
                         "SERVICE"
                    );
                    if (response) {
                         const res = addUser({ variables: { user: userToAdd } });
                         dispatch(setUserData({ user: userToAdd }));
                         router.push("/");
                         await localStorage.setItem("USERNAME", result.user.displayName!);
                    } else {
                         if (login.current && password.current) {
                              login.current.style.border = "3px solid red";
                              password.current.style.border = "3px solid red";
                              login.current.value = "";
                              accountData.login = "";
                              accountData.password = "";
                              login.current.placeholder = "ДАННЫЙ АККАУНТ УЖЕ СУЩЕСТВУЕТ";
                         }
                    }
               } catch (error: any) {
                    console.error(error);
               }
          } else if (type === "SIGNIN") {
               try {
                    const auth = getAuth(app);
                    const googleProvider = new GoogleAuthProvider();
                    const result = await signInWithPopup(auth, googleProvider);
                    const { data } = await getUser({
                         variables: { userId: result.user.displayName }
                    });
                    const res = await getUser({
                         variables: { userId: result.user.displayName }
                    });
                    console.log(res);
                    if (data.getUserById !== null && data.getUserById !== undefined) {
                         const userToAdd: UserInterface = {
                              userId: "@" + result.user.email!,
                              userName: result.user.displayName!,
                              userEmail: result.user.email!,
                              userPassword: accountData.password,
                              userDateRegistred: new Date().toString(),
                              userTelegramInfo: "",
                              userInstagramInfo: "",
                              userIsOnline: users.userIsOnline,
                              userChats: [...data.getUserById.userChats],
                              userFriends: [],
                              userImage: res.data.getUserById.userImage,
                              userContacts: [],
                              userIsDarkTheme: users.userIsDarkTheme,
                              userLanguage: "ENGLISH",
                              userDescription: "",
                              userGroups: 0,
                              userThemeColorShceme: users.userThemeColorShceme
                         };
                         dispatch(setUserData({ user: userToAdd }));
                         dispatch(fetchUserData());
                         await localStorage.setItem("USERNAME", result.user.displayName!);
                         router.push("/");
                    } else {
                         if (login.current && password.current) {
                              login.current.style.border = "3px solid red";
                              password.current.style.border = "3px solid red";
                              login.current.value = "";
                              accountData.login = "";
                              accountData.password = "";
                              login.current.placeholder = "ТАКОГО АККАУНТА НЕ СУЩЕСТВУЕТ";
                         }
                    }
               } catch (error: any) {
                    console.error(error);
               }
          }
     };
     const handleAuthWithGitHub = async (type: "REGISTRATION" | "SIGNIN") => {
          const auth = getAuth(app);
          const gitHub = new GithubAuthProvider();
          if (type === "REGISTRATION") {
               try {
                    const result = await signInWithPopup(auth, gitHub);

                    console.log(result.user);
                    const userToAdd: UserInterface = {
                         userId: "@" + result.user.email!,
                         userName: result.user.displayName!,
                         userEmail: result.user.email!,
                         userPassword: accountData.password,
                         userDateRegistred: new Date().toString(),
                         userTelegramInfo: "",
                         userInstagramInfo: "",
                         userIsOnline: users.userIsOnline,
                         userChats: [
                              {
                                   type: "SAVED",
                                   // SavedMessagesChat
                                   pinnedMessage: [],
                                   chatOperation: 0,
                                   messages: [
                                        {
                                             value: "My note",
                                             date: new Date().toString(),
                                             isEdit: false,
                                             author: "Me",
                                             checkFlag: true,
                                             isLike: false,
                                             id: Math.floor(Math.random() * 10000),
                                             type: "SAVED",
                                             countView: 0
                                        }
                                   ],
                                   joinUsers: null,

                                   chatId: "saved",
                                   chatDateInitialization: new Date().toString(),
                                   imagesChat: "",
                                   info: {
                                        chatDescription: "Saved notes",
                                        chatImage: "",
                                        chatName: "Заметки",
                                        lastSendImg: "",
                                        title: "Заметки",
                                        lastUserName: "Me",
                                        value: "Записи отсутствуют",
                                        lastMessageDate: new Date().toString(),
                                        flagCheck: false,
                                        messageImage: ""
                                   }
                              }
                         ],
                         userFriends: [],
                         userImage: result.user.photoURL!,
                         userContacts: [],
                         userIsDarkTheme: users.userIsDarkTheme,
                         userLanguage: "ENGLISH",
                         userDescription: "",
                         userGroups: 0,
                         userThemeColorShceme: users.userThemeColorShceme
                    };

                    const response = await handleCheckIsUniqueLogin(
                         result.user.displayName!,
                         "SERVICE"
                    );
                    if (response) {
                         const res = addUser({ variables: { user: userToAdd } });
                         dispatch(setUserData({ user: userToAdd }));
                         router.push("/");
                         await localStorage.setItem("USERNAME", result.user.displayName!);
                    } else {
                         if (login.current && password.current) {
                              login.current.style.border = "3px solid red";
                              password.current.style.border = "3px solid red";
                              login.current.value = "";
                              accountData.login = "";
                              accountData.password = "";
                              login.current.placeholder = "ДАННЫЙ АККАУНТ УЖЕ СУЩЕСТВУЕТ";
                         }
                    }
               } catch (error: any) {
                    console.error(error);
               }
          } else if (type === "SIGNIN") {
               try {
                    const auth = getAuth(app);
                    const gitHub = new GithubAuthProvider();
                    const result = await signInWithPopup(auth, gitHub);
                    const { data } = await getUser({
                         variables: { userId: result.user.displayName }
                    });
                    const res = await getUser({
                         variables: { userId: result.user.displayName }
                    });
                    console.log(res);
                    if (data.getUserById !== null && data.getUserById !== undefined) {
                         const userToAdd: UserInterface = {
                              userId: "@" + result.user.email!,
                              userName: result.user.displayName!,
                              userEmail: result.user.email!,
                              userPassword: accountData.password,
                              userDateRegistred: new Date().toString(),
                              userTelegramInfo: "",
                              userInstagramInfo: "",
                              userIsOnline: users.userIsOnline,
                              userChats: data.getUserById.userChats,
                              userFriends: [],
                              userImage: res.data.getUserById.userImage,
                              userContacts: [],
                              userIsDarkTheme: users.userIsDarkTheme,
                              userLanguage: "ENGLISH",
                              userDescription: "",
                              userGroups: 0,
                              userThemeColorShceme: users.userThemeColorShceme
                         };
                         dispatch(setUserData({ user: userToAdd }));
                         router.push("/");
                         await localStorage.setItem("USERNAME", result.user.displayName!);
                         dispatch(fetchUserData());
                    } else {
                         if (login.current && password.current) {
                              login.current.style.border = "3px solid red";
                              password.current.style.border = "3px solid red";
                              login.current.value = "";
                              accountData.login = "";
                              accountData.password = "";
                              login.current.placeholder = "ТАКОГО АККАУНТА НЕ СУЩЕСТВУЕТ";
                         }
                    }
               } catch (error: any) {
                    console.error(error);
               }
          }
     };

     const handlePostUserData = async (userToAdd: UserInterface) => {
          const { data } = await addUser({
               variables: {
                    user: userToAdd
               }
          });

          console.log(data);
     };
     React.useEffect(() => {
          if (!isRegistration && login.current && password.current) {
               login.current.style.border = "3px solid grey";
               password.current.style.border = "3px solid grey";
               login.current.placeholder = "Логин...";
               password.current.placeholder = "Пароль...";
          }
     }, [isRegistration]);

     return (
          <div className="autorizationPage">
               <div className="autorizationPage__form">
                    <div className="autorizationPage__formTitle">
                         <h2
                              onClick={() => {
                                   const userToAdd: UserInterface = {
                                        userId: users.userId,
                                        userName: accountData.login,
                                        userEmail: users.userEmail,
                                        userPassword: accountData.password,
                                        userDateRegistred: new Date().toString(),
                                        userTelegramInfo: "",
                                        userInstagramInfo: "",
                                        userIsOnline: users.userIsOnline,
                                        userChats: [],
                                        userFriends: [],
                                        userImage: "",
                                        userContacts: [],
                                        userIsDarkTheme: users.userIsDarkTheme,
                                        userLanguage: "ENGLISH",
                                        userDescription: "",
                                        userGroups: 0,
                                        userThemeColorShceme: users.userThemeColorShceme
                                   };
                                   handlePostUserData(userToAdd);
                              }}
                              className="autorizationPage__formTitleName"
                         >
                              Freedom
                         </h2>
                         <img className="autorizationPage__formTitleLogo" src={logo.src}></img>
                    </div>
                    <div className="autorizationPage__formInner">
                         <h1 className="autorizationPage__formInnerTitle">
                              {!isRegistration ? "Вход" : "Регистрация"} в Freedom
                         </h1>
                         <form
                              style={{
                                   gap: isRegistration ? "15px" : "30px"
                              }}
                              className="autorizationPage__formInnerInputs"
                         >
                              <input
                                   onChange={(event) =>
                                        isRegistration
                                             ? handleRegistration(event, "LOGIN")
                                             : handleLogin(event, "LOGIN")
                                   }
                                   type="text"
                                   ref={login}
                                   placeholder="Логин..."
                                   className="autorizationPage__formInnerInputsLogin"
                                   value={accountData.login}
                              ></input>
                              {isRegistration ? (
                                   <span className="autorizationPage__formInnerInputsLoginLabel">
                                        Мин: 5 буквы, 3 цифр, длина: мин 9 символов
                                   </span>
                              ) : null}
                              <input
                                   onChange={(event) =>
                                        isRegistration
                                             ? handleRegistration(event, "PASSWORD")
                                             : handleLogin(event, "PASSWORD")
                                   }
                                   type={isPassword ? "password" : "text"}
                                   ref={password}
                                   placeholder="Пароль..."
                                   className="autorizationPage__formInnerInputsPassword"
                                   value={accountData.password}
                              ></input>
                              {isRegistration ? (
                                   <span className="autorizationPage__formInnerInputsPasswordLabel">
                                        Мин: 2 буквы, 8 цифр, 2 спецсимвола, длина: мин 12 символов
                                   </span>
                              ) : null}
                              {!isPassword ? (
                                   <FaRegEye
                                        onClick={() => setIsPassword((prev) => !prev)}
                                        color="black"
                                        className="autorizationPage__formInnerInputsPasswordEye"
                                        size={28}
                                   ></FaRegEye>
                              ) : (
                                   <FaRegEyeSlash
                                        onClick={() => setIsPassword((prev) => !prev)}
                                        color="black"
                                        className="autorizationPage__formInnerInputsPasswordEye"
                                        size={28}
                                   ></FaRegEyeSlash>
                              )}
                              <input
                                   onClick={() => {
                                        isRegistration
                                             ? handleSubmit("REGISTRATION")
                                             : handleSubmit("LOGIN");
                                   }}
                                   value={!isRegistration ? "Войти" : "Зарегистрироваться"}
                                   type="button"
                                   className="autorizationPage__formInnerInputsSubmit"
                              ></input>
                              <span className="autorizationPage__formInnerInputsTitle">
                                   {!isRegistration
                                        ? "Войти с помощью"
                                        : "Зарегистрироваться с помощью "}
                              </span>
                              <div className="autorizationPage__formInnerInputsServices">
                                   <input
                                        onClick={() =>
                                             handleAuthWithGitHub(
                                                  isRegistration ? "REGISTRATION" : "SIGNIN"
                                             )
                                        }
                                        type="button"
                                        className="autorizationPage__formInnerInputsServicesGitHub"
                                   ></input>

                                   <input
                                        onClick={() =>
                                             handleAuthWithGoogle(
                                                  isRegistration ? "REGISTRATION" : "SIGNIN"
                                             )
                                        }
                                        type="button"
                                        className="autorizationPage__formInnerInputsServicesGoogle"
                                   ></input>
                              </div>
                         </form>
                    </div>
                    <div className="autorizationPage__formRegistration">
                         <span className="autorizationPage__formRegistrationLabel">
                              {!isRegistration ? "Нету аккаунта?" : "Уже есть аккаунт?"}
                         </span>
                         <span
                              onClick={() => (
                                   setIsRegistration((prev) => !prev),
                                   setAccountData({ login: "", password: "" })
                              )}
                              style={{ color: "blue" }}
                              className="autorizationPage__formRegistrationLabel"
                         >
                              {!isRegistration ? " Зарегистрироваться" : " Войти"}
                         </span>
                    </div>
               </div>
               <div className="autorizationPage__background"></div>
          </div>
     );
};
export default AutorizationPage;
