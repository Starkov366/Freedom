import React from "react";
type YProps = {
     isYouTubeVideo: string;
     setIsOpenYouTubeVideo: React.Dispatch<React.SetStateAction<boolean>>;
};
import { IoCloseSharp } from "react-icons/io5";
const YouTubeVideo = ({ isYouTubeVideo, setIsOpenYouTubeVideo }: YProps) => {
     return (
          <div className="youTubeVideo">
               <iframe
                    width="95%"
                    height="95%"
                    src={isYouTubeVideo}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
               ></iframe>
               <button
                    onClick={() => setIsOpenYouTubeVideo(false)}
                    className="youTubeVideo__closeBtn"
               >
                    <IoCloseSharp size={40} color="black"></IoCloseSharp>
               </button>
          </div>
     );
};
export default YouTubeVideo;
