import React, { ElementType, ReactNode } from "react";
type PolyComponentType<E extends ElementType> = {
     as: E;
     children?: ReactNode;
} & React.ComponentProps<E>;
function PolyComponent<E extends ElementType = "p">({
     as,
     children,
     ...rest
}: PolyComponentType<E>) {
     const ReturnComponent: any = as || "div";
     if (as !== "input") {
          return (
               <ReturnComponent style={{ borderBottom: "0px" }} {...rest}>
                    {children}
               </ReturnComponent>
          );
     } else if (as === "input") {
          return <ReturnComponent {...rest} />;
     }
}
export default PolyComponent;
