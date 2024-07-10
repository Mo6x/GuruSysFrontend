import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import usePosts from "../../hooks/UserPosts";
import PostCard from "./PostCard";
import CreatePostForm from "./CreatePostForm"; 
import { IPost } from "../../Types/AllTypes";
import { isErrorWithMessage } from "../utils/errorUtils";



const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const { posts, isLoading, error, refetch } = usePosts();
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (_postId: string) => {
    await queryClient.invalidateQueries('posts');
  };

  const getErrorMessage = (error: unknown): string => {
    if (isErrorWithMessage(error)) {
      return error.message;
    } else if (error instanceof Error) {
      return error.message;
    }
    return "An unknown error occurred";
  };

  const errorMessage = error ? getErrorMessage(error) : null;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Blog</h1>
        <p className="text-lg text-gray-600">Share your thoughts and read what others have to say</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Close Form' : 'Create Post'}
        </button>
      </div>
      {showCreateForm && (
        <div className="mb-8">
          <CreatePostForm />
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post: IPost) => (
          <PostCard key={post._id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

