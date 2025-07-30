import React from "react";
type typeReply = {
     setReplyMessage: React.Dispatch<
          React.SetStateAction<{ name: string; value: string; y: number } | undefined>
     >;
     replyMessage: { name: string; value: string; y: number };
};
import { FaReplyAll } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const ReplyBottomPanel: React.FC<typeReply> = ({ setReplyMessage, replyMessage }) => {
     return (
          <div className="chatBox__bottomPanelReply">
               <FaReplyAll
                    className="chatBox__bottomPanelReplyIconReply"
                    color="white"
                    size={35}
               ></FaReplyAll>
               <div className="chatBox__bottomPanelReplyInfo">
                    <span className="chatBox__bottomPanelReplyInfoName">{replyMessage.name}</span>
                    <span className="chatBox__bottomPanelReplyInfoValue">
                         {replyMessage.value.length <= 95
                              ? replyMessage.value
                              : replyMessage.value.slice(0, 85) + "..."}
                    </span>
               </div>
               <IoMdClose
                    onClick={() => setReplyMessage({ name: "", value: "", y: 0 })}
                    className="chatBox__bottomPanelReplyIconClose"
                    color="pink"
                    size={35}
               ></IoMdClose>
          </div>
     );
};
export default ReplyBottomPanel;
