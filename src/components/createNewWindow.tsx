"use client";
import React from "react";
import img from "../../public/icons/background.png";
import { MdAddPhotoAlternate } from "react-icons/md";
import { File } from "buffer";
import { useDispatch } from "react-redux";
import { RootDispatch } from "@/StateManagment/store";
import { setCreateNewGroup, setCreateNewChannel } from "@/StateManagment/appSlice";
import undefinedIcon from "../../public/icons/icons8-облако-диалога-с-точками-96.png";
const CreateNewWindow = ({
     userIsDarkTheme,
     userThemeColorScheme,
     isChannel,
     setIsOpen
}: {
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     isChannel: string;
     setIsOpen: React.Dispatch<
          React.SetStateAction<
               | {
                      type: string | any;
                      isOpen: boolean;
                 }
               | undefined
          >
     >;
}) => {
     const dispatch: RootDispatch = useDispatch();
     const inputRef = React.useRef<HTMLInputElement | null>(null);
     const [image, setImage] = React.useState<string>();
     const [isFile, setIsFile] = React.useState<boolean>(true);
     const [name, setName] = React.useState<string>("");
     const [description, setDescription] = React.useState<string>("");
     const handleSetImage = () => {
          if (inputRef.current) {
               inputRef.current.click();
          }
     };
     const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const image = event.target.files?.[0];
          if (image !== undefined) {
               const stringImage = URL.createObjectURL(image!);
               setImage(stringImage);
               setIsFile(false);
          }
     };
     const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
     };
     const handleSetDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(event.target.value);
     };
     const handleCloseModal = () => {
          setIsOpen((prev) => {
               const newState = {
                    type: prev?.type,
                    isOpen: !prev?.isOpen
               };
               return newState;
          });
     };
     const handleCreateGroupOrChannel = (
          img: string | undefined,
          name: string,
          description: string,
          type: string
     ) => {
          if (isChannel === "group") {
               if (img && img.length > 2) {
                    dispatch(setCreateNewGroup({ img: img, name: name, description: description }));
               } else {
                    dispatch(
                         setCreateNewGroup({
                              img: undefinedIcon.src,
                              name: name,
                              description: description
                         })
                    );
               }
          } else {
               if (img) {
                    dispatch(
                         setCreateNewChannel({ img: img, name: name, description: description })
                    );
               } else {
                    dispatch(
                         setCreateNewChannel({
                              img: undefinedIcon.src,
                              name: name,
                              description: description
                         })
                    );
               }
          }
          handleCloseModal();
     };

     React.useEffect(() => {
          setImage("#");
          setIsFile(true);
     }, []);
     return (
          <div
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[9]
                         : userThemeColorScheme.light[10]
               }}
               className="createNewWindow"
          >
               <div className="createNewWindow__header">
                    <img src={image} className="createNewWindow__headerImg"></img>
                    {isFile ? (
                         <MdAddPhotoAlternate
                              onClick={() => handleSetImage()}
                              className="createNewWindow__headerAddIcon"
                              size={40}
                              color="grey"
                         ></MdAddPhotoAlternate>
                    ) : null}
                    <div className="createNewWindow__infoTitle">
                         <span className="createNewWindow__infoTitleLabel">
                              {isChannel[0].toUpperCase() + isChannel.slice(1, 7)} name
                         </span>
                         <input
                              onChange={(event) => handleSetName(event)}
                              placeholder={"Name is required"}
                              className="createNewWindow__infoTitleInput"
                              value={name}
                         ></input>
                    </div>
               </div>
               <input
                    onChange={(event) => handleSetDescription(event)}
                    className="createNewWindow__description"
                    placeholder="Description(optional)"
                    value={description}
               ></input>
               <div className="createNewWindow__btns">
                    <button
                         onClick={() => handleCloseModal()}
                         className="createNewWindow__btnsCancel"
                    >
                         cancel
                    </button>
                    <button
                         onClick={() => {
                              handleCreateGroupOrChannel(image, name, description, isChannel);
                         }}
                         className="createNewWindow__btnsAcess"
                    >
                         create
                    </button>
               </div>
               <input
                    onChange={(event) => handleOnChange(event)}
                    style={{ visibility: "hidden" }}
                    type="file"
                    ref={inputRef}
               ></input>
          </div>
     );
};
export default CreateNewWindow;
