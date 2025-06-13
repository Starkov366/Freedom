import React from "react";
export const ImagePresentation = ({ img }: { img: string }) => {
     return (
          <div className="chatBox__imagePresentation">
               <img src={img} className="chatBox__imagePresentationImg"></img>
          </div>
     );
};
