import React, { CSSProperties, ReactNode } from "react";

type HOC<E> = {
     WrappedComponent: React.ComponentType<E & { style?: CSSProperties }>;
     flagMe: boolean;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
};
const ItemHOC = <E extends object>({
     WrappedComponent,
     flagMe,
     userIsDarkTheme,
     userThemeColorScheme
}: HOC<E>) => {
     return function newComponent(props: E & { children?: ReactNode; style?: CSSProperties }) {
          const css: CSSProperties | undefined = flagMe
               ? {
                      ...props.style,
                      alignSelf: "flex-end",
                      marginRight: "15px",
                      background: userIsDarkTheme ? "#575db5" : "#d1c4e9",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "0px"
                 }
               : {
                      ...props.style,
                      background: userIsDarkTheme
                           ? userThemeColorScheme?.dark[3]
                           : userThemeColorScheme?.light[3]
                 };
          return (
               <WrappedComponent {...props} style={css}>
                    {props.children}
               </WrappedComponent>
          );
     };
};
export default ItemHOC;
