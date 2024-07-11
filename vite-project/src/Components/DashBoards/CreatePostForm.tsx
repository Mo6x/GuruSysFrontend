import React, { useState } from "react";
import usePosts from "../../hooks/UserPosts";

const CreatePostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const { createPost, isLoading, error } = usePosts();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('description', description);
      if (image) {
        formData.append('images', image);
      }

      await createPost(formData);

      setTitle('');
      setContent('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
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
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Selected Image"
            className="mt-2 rounded-lg shadow-md max-w-xs"
          />
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isLoading}
      >
        {isLoading ? 'Posting...' : 'Create Post'}
      </button>
      {errorMessage && <p className="text-red-500 text-xs italic mt-2">{errorMessage}</p>}
    </form>
  );
};

export default CreatePostForm;
