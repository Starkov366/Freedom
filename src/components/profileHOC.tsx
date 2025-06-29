import React, { ReactNode } from "react";
import PolyComponent from "./polyComponent";
type ProfileHOCtype<E> = {
     WrappedComponent: React.ComponentType<E>;
     edit: boolean;
     owner?: boolean;
};
function ProfileHOC<E extends object>({ WrappedComponent, edit, owner }: ProfileHOCtype<E>) {
     return function newComponent(props: E & { children?: ReactNode }) {
          if (edit) {
               return <WrappedComponent {...props}>{props.children}</WrappedComponent>;
          } else if (!edit && !owner) {
               return <WrappedComponent {...props}>{props.children}</WrappedComponent>;
          }
     };
}
export default ProfileHOC;
