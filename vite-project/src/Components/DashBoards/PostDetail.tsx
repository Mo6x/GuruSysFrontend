import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePosts from "../../hooks/UserPosts";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import LikeList from "./LikeList";
import { IPost } from "../../Types/AllTypes";


const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchPostById, deletePost } = usePosts();
  const [isDeleting, setIsDeleting] = useState(false);
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const fetchedPost = await fetchPostById(id);
          setPost(fetchedPost);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };

      fetchPost();
    }
  }, [id, fetchPostById]);

  const handleDelete = async () => {
    if (!post) return;

    setIsDeleting(true);
    try {
      await deletePost(post._id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!post) return <p>No post found.</p>;

  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-2">{post.description}</p>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <LikeList postId={post._id} likes={post.likes} />
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
      <CommentForm postId={post._id} onClose={() => {}} />
    </div>
  );
};

export default PostDetail;
