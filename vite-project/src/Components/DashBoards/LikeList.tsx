import React, { useState } from "react";
import usePosts from "../../hooks/UserPosts";



export interface LikeListProps {
  postId: string;
  likes: string[];
}

const LikeList: React.FC<LikeListProps> = ({ postId, likes }) => {
  const { likePost } = usePosts();
  const [isLiking, setIsLiking] = useState(false);
  const [liked, setLiked] = useState(likes.includes("currentUserId"));
  const [likeCount, setLikeCount] = useState(likes.length);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await likePost(postId);
      setLiked(!liked);
      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex items-center mb-2">
      <span className="mr-2 text-gray-500">{likeCount} likes</span>
      <button
        className={`ml-4 ${liked ? "text-blue-500" : "text-gray-500"} ${isLiking ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleLike}
        disabled={isLiking}
      >
        {isLiking ? "Liking..." : "Like"}
      </button>
    </div>
  );
};

export default LikeList;
