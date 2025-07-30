import React from "react";
type typeReply = {
     reply: { name: string; value: string; y: number };
     handleScroll?: (value: number) => void;
};
const ReplyMessage: React.FC<typeReply> = ({ reply, handleScroll }) => {
     return (
          <div
               onClick={() => (handleScroll ? handleScroll(reply.y - 100) : null)}
               className="chatBox__itemReply"
          >
               <span className="chatBox__itemReplyName">{reply.name + ": "}</span>
               <span className="chatBox__itemReplyValue">
                    {reply.value.length >= 45 ? reply.value.slice(0, 40) + "..." : reply.value}
               </span>
          </div>
     );
};
export default ReplyMessage;
