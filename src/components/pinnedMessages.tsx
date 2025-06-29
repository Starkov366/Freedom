import React from "react";
import { TbPinnedFilled } from "react-icons/tb";
import { RootDispatch } from "@/StateManagment/store";
import { useDispatch } from "react-redux";
import { setDeletePinnedMessages } from "@/StateManagment/appSlice";
type typePinned = { pinnedMessages: string[]; targetChatId: string };

const PinnedMessages: React.FC<typePinned> = ({ pinnedMessages, targetChatId }) => {
     const dispatch: RootDispatch = useDispatch();
     return (
          <div className="headerChatBox__pinnedMessages">
               <div className="headerChatBox__pinnedMessagesInner">
                    <TbPinnedFilled
                         onClick={() => dispatch(setDeletePinnedMessages({ idChat: targetChatId }))}
                         className="headerChatBox__pinnedMessagesInnerIcon"
                         size={37}
                         color="gray"
                    ></TbPinnedFilled>
                    <div className="headerChatBox__pinnedMessagesItem">
                         {pinnedMessages.map((mess: string, index) => {
                              return (
                                   <span
                                        style={{ width: `${mess.length * 6}px` }}
                                        key={index}
                                        className="headerChatBox__pinnedMessagesItemValue"
                                   >
                                        {mess}
                                   </span>
                              );
                         })}
                    </div>
               </div>
          </div>
     );
};
export default PinnedMessages;
