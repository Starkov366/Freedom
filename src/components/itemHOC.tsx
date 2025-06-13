import React, { CSSProperties, ReactNode } from "react";

type HOC<E> = {
     WrappedComponent: React.ComponentType<E & { style?: CSSProperties }>;
     flagMe: boolean;
};
const ItemHOC = <E extends object>({ WrappedComponent, flagMe }: HOC<E>) => {
     return function newComponent(props: E & { children?: ReactNode; style?: CSSProperties }) {
          const css: CSSProperties | undefined = flagMe
               ? {
                      ...props.style,
                      alignSelf: "flex-end",
                      marginRight: "15px",
                      background: "#d1c4e9",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "0px"
                 }
               : props.style;
          return (
               <WrappedComponent {...props} style={css}>
                    {props.children}
               </WrappedComponent>
          );
     };
};
export default ItemHOC;
