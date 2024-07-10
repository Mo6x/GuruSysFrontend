import React from "react";
import { IComment } from "../../Types/AllTypes";



export interface CommentListProps {
  postId: string;
  comments: IComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Comments</h3>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-100 rounded p-2 mb-2">
          <p className="text-gray-700 mb-1">{comment.content}</p>
          <span className="text-xs text-gray-500">{comment.createdAt}</span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
