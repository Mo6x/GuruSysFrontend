import React, { useState } from "react";
import { IPost } from "../../Types/AllTypes";
import { HiOutlineHeart, HiOutlineChat, HiOutlineTrash } from "react-icons/hi";
import usePosts from "../../hooks/UserPosts";
import CommentForm from "./CommentForm";
import Modal from "./Modal";

interface PostCardProps {
  post: IPost;
  onDelete: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const { likePost, deletePost } = usePosts();
  const user_id = localStorage.getItem('user_id') || '';
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLike = () => {
    likePost(post._id);
  };

  const handleDelete = async () => {
    await deletePost(post._id);
    onDelete(post._id);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-2">{post.description}</p>
      <div className="flex items-center mb-2">
        <HiOutlineHeart className="h-5 w-5 text-red-500 cursor-pointer" onClick={handleLike} />
        <span>{post.likes.length}</span>
        <HiOutlineChat className="h-5 w-5 text-blue-500 ml-4 cursor-pointer" onClick={toggleModal} />
        <span>{post.comments.length}</span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="text-blue-500">View Details</button>
        {user_id === post.author._id && (
          <button className="text-red-500" onClick={handleDelete}>
            <HiOutlineTrash className="h-5 w-5" />
          </button>
        )}
      </div>

      <Modal isVisible={isModalVisible} onClose={closeModal}>
        <div className="p-4">
          <CommentForm postId={post._id} onClose={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default PostCard;
