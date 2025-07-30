import React from "react";
import { IoMdClose } from "react-icons/io";
type typeY = {
     setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
     userIsDarkTheme: boolean;
     userThemeColorScheme: { dark: string[]; light: string[] };
     handleAddMessage: (typEvent?: string, id?: number, URL?: string) => void;
};
const InsertYVideo: React.FC<typeY> = ({
     setIsModalOpen,
     userIsDarkTheme,
     userThemeColorScheme,
     handleAddMessage
}) => {
     const [inputValue, setInputValue] = React.useState("");
     const send = (value: string) => {
          value.startsWith("https://www.youtube.com")
               ? (handleAddMessage("VIDEO", Math.random(), value), setIsModalOpen((prev) => !prev))
               : setIsModalOpen((prev) => !prev);
     };

     return (
          <div
               className="insertYVideo"
               style={{
                    background: userIsDarkTheme
                         ? userThemeColorScheme.dark[10]
                         : userThemeColorScheme.light[10]
               }}
          >
               <IoMdClose
                    onClick={() => setIsModalOpen((prev) => !prev)}
                    className="insertYVideo__close"
                    color="grey"
                    size={35}
               ></IoMdClose>
               <span className="insertYVideo__text">URL</span>
               <input
                    placeholder="https://www.youtube.com/vide123123123..."
                    type="text"
                    value={inputValue}
                    className="insertYVideo__input"
                    onChange={(event) => setInputValue(event.target.value)}
               ></input>
               <input
                    onClick={(event) => send(inputValue)}
                    className="insertYVideo__sendBtn"
                    type="button"
               ></input>
          </div>
     );
};
export default InsertYVideo;
