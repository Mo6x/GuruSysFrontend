import React, { useState } from "react";
import usePosts from "../../hooks/UserPosts";
import { IComment } from "../../Types/AllTypes";

interface CommentFormProps {
  postId: string;
  onClose: () => void; 
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onClose }) => {
  const [content, setContent] = useState('');
  const { commentPost, isLoading, error } = usePosts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const commentData: Partial<IComment> = { content };
    
    commentPost({ postId, commentData });
    setContent('');
    onClose(); 
  };

  const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    }
    return "An unknown error occurred";
  };

  const errorMessage = error ? getErrorMessage(error) : null;

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Write a comment..."
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
        disabled={isLoading}
      >
        {isLoading ? 'Posting...' : 'Post Comment'}
      </button>
      {errorMessage && <p className="text-red-500 text-xs italic mt-2">{errorMessage}</p>}
    </form>
  );
};

export default CommentForm;
