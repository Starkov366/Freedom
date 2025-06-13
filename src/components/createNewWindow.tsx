import React from "react";
import img from "../../public/icons/background.png";
const CreateNewWindow = () => {
     return (
          <div className="createNewWindow">
               <div className="createNewWindow__header">
                    <img src={img.src} className="createNewWindow__headerImg"></img>
                    <div className="createNewWindow__infoTitle">
                         <span className="createNewWindow__infoTitleLabel">Channel name</span>
                         <input
                              placeholder={"Name is required"}
                              className="createNewWindow__infoTitleInput"
                         ></input>
                    </div>
               </div>
               <input
                    className="createNewWindow__description"
                    placeholder="Description(optional)"
               ></input>
               <div className="createNewWindow__btns">
                    <button className="createNewWindow__btnsCancel">cancel</button>
                    <button className="createNewWindow__btnsAcess">create</button>
               </div>
          </div>
     );
};
export default CreateNewWindow;
