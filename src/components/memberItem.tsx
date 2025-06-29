import React from "react";
type typeMember = {};
import memo from "../../public/icons/background.png"
const MemberItem: React.FC<typeMember> = () => {
     return (
          <div className="bigChatInfo__innerMembersInnerItem">
               <img src={memo.src}className="bigChatInfo__innerMembersInnerItemImage"></img>
               <div className="bigChatInfo__innerMembersInnerItemTexts">
                    <h1 className="bigChatInfo__innerMembersInnerItemName">Группа</h1>
                    <span className="bigChatInfo__innerMembersInnerItemIsOnline">online</span>
               </div>
          </div>
     );
};
export default MemberItem;
