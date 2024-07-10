import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import usePosts from "../../hooks/UserPosts";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { IPost } from "../../Types/AllTypes"; 



const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchPostById, deletePost } = usePosts();
  const [isDeleting, setIsDeleting] = useState(false);
  const [post, setPost] = useState<IPost | null>(null);

//   useEffect(() => {
//     const fetchPostById = async () => {
//       try {
//       //   const postData = await fetchPostById(id as string);
//       //   setPost(postData);
//       } catch (error) {
//         console.error("Error fetching post:", error);
//       }
//     };

//     if (id) { 
//       fetchPostById();
//     }
//   }, [id, fetchPost]);

  const handleDelete = async () => {
    if (!post) return;

    setIsDeleting(true);
    try {
      await deletePost(post._id);
      setIsDeleting(false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      setIsDeleting(false);
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return "An unknown error occurred";
  };

  if (!post) return <p>No post found.</p>;

  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-2">{post.description}</p>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <div className="flex items-center mb-2">
          <span className="mr-2 text-gray-500">{post.likes.length} likes</span>
          <span className="mr-2 text-gray-500">{post.comments.length} comments</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className={`text-red-500 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Post"}
          </button>
        </div>
      </div>
      
      <CommentList postId={post._id} comments={post.comments} />
      <CommentForm postId={post._id} onClose={()=>{}} />
    </div>
  );
};

export default PostDetail;

